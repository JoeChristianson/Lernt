import { contentStates } from "@lernt/domain/src/shared";
import { int, mysqlEnum, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

export const bookLines = mysqlTable("t_book_lines", {
    id: varchar("id", { length: 36 }).notNull().unique(),
    userId: varchar("userId", { length: 255 }).notNull(),
    book: int("book").notNull(), // 1-100
    chapter: int("chapter").notNull(), // 1-100
    line: int("line").notNull(), // 1-100
    text: varchar("text", { length: 70 }).notNull(), // ~60 chars, allowing up to 70
    state: mysqlEnum("state", contentStates).notNull().default("DRAFT"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
    publishedAt: timestamp("updatedAt")
}, (table) => ({
    pk: primaryKey({
        columns: [table.book, table.chapter, table.line, table.createdAt, table.userId

        ]
    })
}));
