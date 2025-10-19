import {
  mysqlTable,
  varchar, 
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

import { users } from './users';

export const profiles = mysqlTable('profiles', 
  {
    id: varchar('id', { length: 30 }).primaryKey(),
    user_id: varchar('user_id', { length: 30 }).notNull(),
    bio: varchar('bio', { length: 255 }),
  }
);

export const userHasProfile = (userTable: typeof users, profileTable: typeof profiles) => ({
  id: userTable.id,
  profile_id: profileTable.id,
});

export const usersWithProfile = sql`
  SELECT users.*, profiles.*
  FROM users
  LEFT JOIN profiles
  ON users.id = profiles.user_id
`;