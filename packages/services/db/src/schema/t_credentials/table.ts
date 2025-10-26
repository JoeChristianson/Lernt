import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const credentials = mysqlTable("t_credentials", {
	userId: varchar("user_id", { length: 36 }).notNull(),
	hash: varchar("hash", { length: 100 }).notNull(),
});
