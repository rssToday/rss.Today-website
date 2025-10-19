import {
  mysqlTable, 
  varchar, 
  int, 
  text,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', 
  {
    id: varchar('id', { length: 30 }).primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    age: int('age').default(0),
    bio: text('bio'),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: 'users_table_id' }),
    unique('users_table_email_unique').on(table.email),
  ]
);
