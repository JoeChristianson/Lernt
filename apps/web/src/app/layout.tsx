"use client";
import { api, trpcClient } from "@lernt/next-lib";
import { Header } from "@lernt/ui";
import "@lernt/ui/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<html lang="en">
			<body>
				<QueryClientProvider client={queryClient}>
					<api.Provider client={trpcClient} queryClient={queryClient}>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
						<SessionProvider>
							<Header />
							{children}
						</SessionProvider>
						<ToastContainer />
					</api.Provider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
