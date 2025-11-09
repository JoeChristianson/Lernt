import { PostDTO } from "@lernt/domain";
import { type ServiceDeps } from "../../../Service";
import { PostDAL } from "../../../data-access/Post";

export const deletePostM = (deps: ServiceDeps, payload: PostDTO.DeletePostPayload) => {
    return PostDAL(deps).delete(payload);
}
