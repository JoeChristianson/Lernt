import { BookLineDTO } from "@lernt/domain";
import { BookLineDAL } from "../../../data-access/BookLine";
import { type ServiceDeps } from "../../../Service";

export const editBookLinesM = (deps: ServiceDeps, payload: BookLineDTO.EditBookLinePayload) => {
    return BookLineDAL(deps).update(payload);
}
