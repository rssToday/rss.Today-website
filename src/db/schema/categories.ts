import { relations } from "drizzle-orm"
import {
  mysqlTable, 
  varchar 
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { products } from "./products"
import { subcategories } from "./subcategories"

import { lifecycleDates } from "./utils"

export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar("name", { length: 128 })
    .notNull().unique(),
  slug: varchar("slug", { length: 256 })
    .notNull().unique(),
  image: varchar("image", { length: 256 }),
  description: varchar("description", { length: 1024 }),
  ...lifecycleDates,
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  subcategories: many(subcategories),
}))

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
