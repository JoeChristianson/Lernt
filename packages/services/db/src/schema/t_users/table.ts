import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("t_users", {
	id: varchar("id", { length: 255 }).primaryKey(),
	email: varchar("email", { length: 100 }).notNull(),
	emailVerified: timestamp("email_verified"),
	name: varchar("name", { length: 100 }).notNull(),
	image: varchar("image", { length: 100 }),
	password: varchar("password", { length: 1000 }).notNull(),
});
