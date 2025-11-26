import type { BookLineDTO } from "@lernt/domain";
import { BookLineInvariants } from "@lernt/domain";
import type { ServiceDeps } from "../../../Service";
import { BookLineDAL } from "../../../data-access/BookLine";

export const readBookLinesM = async (deps: ServiceDeps, payload: BookLineDTO.ReadBookLinesPayload) => {
    const res = await BookLineDAL(deps).read(payload);
    if (!payload.fillInMissing) {
        return res;
    }
    // loop through the requested range and fill in any missing lines with empty content
    const filledLines: BookLineDTO.ReadBookLinesResponse[number][] = [];
    const existingLinesMap = new Map<string, BookLineDTO.ReadBookLinesResponse[number]>();
    for (const line of res) {
        const key = `${line.book}-${line.chapter}-${line.line}`;
        existingLinesMap.set(key, line);
    }
    let checkLine = {
        book: payload.startingBook,
        chapter: payload.startingChapter,
        line: payload.startingLine,
    };
    const endLine = {
        book: payload.closingBook,
        chapter: payload.closingChapter,
        line: payload.closingLine,
    };
    while (
        checkLine.book < endLine.book ||
        (checkLine.book === endLine.book &&
            (checkLine.chapter < endLine.chapter ||
                (checkLine.chapter === endLine.chapter && checkLine.line <= endLine.line)))
    ) {
        const key = `${checkLine.book}-${checkLine.chapter}-${checkLine.line}`;
        if (existingLinesMap.has(key)) {
            const matchingLine = existingLinesMap.get(key);
            if (matchingLine) {
                filledLines.push(matchingLine);
            } else {
                filledLines.push({
                    book: checkLine.book,
                    chapter: checkLine.chapter,
                    line: checkLine.line,
                    edits: [],
                });
            }
        } else {
            filledLines.push({
                book: checkLine.book,
                chapter: checkLine.chapter,
                line: checkLine.line,
                edits: [],
            });
        }
        checkLine = BookLineInvariants.increment(checkLine);
    }
    return filledLines;
};
