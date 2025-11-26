import { BookLineDTO } from "@lernt/domain";
import { type ServiceDeps } from "../../../Service";
import { BookLineDAL } from "../../../data-access/BookLine";

export const createBookLinesM = (deps: ServiceDeps, payload: BookLineDTO.CreateBookLinesPayload) => {
    return BookLineDAL(deps).create(payload);
}
