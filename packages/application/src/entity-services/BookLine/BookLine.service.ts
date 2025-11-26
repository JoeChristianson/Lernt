import type { BookLineDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import { createBookLinesM, deleteBookLinesM, editBookLinesM, readBookLinesM } from "./methods";

export const BookLineService = (deps: ServiceDeps) => ({
    create: (payload: BookLineDTO.CreateBookLinesPayload) => createBookLinesM(deps, payload),
    edit: (payload: BookLineDTO.EditBookLinePayload) => editBookLinesM(deps, payload),
    delete: (payload: BookLineDTO.DeleteBookLinePayload) => deleteBookLinesM(deps, payload),
    read: (payload: BookLineDTO.ReadBookLinesPayload) => readBookLinesM(deps, payload),
});
