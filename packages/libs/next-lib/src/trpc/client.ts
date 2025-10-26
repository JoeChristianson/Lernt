"use client";

import { httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@lernt/api";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();

export function getBaseUrl() {
    if (typeof window !== "undefined") {
        return "";
    }
    // SSR should use localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpcClient = api.createClient({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            // Include cookies with request
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: "include",
                });
            },
        }),
    ],
});
