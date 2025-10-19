import {
  boolean, 
  json, 
  mysqlTable, 
  varchar 
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { type CartItemSchema } from "@/lib/validations/cart"

import { lifecycleDates } from "./utils"

// @see: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = mysqlTable("carts", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  paymentIntentId: varchar("payment_intent_id", { length: 256 }),
  clientSecret: varchar("client_secret", { length: 512 }),
  items: json("items").$type<CartItemSchema[]>().default([]),
  closed: boolean("closed").notNull().default(false),
  ...lifecycleDates,
})

export type Cart = typeof carts.$inferSelect
export type NewCart = typeof carts.$inferInsert
