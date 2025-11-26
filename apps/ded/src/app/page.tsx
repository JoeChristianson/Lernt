import { authOptions } from "@lernt/auth"; // adjust path to your next-auth config
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Book } from "../components/views";
export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/auth/login");
	}

	return <Book />;
}
