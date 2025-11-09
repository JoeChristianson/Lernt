import type { db } from "@lernt/db";
import type * as schema from "@lernt/db/src/schema/index.js";
import type { Session, UserConfig } from "@lernt/domain/src";
import { assertTruthy } from "@lernt/utilities";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type Schema = typeof schema;

export type ServiceDepsSessioned = {
  _tag: "sessioned";
  tx: Transaction;
  schema: Schema;
  user: Pick<Session["user"], "id" | "email"> | null;
  userConfig: UserConfig | null;
};

export type ServiceDepsUnsessioned = {
  _tag: "unsessioned";
  tx: Transaction;
  schema: Schema;
};

export type ServiceDeps = ServiceDepsSessioned | ServiceDepsUnsessioned;

export const requireAuthed = (ctx: ServiceDeps): ServiceDepsSessioned & {
  user: NonNullable<ServiceDepsSessioned["user"]>;
} => {
  if (ctx._tag === "unsessioned") {
    throw new Error("User Not Authenticated");
  }
  const { user } = ctx;
  assertTruthy(user, "User in Ctx");
  return { ...ctx, user };
}
