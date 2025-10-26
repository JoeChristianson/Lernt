import type { ServiceDepsSessioned, ServiceDepsUnsessioned } from "@lernt/application/src/Service";
import { db, schema } from "@lernt/db";
import type { UserModel } from "@lernt/domain";
import { TRPCError, initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import { verifyToken } from "./auth/index";

type TRPCContextSessioned = Omit<ServiceDepsSessioned, "tx"> & {
  user: Pick<UserModel.Type, "id" | "email"> | null;
  cookies: ReturnType<typeof cookies>;
  db: typeof db;
};

type TRPCContextUnsessioned = Omit<ServiceDepsUnsessioned, "tx"> & {
  user: Pick<UserModel.Type, "id" | "email"> | null;
  cookies: ReturnType<typeof cookies>;
  db: typeof db;
};

export type TRPCContext = TRPCContextSessioned | TRPCContextUnsessioned;






export const createTRPCContext = async (opts: { req: Request }): Promise<TRPCContext> => {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  let user: Pick<UserModel.Type, "id" | "email"> | null = null;

  // Verify token if it exists
  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      // Invalid token - user remains null
      console.error("Token verification failed:", error);
    }
  }
  if (!user) {
    return {
      _tag: "unsessioned",
      user: null,
      cookies: cookieStore,
      db,
      schema,
    };
  }

  return {
    _tag: "sessioned",
    user,
    cookies: cookieStore,
    db,
    schema,
    userConfig: null,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Create tRPC router
const t = initTRPC.context<Context>().create();

// Auth middleware
export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx,
  });
});

// Export procedure builders
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
