import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `${name}`);

export const url = createTable("url", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  originalUrl: varchar("originalUrl", { length: 256 }).notNull(),
  shortCode: varchar("shortcode", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export type URL = typeof url.$inferSelect;
