import { authOptions } from "@lernt/auth"; // adjust path to your next-auth config
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/auth/login");
	}

	// if logged in, render the actual home content
	return <div>Welcome back, {session.user.name}</div>;
}
