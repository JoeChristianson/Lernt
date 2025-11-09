import { PostDTO } from "@lernt/domain";
import { type ServiceDeps } from "../../../Service";
import { PostDAL } from "../../../data-access/Post";
export const createPostM = (deps: ServiceDeps, payload: PostDTO.CreatePostPayload) => {

    return PostDAL(deps).create(payload);
}
