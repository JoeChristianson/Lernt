import { appRouter, createTRPCContext as createContext } from "@lernt/api"; // must match your 
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext,
    });

export { handler as GET, handler as POST };

