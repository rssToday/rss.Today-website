import {
  decimal,
  index,
  int,
  json,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"
import { type CheckoutItemSchema } from "@/lib/validations/cart"

import { addresses } from "./addresses"
import { stores } from "./stores"
import { lifecycleDates } from "./utils"

// @see: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = mysqlTable(
  "orders",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(), // prefix_ + nanoid (12)
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    items: json("items").$type<CheckoutItemSchema[] | null>().default(null),
    quantity: int("quantity"),
    amount: decimal("amount", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 256 })
      .notNull(),
    stripePaymentIntentStatus: varchar("stripe_payment_intent_status", { length: 32 })
      .notNull(),
    name: varchar("name", { length: 128 })
      .notNull(),
    email: varchar("email", { length: 256 })
      .notNull(),
    addressId: varchar("address_id", { length: 30 })
      .references(() => addresses.id, { onDelete: "cascade" })
      .notNull(),
    ...lifecycleDates,
  },
  (table) => ({
    storeIdIdx: index("orders_store_id_idx").on(table.storeId),
    addressIdIdx: index("orders_address_id_idx").on(table.addressId),
  })
)

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
