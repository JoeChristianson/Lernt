import type { BookLineDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import {
    createM,
    deleteM,
    updateM,
} from "./mutations";
import { readQ } from "./queries";


export const BookLineDAL = (deps: ServiceDeps) => {
    return {
        create: (payload: BookLineDTO.CreateBookLinesPayload) => createM(deps, payload),
        update: (payload: BookLineDTO.EditBookLinePayload) => updateM(deps, payload),
        delete: (payload: BookLineDTO.DeleteBookLinePayload) => deleteM(deps, payload),
        read: (payload: BookLineDTO.ReadBookLinesPayload) => readQ(deps, payload),
    }
}