"use client";
import { ReadPostsInner } from "./ReadPostsInner";
import { ReadPostsProvider } from "./ReadPostsProvider";

export const ReadPosts = () => {
	return (
		<ReadPostsProvider>
			<ReadPostsInner />
		</ReadPostsProvider>
	);
};
