import type { ServiceDepsSessioned, ServiceDepsUnsessioned } from "@lernt/application/src/Service";
import { authOptions } from "@lernt/auth";
import { db, schema } from "@lernt/db";
import type { UserModel } from "@lernt/domain";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import type { DeferredAnyFix } from "../../../utilities/src";
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

  const session = await getServerSession(authOptions as unknown as DeferredAnyFix);
  const user = (session as DeferredAnyFix)?.user as Pick<UserModel.Type, "id" | "email"> | null;
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
  console.log("!!! ctx", ctx.user);
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
