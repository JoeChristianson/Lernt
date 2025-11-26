import { describe, it, expect } from "vitest";
import { getLinesToLoad } from "./getLinesToLoad";
import type { BookLineModel } from "../BookLine.model";

type BookLinePosition = Pick<BookLineModel.Type, "book" | "chapter" | "line">;

describe("getLinesToLoad", () => {
	describe("when all minimum lines are loaded", () => {
		it("should return max padding range for middle of chapter", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 40 },
					{ book: 1, chapter: 1, line: 65 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 40,
				closingBook: 1,
				closingChapter: 1,
				closingLine: 70,
			});
		});

		it("should return max padding range at start of book", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 1 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 1 },
					{ book: 1, chapter: 1, line: 21 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 1,
				closingBook: 1,
				closingChapter: 1,
				closingLine: 21,
			});
		});

		it("should handle transition between chapters", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 98 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 88 },
					{ book: 1, chapter: 2, line: 18 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 88,
				closingBook: 1,
				closingChapter: 2,
				closingLine: 18,
			});
		});

		it("should handle lines near start of chapter needing previous chapter", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 2, line: 3 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 93 },
					{ book: 1, chapter: 2, line: 23 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 93,
				closingBook: 1,
				closingChapter: 2,
				closingLine: 23,
			});
		});

		it("should handle transition between books", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 100, line: 98 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 100, line: 88 },
					{ book: 2, chapter: 1, line: 18 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 100,
				startingLine: 88,
				closingBook: 2,
				closingChapter: 1,
				closingLine: 18,
			});
		});

		it("should handle lines near start of book needing previous book", () => {
			const result = getLinesToLoad({
				currentLine: { book: 2, chapter: 1, line: 3 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 100, line: 93 },
					{ book: 2, chapter: 1, line: 23 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 100,
				startingLine: 93,
				closingBook: 2,
				closingChapter: 1,
				closingLine: 23,
			});
		});

		it("should not go before book 1, chapter 1, line 1", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 3 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 1 },
					{ book: 1, chapter: 1, line: 23 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 1,
				closingBook: 1,
				closingChapter: 1,
				closingLine: 23,
			});
		});

		it("should handle end boundary at book 100, chapter 100, line 100", () => {
			const result = getLinesToLoad({
				currentLine: { book: 100, chapter: 100, line: 95 },
				loadedLines: generateLineRange(
					{ book: 100, chapter: 100, line: 85 },
					{ book: 100, chapter: 100, line: 100 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toEqual({
				startingBook: 100,
				startingChapter: 100,
				startingLine: 85,
				closingBook: 100,
				closingChapter: 100,
				closingLine: 100,
			});
		});
	});

	describe("when minimum lines are missing", () => {
		it("should return null when a line is missing in minimum range", () => {
			const loadedLines = generateLineRange(
				{ book: 1, chapter: 1, line: 40 },
				{ book: 1, chapter: 1, line: 65 }
			);
			// Remove one line from the middle
			const lineToRemove = loadedLines.findIndex(
				(l) => l.book === 1 && l.chapter === 1 && l.line === 50
			);
			loadedLines.splice(lineToRemove, 1);

			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines,
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toBeNull();
		});

		it("should return null when starting lines are missing", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 46 }, // Missing lines 40-45
					{ book: 1, chapter: 1, line: 65 }
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toBeNull();
		});

		it("should return null when ending lines are missing", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 40 },
					{ book: 1, chapter: 1, line: 59 } // Missing lines 60-65
				),
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toBeNull();
		});

		it("should return null when no lines are loaded", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: [],
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toBeNull();
		});

		it("should return null when lines span across chapters and some are missing", () => {
			const loadedLines = [
				...generateLineRange(
					{ book: 1, chapter: 1, line: 93 },
					{ book: 1, chapter: 1, line: 100 }
				),
				...generateLineRange(
					{ book: 1, chapter: 2, line: 1 },
					{ book: 1, chapter: 2, line: 10 } // Missing lines 11-23
				),
			];

			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 2, line: 3 },
				loadedLines,
				linesPerPage: 10,
				linePaddingMax: 10,
				linePaddingMin: 5,
			});

			expect(result).toBeNull();
		});
	});

	describe("edge cases", () => {
		it("should handle zero padding", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 50 },
					{ book: 1, chapter: 1, line: 60 }
				),
				linesPerPage: 10,
				linePaddingMax: 0,
				linePaddingMin: 0,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 50,
				closingBook: 1,
				closingChapter: 1,
				closingLine: 60,
			});
		});

		it("should handle large padding values", () => {
			const result = getLinesToLoad({
				currentLine: { book: 2, chapter: 50, line: 50 },
				loadedLines: generateLineRange(
					{ book: 2, chapter: 49, line: 1 },
					{ book: 2, chapter: 51, line: 99 }
				),
				linesPerPage: 10,
				linePaddingMax: 50,
				linePaddingMin: 25,
			});

			expect(result).toEqual({
				startingBook: 2,
				startingChapter: 49,
				startingLine: 1,
				closingBook: 2,
				closingChapter: 51,
				closingLine: 60,
			});
		});

		it("should handle single line per page", () => {
			const result = getLinesToLoad({
				currentLine: { book: 1, chapter: 1, line: 50 },
				loadedLines: generateLineRange(
					{ book: 1, chapter: 1, line: 45 },
					{ book: 1, chapter: 1, line: 56 }
				),
				linesPerPage: 1,
				linePaddingMax: 5,
				linePaddingMin: 3,
			});

			expect(result).toEqual({
				startingBook: 1,
				startingChapter: 1,
				startingLine: 45,
				closingBook: 1,
				closingChapter: 1,
				closingLine: 56,
			});
		});
	});
});

// Helper function to generate a range of book lines
function generateLineRange(
	start: BookLinePosition,
	end: BookLinePosition
): BookLinePosition[] {
	const lines: BookLinePosition[] = [];
	let current = { ...start };

	while (
		current.book < end.book ||
		(current.book === end.book && current.chapter < end.chapter) ||
		(current.book === end.book &&
			current.chapter === end.chapter &&
			current.line <= end.line)
	) {
		lines.push({ ...current });

		// Increment logic
		if (current.line < 100) {
			current.line++;
		} else if (current.chapter < 100) {
			current.chapter++;
			current.line = 1;
		} else if (current.book < 100) {
			current.book++;
			current.chapter = 1;
			current.line = 1;
		} else {
			break;
		}
	}

	return lines;
}
