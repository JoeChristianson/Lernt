import { describe, it, expect } from "vitest";
import { increment } from "./increment";

describe("increment", () => {
	describe("incrementing within a chapter", () => {
		it("should increment line from 1 to 2", () => {
			const result = increment({ book: 1, chapter: 1, line: 1 });
			expect(result).toEqual({ book: 1, chapter: 1, line: 2 });
		});

		it("should increment line from 50 to 51", () => {
			const result = increment({ book: 5, chapter: 10, line: 50 });
			expect(result).toEqual({ book: 5, chapter: 10, line: 51 });
		});

		it("should increment line from 99 to 100", () => {
			const result = increment({ book: 1, chapter: 1, line: 99 });
			expect(result).toEqual({ book: 1, chapter: 1, line: 100 });
		});
	});

	describe("incrementing at end of chapter (line 100)", () => {
		it("should move to next chapter when at line 100", () => {
			const result = increment({ book: 1, chapter: 1, line: 100 });
			expect(result).toEqual({ book: 1, chapter: 2, line: 1 });
		});

		it("should move from chapter 50, line 100 to chapter 51, line 1", () => {
			const result = increment({ book: 3, chapter: 50, line: 100 });
			expect(result).toEqual({ book: 3, chapter: 51, line: 1 });
		});

		it("should move from chapter 99, line 100 to chapter 100, line 1", () => {
			const result = increment({ book: 2, chapter: 99, line: 100 });
			expect(result).toEqual({ book: 2, chapter: 100, line: 1 });
		});
	});

	describe("incrementing at end of book (chapter 100, line 100)", () => {
		it("should move to next book when at chapter 100, line 100", () => {
			const result = increment({ book: 1, chapter: 100, line: 100 });
			expect(result).toEqual({ book: 2, chapter: 1, line: 1 });
		});

		it("should move from book 50 to book 51", () => {
			const result = increment({ book: 50, chapter: 100, line: 100 });
			expect(result).toEqual({ book: 51, chapter: 1, line: 1 });
		});

		it("should move from book 99 to book 100", () => {
			const result = increment({ book: 99, chapter: 100, line: 100 });
			expect(result).toEqual({ book: 100, chapter: 1, line: 1 });
		});
	});

	describe("boundary conditions", () => {
		it("should not increment beyond book 100, chapter 100, line 100", () => {
			const result = increment({ book: 100, chapter: 100, line: 100 });
			expect(result).toEqual({ book: 100, chapter: 100, line: 100 });
		});

		it("should increment normally at book 100, chapter 50, line 50", () => {
			const result = increment({ book: 100, chapter: 50, line: 50 });
			expect(result).toEqual({ book: 100, chapter: 50, line: 51 });
		});

		it("should increment to next chapter at book 100, chapter 50, line 100", () => {
			const result = increment({ book: 100, chapter: 50, line: 100 });
			expect(result).toEqual({ book: 100, chapter: 51, line: 1 });
		});

		it("should increment to next chapter at book 100, chapter 99, line 100", () => {
			const result = increment({ book: 100, chapter: 99, line: 100 });
			expect(result).toEqual({ book: 100, chapter: 100, line: 1 });
		});

		it("should not increment at absolute boundary", () => {
			const result = increment({ book: 100, chapter: 100, line: 100 });
			expect(result).toEqual({ book: 100, chapter: 100, line: 100 });
		});
	});

	describe("immutability", () => {
		it("should not mutate the original object", () => {
			const original = { book: 1, chapter: 1, line: 50 };
			const originalCopy = { ...original };
			const result = increment(original);

			expect(original).toEqual(originalCopy);
			expect(result).not.toBe(original);
		});

		it("should return a new object", () => {
			const original = { book: 1, chapter: 1, line: 1 };
			const result = increment(original);

			expect(result).not.toBe(original);
		});
	});

	describe("sequence validation", () => {
		it("should correctly increment through a sequence of lines", () => {
			let position = { book: 1, chapter: 1, line: 98 };

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 1, line: 99 });

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 1, line: 100 });

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 2, line: 1 });

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 2, line: 2 });
		});

		it("should correctly increment through end of book sequence", () => {
			let position = { book: 1, chapter: 100, line: 98 };

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 100, line: 99 });

			position = increment(position);
			expect(position).toEqual({ book: 1, chapter: 100, line: 100 });

			position = increment(position);
			expect(position).toEqual({ book: 2, chapter: 1, line: 1 });

			position = increment(position);
			expect(position).toEqual({ book: 2, chapter: 1, line: 2 });
		});
	});
});
