import { themeOptions } from "@lernt/domain/src";
import { mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";

/// @TODO: Add relations to tables

export const userConfigs = mysqlTable("t_user_configs", {
	id: varchar("id", { length: 36 }).primaryKey(),
	userId: varchar("user_id", { length: 36 }).notNull(),
	theme: mysqlEnum("theme", themeOptions).notNull(),
});
