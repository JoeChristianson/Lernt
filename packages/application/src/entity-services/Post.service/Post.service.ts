import type { PostDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import { createPostM, deletePostM, editPostM, readPostsM } from "./methods";

export const PostService = (deps: ServiceDeps) => ({
    create: (payload: PostDTO.CreatePostPayload) => createPostM(deps, payload),
    edit: (payload: PostDTO.EditPostPayload) => editPostM(deps, payload),
    delete: (payload: PostDTO.DeletePostPayload) => deletePostM(deps, payload),
    read: (payload: PostDTO.ReadPostsPayload) => readPostsM(deps, payload),
});
