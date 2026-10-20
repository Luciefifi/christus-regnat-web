import "dotenv/config";
import { defineConfig } from "prisma/config";

// Settings for the Prisma CLI (migrate, generate, studio, seed).
// The CLI doesn't read .env by itself, hence the dotenv import.

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // Not env("DATABASE_URL"): that stops `prisma generate` on Vercel, which has no database yet.
    // generate doesn't need a database; migrate, seed and studio still fail if the URL is missing.
    url: process.env.DATABASE_URL ?? "",
  },
});
