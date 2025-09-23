import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import {
  sendPasswordResetOTPEmail,
  sendEmailVerificationOTPEmail,
  sendPasswordResetLinkEmail,
  sendEmailVerificationLinkEmail,
} from "./email";

// Email sending handled in ./email

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

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "forget-password") {
          await sendPasswordResetOTPEmail({ to: email, otp });
        } else if (type === "email-verification") {
          await sendEmailVerificationOTPEmail({ to: email, otp });
        }
      },
    }),
  ],

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
      await sendPasswordResetLinkEmail({ to: user.email, url });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
      token,
    }: {
      user: any;
      url: string;
      token: string;
    }) => {
      try {
        // Redirect to frontend sign-in page after verification
        const frontendUrl = `${
          process.env.CORS_ORIGIN || "http://localhost:3001"
        }/sign-in?verified=true`;
        const verificationUrl = url.replace(
          /localhost:3000.*$/,
          `localhost:3000/api/auth/verify-email?token=${token}&callbackURL=${encodeURIComponent(
            frontendUrl
          )}`
        );

        await sendEmailVerificationLinkEmail({
          to: user.email,
          verificationUrl,
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

  // Account linking configuration
  account: {
    accountLinking: {
      enabled: false, // Disable automatic account linking
    },
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
