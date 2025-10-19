import { relations } from "drizzle-orm"
import { 
  index, 
  int, 
  mysqlTable, 
  varchar 
} from "drizzle-orm/mysql-core"

import { generateId } from "@/lib/id"

import { lifecycleDates } from "./utils"
import { productVariants, productVariantValues } from "./variants"

export const stocks = mysqlTable(
  "stocks",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(),
    productVariantId: varchar("product_variant_id", { length: 30 })
      .references(
        () => productVariants.id, 
        { onDelete: "cascade" })
      .notNull(),
    quantity: int("quantity").notNull().default(0),
    ...lifecycleDates,
  },
  (table) => [{
    productVariantIdIdx: index("stocks_product_variant_id_idx").on(
      table.productVariantId
    ),
  }]
)

export const stocksRelations = relations(stocks, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [stocks.productVariantId],
    references: [productVariants.id],
  }),
  productVariantValues: one(productVariantValues, {
    fields: [stocks.productVariantId],
    references: [productVariantValues.productVariantId],
  }),
}))

export type Stock = typeof stocks.$inferSelect
export type NewStock = typeof stocks.$inferInsert
