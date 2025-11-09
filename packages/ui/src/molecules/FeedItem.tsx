import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import { useState } from "react";

type FeedItemProps = {
	text: string;
};

export const FeedItem = ({ text }: FeedItemProps) => {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);
	const [likeCount, setLikeCount] = useState(1234);

	const handleLike = () => {
		setLiked(!liked);
		setLikeCount(liked ? likeCount - 1 : likeCount + 1);
	};

	return (
		<div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto my-4">
			{/* Post Header */}
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
						JD
					</div>
					<div>
						<div className="font-semibold text-gray-900">Jane Doe</div>
						<div className="text-sm text-gray-500">2 hours ago</div>
					</div>
				</div>
				<button className="text-gray-500 hover:text-gray-700 p-2">
					<MoreHorizontal className="w-5 h-5" />
				</button>
			</div>

			{/* Post Content */}
			<div className="px-4 pb-3">
				<p className="text-gray-800 leading-relaxed">{text}</p>
			</div>

			{/* Post Image */}
			<div className="w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 aspect-square max-h-96 flex items-center justify-center text-gray-400">
				<span className="text-sm">Image placeholder</span>
			</div>

			{/* Engagement Stats */}
			<div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500">
				<button className="hover:underline">{likeCount.toLocaleString()} likes</button>
				<button className="hover:underline">89 comments</button>
			</div>

			{/* Action Buttons */}
			<div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
				<div className="flex items-center gap-1">
					<button
						onClick={handleLike}
						className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
							liked ? "text-red-500 bg-red-50" : "text-gray-600 hover:bg-gray-100"
						}`}
					>
						<Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
						<span className="font-medium">Like</span>
					</button>
					<button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
						<MessageCircle className="w-5 h-5" />
						<span className="font-medium">Comment</span>
					</button>
					<button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
						<Share2 className="w-5 h-5" />
						<span className="font-medium">Share</span>
					</button>
				</div>
				<button
					onClick={() => setBookmarked(!bookmarked)}
					className={`p-2 rounded-lg transition-colors ${
						bookmarked ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"
					}`}
				>
					<Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
				</button>
			</div>

			{/* Comment Section Preview */}
			<div className="border-t border-gray-200 px-4 py-3">
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
						AS
					</div>
					<div className="flex-1">
						<div className="bg-gray-100 rounded-2xl px-4 py-2">
							<div className="font-semibold text-sm text-gray-900">Alex Smith</div>
							<p className="text-gray-700 text-sm">
								Wow, this looks incredible! Which trail did you take?
							</p>
						</div>
						<div className="flex items-center gap-4 px-4 mt-1 text-xs text-gray-500">
							<button className="hover:underline">Like</button>
							<button className="hover:underline">Reply</button>
							<span>1h</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
