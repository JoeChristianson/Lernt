import { PostDTO } from "@lernt/domain";
import { PostDAL } from "../../../data-access/Post";
import { type ServiceDeps } from "../../../Service";

export const editPostM = (deps: ServiceDeps, payload: PostDTO.EditPostPayload) => {
    return PostDAL(deps).update(payload);
}
