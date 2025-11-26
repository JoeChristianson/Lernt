import type { BookLineDTO } from "../BookLine.dto";
import type { BookLineModel } from "../BookLine.model";
import { increment } from "./increment";

type Return = Omit<BookLineDTO.ReadBookLinesPayload, "versionDate" | "userId"> | null;

type Params = {
    currentLine: Pick<BookLineModel.Type, "book" | "chapter" | "line">;
    loadedLines: Pick<BookLineModel.Type, "book" | "chapter" | "line">[];
    linesPerPage: number;
    linePaddingMax: number;
    linePaddingMin: number;
};

const getStartBook = (params: Params, padding: "max" | "min") => {
    if (params.currentLine.book === 1) {
        return 1;
    }
    if (
        params.currentLine.chapter === 1 &&
        params.currentLine.line <= (padding === "max" ? params.linePaddingMax : params.linePaddingMin)
    ) {
        return params.currentLine.book - 1;
    }
    return params.currentLine.book;
};

const getStartChapter = (params: Params, padding: "max" | "min") => {
    if (params.currentLine.chapter === 1 && params.currentLine.book === 1) {
        return 1;
    }
    if (
        params.currentLine.line <= (padding === "max" ? params.linePaddingMax : params.linePaddingMin)
    ) {
        return params.currentLine.chapter === 1 ? 100 : params.currentLine.chapter - 1;
    }
    return params.currentLine.chapter;
};

const getStartLine = (params: Params, padding: "max" | "min") => {
    const intoPreviousChapter =
        params.currentLine.line <= (padding === "max" ? params.linePaddingMax : params.linePaddingMin);
    if (intoPreviousChapter) {
        if (params.currentLine.chapter === 1 && params.currentLine.book === 1) {
            return 1;
        }
        return (
            100 -
            ((padding === "max" ? params.linePaddingMax : params.linePaddingMin) -
                params.currentLine.line)
        );
    }
    return (
        params.currentLine.line - (padding === "max" ? params.linePaddingMax : params.linePaddingMin)
    );
};

const getEndBook = (params: Params, padding: "max" | "min") => {
    const { book, chapter, line } = params.currentLine;
    const linesLeft =
        params.linesPerPage + (padding === "max" ? params.linePaddingMax : params.linePaddingMin);
    if (book === 100) {
        return 100;
    }
    if (linesLeft <= 100 - line) {
        return book;
    }
    return book + 1;
};
const getEndChapter = (params: Params, padding: "max" | "min") => {
    const { book, chapter, line } = params.currentLine;
    const linesLeft =
        params.linesPerPage + (padding === "max" ? params.linePaddingMax : params.linePaddingMin);
    if (book === 100 && chapter === 100) {
        return 100;
    }
    if (linesLeft <= 100 - line) {
        return chapter;
    }
    if (chapter === 100) {
        return 1;
    }
    return chapter + 1;
};
const getEndLine = (params: Params, padding: "max" | "min") => {
    const { book, chapter, line } = params.currentLine;
    const linesLeft =
        params.linesPerPage + (padding === "max" ? params.linePaddingMax : params.linePaddingMin);
    if (book === 100 && chapter === 100) {
        return 100;
    }
    if (linesLeft <= 100 - line) {
        return line + linesLeft;
    }
    return linesLeft - (100 - line);
};

export const getLinesToLoad = (params: Params): Return => {
    const { currentLine, loadedLines, linesPerPage, linePaddingMax, linePaddingMin } = params;
    const TotalBooks = 100;
    const ChaptersPerBook = 100;
    const LinesPerChapter = 100;

    const maxPadStartBook = getStartBook(params, "max");
    const maxPadStartChapter = getStartChapter(params, "max");
    const maxPadStartLine = getStartLine(params, "max");
    const maxPadEndBook = getEndBook(params, "max");
    const maxPadEndChapter = getEndChapter(params, "max");
    const maxPadEndLine = getEndLine(params, "max");

    // Now check to see if all the minimum lines are already loaded

    let lineMissing = false;
    // lines to check within min padding
    const checkLine = {
        book: getStartBook(params, "min"),
        chapter: getStartChapter(params, "min"),
        line: getStartLine(params, "min"),
    }
    while (isLineLessThanOrEqualTo(checkLine, {
        book: getEndBook(params, "min"),
        chapter: getEndChapter(params, "min"),
        line: getEndLine(params, "min"),
    })) {
        if (!loadedLines.find(l => l.book === checkLine.book && l.chapter === checkLine.chapter && l.line === checkLine.line)) {
            lineMissing = true;
        }
        const incremented = BookLineInvariants.increment(checkLine);
        checkLine.book = incremented.book;
        checkLine.chapter = incremented.chapter;
        checkLine.line = incremented.line;
    };
    if (!lineMissing) {
        return {
            startingBook: maxPadStartBook,
            startingChapter: maxPadStartChapter,
            startingLine: maxPadStartLine,
            closingBook: maxPadEndBook,
            closingChapter: maxPadEndChapter,
            closingLine: maxPadEndLine,
            fillInMissing: true
        };
    }
    return null
}

const isLineLessThanOrEqualTo = (line: Pick<BookLineModel.Type, "book" | "chapter" | "line">, endLine: Pick<BookLineModel.Type, "book" | "chapter" | "line">) => {
    if (line.book < endLine.book) {
        return true;
    }
    if (line.book === endLine.book && line.chapter < endLine.chapter) {
        return true;
    }
    if (line.book === endLine.book && line.chapter === endLine.chapter && line.line <= endLine.line) {
        return true;
    }
    return false;
};