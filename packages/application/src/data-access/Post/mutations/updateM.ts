import { and, eq, posts } from "@lernt/db";
import { requireAuthed, type ServiceDeps } from "../../../Service";



export const updateM = async (deps: ServiceDeps,
    payload: Payload
) => {
    const { user, tx } = requireAuthed(deps);
    await tx.update(posts).set(payload).where(
        and(eq(
            posts.userId, user.id
        ), eq(posts.id, payload.postId))
    )
}