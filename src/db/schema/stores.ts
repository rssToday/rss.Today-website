import { relations } from "drizzle-orm"
import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { customers } from "./customers"
import { payments } from "./payments"
import { products } from "./products"
import { tags } from "./tags"
import { lifecycleDates } from "./utils"
import { variants } from "./variants"

export const storePlanEnum = mysqlEnum("store_plan", ["free", "standard", "pro"])

export const stores = mysqlTable("stores", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: varchar("user_id", { length: 36 }).notNull(), // uuid v4
  slug: varchar("slug", { length: 256 })
    .unique().notNull(),
  name: varchar("name", { length: 128 })
    .notNull(),
  description: varchar("description", { length: 1024 }),

  plan: storePlanEnum.notNull().default("free"),
  planEndsAt: timestamp("ends_at"),
  cancelPlanAtEnd: boolean("cancel_plan_at_end").default(false),
  stripeAccountId: varchar("stripe_account_id", { length: 30 })
    .unique(), // stripe connect
  stripeCustomerId: varchar("stripe_customer_id", { length: 30 })
    .unique(),
  productLimit: int("product_limit").notNull().default(10),
  tagLimit: int("tag_limit").notNull().default(5),
  variantLimit: int("variant_limit").notNull().default(5),
  ...lifecycleDates,
})

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products, { relationName: "storeProducts" }),
  payments: many(payments, { relationName: "storePayments" }),
  customers: many(customers, { relationName: "storeCustomers" }),
  tags: many(tags, { relationName: "storeTags" }),
  variants: many(variants, { relationName: "storeVariants" }),
}))

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert
