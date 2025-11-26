import type { BookLineModel } from "../BookLine.model";

/**
 * Increments a book line position to the next line.
 *
 * Rules:
 * - Each chapter has 100 lines (1-100)
 * - Each book has 100 chapters (1-100)
 * - There are 100 books total (1-100)
 * - When at line 100, move to line 1 of next chapter
 * - When at chapter 100, line 100, move to chapter 1, line 1 of next book
 * - When at book 100, chapter 100, line 100, no further increment (boundary)
 *
 * @param position - The current book line position
 * @returns A new position object incremented by one line
 */
export const increment = ({
    book,
    chapter,
    line,
}: Pick<BookLineModel.Type, "book" | "chapter" | "line">): Pick<
    BookLineModel.Type,
    "book" | "chapter" | "line"
> => {
    // Increment line if not at end of chapter
    if (line < 100) {
        return { book, chapter, line: line + 1 };
    }

    // At end of chapter (line 100), move to next chapter
    if (chapter < 100) {
        return { book, chapter: chapter + 1, line: 1 };
    }

    // At end of book (chapter 100, line 100), move to next book
    if (book < 100) {
        return { book: book + 1, chapter: 1, line: 1 };
    }

    // At absolute end (book 100, chapter 100, line 100), no increment
    return { book, chapter, line };
};
