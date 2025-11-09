import type { PostDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../../Service";
import { PostDAL } from "../../../data-access/Post";
export const readPostsM = (deps: ServiceDeps, payload: PostDTO.ReadPostsPayload) => {
    if (!payload) {
        return PostDAL(deps).read(null);
    }
    return PostDAL(deps).read({ userId: payload?.poster });
};
