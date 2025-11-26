import { and, bookLines, eq, gte, lte, sql, type SQLWrapper } from "@lernt/db";
import type { BookLineDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../../Service";



export const readQ = async (deps: ServiceDeps, payload: BookLineDTO.ReadBookLinesPayload) => {
    const { tx } = deps;
    const whereClauses: SQLWrapper[] = [(
        gte(bookLines.book, payload.startingBook),
        gte(bookLines.chapter, payload.startingChapter),
        gte(bookLines.line, payload.startingLine),
        lte(bookLines.book, payload.closingBook),
        lte(bookLines.chapter, payload.closingChapter),
        lte(bookLines.line, payload.closingLine)

    )];
    if (payload.userId) {
        whereClauses.push(eq(bookLines.userId, payload.userId))
    }

    const records = await tx.select(
        {
            book: bookLines.book,
            chapter: bookLines.chapter,
            line: bookLines.line,
            edits: sql<BookLineDTO.ReadBookLinesResponse[number]["edits"]>`
                JSON_ARRAY(
                JSON_OBJECT(
                    'userId':'${bookLines.userId}',
                    'text'r
                    'state':'${bookLines.state}'
                    'createdAt
                    'modifiedAt'
                    'publishedAt'
                ))
            `
        }
    ).from(bookLines).where(and(...whereClauses)).groupBy(
        bookLines.book,
        bookLines.chapter,
        bookLines.line
    )
    return records;
};
