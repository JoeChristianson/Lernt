import type { BookLineModel } from "@lernt/domain";
import { create } from "zustand";

interface BookLineState {
	// State
	bookLines: BookLineModel.Type[];
	isLoading: boolean;
	hasMore: boolean;
	currentPage: number;

	// Actions
	setBookLines: (lines: BookLineModel.Type[]) => void;
	addBookLines: (lines: BookLineModel.Type[]) => void;
	updateBookLine: (id: string, updates: Partial<BookLineModel.Type>) => void;
	deleteBookLine: (id: string) => void;
	setLoading: (loading: boolean) => void;
	setHasMore: (hasMore: boolean) => void;
	incrementPage: () => void;
	reset: () => void;
}

const initialState = {
	bookLines: [],
	isLoading: false,
	hasMore: true,
	currentPage: 1,
};

export const useBookLineStore = create<BookLineState>((set) => ({
	...initialState,

	setBookLines: (lines) => set({ bookLines: lines }),

	addBookLines: (lines) =>
		set((state) => ({
			bookLines: [...state.bookLines, ...lines],
		})),

	updateBookLine: (id, updates) =>
		set((state) => ({
			bookLines: state.bookLines.map((line) =>
				line.id === id ? { ...line, ...updates } : line
			),
		})),

	deleteBookLine: (id) =>
		set((state) => ({
			bookLines: state.bookLines.filter((line) => line.id !== id),
		})),

	setLoading: (loading) => set({ isLoading: loading }),

	setHasMore: (hasMore) => set({ hasMore }),

	incrementPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),

	reset: () => set(initialState),
}));
