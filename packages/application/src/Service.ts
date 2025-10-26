import type { db } from "@lernt/db";
import type * as schema from "@lernt/db/src/schema/index.js";
import type { Session, UserConfig } from "@lernt/domain/src";

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
