import { FeedGrid, FeedItem } from "@lernt/ui";
import { useReadPostsContext } from "./ReadPostsProvider";

export const ReadPostsInner = () => {
	const { posts } = useReadPostsContext();
	if (!posts) {
		return <div>No posts found</div>;
	}
	return (
		// TODO: Replace with proper UI
		<FeedGrid>
			{posts.map((post) => (
				<FeedItem key={post.id} text={post.text} />
			))}
		</FeedGrid>
	);
};
