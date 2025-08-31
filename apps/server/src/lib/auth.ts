import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.emailVerification,
    },
  }),

  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
    database: {
      generateId: () => {
        return Math.random().toString(36).substring(2, 15);
      },
    },
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "forget-password") {
          await sendPasswordResetEmail(email, otp);
        } else if (type === "email-verification") {
          await sendVerificationEmail(email, otp);
        }
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectURI: process.env.NODE_ENV === "development" 
        ? "http://localhost:3000/api/auth/callback/google"
        : undefined,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      redirectURI: process.env.NODE_ENV === "development" 
        ? "http://localhost:3000/api/auth/callback/github"
        : undefined,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    },
  },

  csrfProtection: {
    enabled: process.env.NODE_ENV === "production",
    origin:
      process.env.NODE_ENV === "development"
        ? [
            "http://localhost:3001",
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:3002",
            "http://localhost:3003",
          ]
        : ["http://localhost:3001", "http://localhost:3000"],
  },

  user: {
    additionalFields: {
      referralSource: {
        type: "string",
        required: false,
      },
    },
  },

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  redirectURL: process.env.NODE_ENV === "development" 
    ? "http://localhost:3001/dashboard" 
    : undefined,
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key",
  trustedOrigins:
    process.env.NODE_ENV === "development"
      ? [
          "http://localhost:3001",
          "http://localhost:3000",
          "http://localhost:5173",
          "http://localhost:3002",
          "http://localhost:3003",
        ]
      : ["http://localhost:3001", "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
