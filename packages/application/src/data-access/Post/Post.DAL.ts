import type { PostDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import {
    createM,
    deleteM,
    updateM,
} from "./mutations";
import { readQ, type ReadQPayload } from "./queries";


export const PostDAL = (deps: ServiceDeps) => {
    return {
        create: (payload: PostDTO.CreatePostPayload) => createM(deps, payload),
        update: (payload: PostDTO.EditPostPayload) => updateM(deps, payload),
        delete: (payload: PostDTO.DeletePostPayload) => deleteM(deps, payload),
        read: (payload: ReadQPayload) => readQ(deps, payload),
    }
}