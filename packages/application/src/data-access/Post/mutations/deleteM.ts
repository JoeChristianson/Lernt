import { and, eq, inArray, posts } from "@lernt/db"
import type { PostDTO } from "@lernt/domain"
import { requireAuthed, type ServiceDeps } from "../../../Service"

type Payload = PostDTO.DeletePostPayload

export const deleteM = async (deps: ServiceDeps,
    payload: Payload
) => {
    const { user, tx } = requireAuthed(deps);
    await tx.delete(posts).where(
        and(eq(
            posts.userId, user.id
        ), inArray(posts.id, payload))
    )
}