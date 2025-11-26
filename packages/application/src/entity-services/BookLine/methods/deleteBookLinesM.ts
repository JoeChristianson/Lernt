import { BookLineDTO } from "@lernt/domain";
import { type ServiceDeps } from "../../../Service";
import { BookLineDAL } from "../../../data-access/BookLine";

export const deleteBookLinesM = (deps: ServiceDeps, payload: BookLineDTO.DeleteBookLinePayload) => {
    return BookLineDAL(deps).delete(payload);
}
