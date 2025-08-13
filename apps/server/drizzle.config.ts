import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./src/db/schema/auth.ts",
    "./src/db/schema/team.ts", 
    "./src/db/schema/billing.ts",
    "./src/db/schema/website.ts",
    "./src/db/schema/analytics.ts",
    "./src/db/schema/reference.ts",
    "./src/db/schema/goals.ts",
    "./src/db/schema/ai.ts",
    "./src/db/schema/notifications.ts",
    "./src/db/schema/monitoring.ts",
    "./src/db/schema/intelligence.ts",
    "./src/db/schema/materialized-views.ts",
    "./src/db/schema/utility.ts"
  ],
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
