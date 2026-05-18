import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const target = process.env.TARGET_ENV ?? "development";

config({ path: `.env.${target}.local` });
config({ path: ".env.local", override: false });
config({ path: ".env", override: false });

const dbUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

if (!dbUrl) {
  throw new Error(
    `DATABASE_URL is not set (looked in .env.${target}.local, .env.local, .env)`,
  );
}

console.log(`drizzle-kit using TARGET_ENV=${target}`);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: dbUrl },
  strict: true,
  verbose: true,
});
