"use client";

import { Header } from "@lernt/ui";
import { signOut } from "next-auth/react";

export function HeaderWrapper() {
	const handleLogout = async () => {
		await signOut({ callbackUrl: "/login" });
	};

	return <Header onLogout={handleLogout} />;
}
