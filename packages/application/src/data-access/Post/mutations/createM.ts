import { posts } from "@lernt/db";
import type { PostDTO } from "@lernt/domain";
// TODO: fix import path
import { createId } from "@lernt/utilities";
import { type ServiceDeps, requireAuthed } from "../../../Service";
type Payload = PostDTO.CreatePostPayload

export const createM = async (deps: ServiceDeps, payload: Payload) => {
    try {

        const { user, tx } = requireAuthed(deps);
        const uuid = createId()
        await tx.insert(posts).values([{
            ...payload,
            id: uuid,
            createdOn: new Date(),
            publishedOn: new Date(),
            userId: user.id
        }])
    } catch (err) {
        console.error("Error in createM:", err);
        throw err;
    }
}