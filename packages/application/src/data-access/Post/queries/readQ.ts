import { and, desc, eq, gte, lte, posts } from "@lernt/db";
import type { PostModel } from "@lernt/domain/src/domain-models/Post/Post.model";
import type { ServiceDeps } from "../../../Service";

export type ReadQPayload = (Partial<PostModel.Type> & {
    userId?: string;
    startDate?: Date;
    endDate?: Date;
}) | null;

export const readQ = async (deps: ServiceDeps, payload: ReadQPayload) => {
    const { tx } = deps;
    const whereClauses = [];
    if (!payload) {
        if (deps._tag !== "sessioned" || !deps.user) {
            throw new Error("Cannot read your posts without session");
        }
        return tx.select().from(posts).where(
            eq(posts.userId, deps.user.id)
        ).orderBy(desc(posts.publishedOn));
    }
    if (payload.userId) {
        whereClauses.push(eq(posts.userId, payload.userId));
    }

    if (payload.startDate) {
        whereClauses.push(gte(posts.publishedOn, payload.startDate));
    }

    if (payload.endDate) {
        whereClauses.push(lte(posts.publishedOn, payload.endDate));
    }
    if (payload.state) {
        whereClauses.push(eq(posts.state, payload.state));
    }
    const postsList = await tx
        .select()
        .from(posts)
        .where(and(...whereClauses))
        .orderBy(desc(posts.publishedOn));

    return postsList;
};
