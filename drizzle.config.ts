//import { env } from "@/env.js"
import { type Config } from "drizzle-kit"

export default {
  schema: './src/db/schema',
  dialect: "mysql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "mysql://root:password@localhost:3306/rsstoday",
  },
} satisfies Config
