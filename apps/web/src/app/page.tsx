import { authOptions } from "@lernt/auth"; // adjust path to your next-auth config
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReadPosts } from "../components/views/Posts";
import { WritePostProvider, WritePostView } from "../components/views/WritePost";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/auth/login");
	}

	// if logged in, render the actual home content
	return (
		<>
			<WritePostProvider>
				<WritePostView />
			</WritePostProvider>
			<ReadPosts />
		</>
	);
}
