import {
  mysqlTable, 
  varchar 
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { lifecycleDates } from "./utils"

export const addresses = mysqlTable("addresses", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  line1: varchar("line1", { length: 255 }),
  line2: varchar("line2", { length: 255 }),
  city: varchar("city", { length: 128 }),
  state: varchar("state", { length: 128 }),
  postalCode: varchar("postal_code", { length: 32 }),
  country: varchar("country", { length: 64 }),
  ...lifecycleDates,
})

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert
