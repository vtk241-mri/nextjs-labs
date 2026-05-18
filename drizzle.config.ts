import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });
config({ path: ".env", override: false });

const dbUrl =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

if (!dbUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: dbUrl },
  strict: true,
  verbose: true,
});
