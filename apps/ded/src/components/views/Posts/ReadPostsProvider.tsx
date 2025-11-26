"use client";
import type { PostDTO } from "@lernt/domain";
import { api, useClientErrors } from "@lernt/next-lib";
import { LoadingSpinner } from "@lernt/ui";
import { createContext, useContext } from "react";

interface ReadPostsContextProps {
	posts: PostDTO.ReadPostsResponse;
}

const ReadPostsContext = createContext<ReadPostsContextProps | undefined>(undefined);

export const useReadPostsContext = () => {
	const context = useContext(ReadPostsContext);
	if (!context) {
		throw new Error("useReadPostsContext must be used within a ReadPostsProvider");
	}
	return context;
};

export const ReadPostsProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: posts, isLoading, error, refetch } = api.post.read.useQuery(null);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	// TODO: Skeleton UI for error state?
	if (error || !posts) {
		return <div>Error loading posts: {error?.message ?? "Unknown error"}</div>;
	}

	return <ReadPostsContext.Provider value={{ posts }}>{children}</ReadPostsContext.Provider>;
};
