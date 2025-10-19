import { relations } from "drizzle-orm"
import {
  index,
  mysqlTable,
  primaryKey,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { products } from "./products"
import { stores } from "./stores"
import { lifecycleDates } from "./utils"

// store tags
export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(),
    name: varchar("name", { length: 128 })
      .notNull(),
    color: varchar("color", { length: 32 })
      .notNull().default("blue"),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    ...lifecycleDates,
  },
  (table) => [{
    tagsNameUnique: unique("tags_name_store_id_unique")
      .on(table.name, table.storeId),
//      .nullsNotDistinct(),
    storeIdIdx: index("tags_store_id_idx").on(table.storeId),
  }]
)

export const tagsRelations = relations(tags, ({ one, many }) => ({
  store: one(stores, { fields: [tags.storeId], references: [stores.id] }),
  products: many(products, {
    relationName: "productTags",
  }),
}))

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert

export const productTags = mysqlTable(
  "product_tags",
  {
    productId: varchar("product_id", { length: 30 })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    tagId: varchar("tag_id", { length: 30 })
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
    ...lifecycleDates,
  },
  (table) => [{
    pk: primaryKey({
      name: "product_tags_pk",
      columns: [table.productId, table.tagId],
    }),
    productTagIdx: index("product_tags_product_id_tag_id_idx").on(
      table.productId,
      table.tagId
    ),
  }]
)

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tag: one(tags, { fields: [productTags.tagId], references: [tags.id] }),
}))

export type ProductTag = typeof productTags.$inferSelect
export type NewProductTag = typeof productTags.$inferInsert
