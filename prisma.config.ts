import { config } from "dotenv"

// Load .env.local first (real credentials, never committed),
// then fall back to .env (template values, safe to commit).
config({ path: ".env.local", override: true })
config({ path: ".env" })

import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"] ?? "",
  },
})
