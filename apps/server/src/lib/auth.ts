import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Better Auth configuration with email/password and OAuth providers
 * Supports Google and GitHub login with custom email verification
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  // Email configuration with Resend
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: any;
      url: string;
      token: string;
    }) => {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "hello@dataprism.app",
        to: user.email,
        subject: "Reset your password",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1f2937; margin-bottom: 24px;">Reset Your Password</h1>
            <p style="color: #4b5563; margin-bottom: 24px;">
              Click the button below to reset your password. This link will expire in 1 hour.
            </p>
            <a href="${url}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Password
            </a>
            <p style="color: #6b7280; margin-top: 24px; font-size: 14px;">
              If you didn't request this password reset, you can safely ignore this email.
            </p>
          </div>
        `,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: any;
      url: string;
      token: string;
    }) => {
      try {
        const result = await resend.emails.send({
        from: process.env.FROM_EMAIL || "hello@dataprism.app",
        to: user.email,
        subject: "Verify your email address",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1f2937; margin-bottom: 24px;">Welcome to DataPrism!</h1>
            <p style="color: #4b5563; margin-bottom: 24px;">
              Please verify your email address to complete your account setup.
            </p>
            <a href="${url}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Verify Email
            </a>
            <p style="color: #6b7280; margin-top: 24px; font-size: 14px;">
              This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        `,
        });
        
      } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
      }
    },
  },


  // Social OAuth providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  // Advanced security options
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  // CSRF protection
  csrfProtection: {
    enabled: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:3001",
  },

  // User fields configuration
  user: {
    additionalFields: {
      newsletter: {
        type: "boolean",
        defaultValue: false,
      },
      referralSource: {
        type: "string",
        required: false,
      },
    },
  },

  // Callback URLs and trusted origins
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.CORS_ORIGIN || "http://localhost:3001",
    "http://localhost:3000", // Allow same-origin requests
  ],
});

export type Session = typeof auth.$Infer.Session;
