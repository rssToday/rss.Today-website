/**

import { env } from "@/env.js"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema"

const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema })

*/

import { drizzle } from "drizzle-orm/mysql2";

// You can specify any property from the mysql2 connection options
export const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});
