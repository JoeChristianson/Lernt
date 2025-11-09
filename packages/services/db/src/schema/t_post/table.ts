import { timestamp, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { contentStates } from "@lernt/domain/src/shared";
export const posts = mysqlTable("t_post", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    text: text("text").notNull(),
    state: mysqlEnum("state",contentStates),
    createdOn: timestamp("createdOn").notNull(),
    publishedOn: timestamp("publishedOn")
})