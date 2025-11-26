import { and, bookLines, eq, inArray, type SQLWrapper } from "@lernt/db";
import { BookLineDTO } from "@lernt/domain";
import { requireAuthed, type ServiceDeps } from "../../../Service";


export const updateM = async (deps: ServiceDeps,
    payload: BookLineDTO.EditBookLinePayload
) => {
    const { user, tx } = requireAuthed(deps);
    const whereClauses: SQLWrapper[] = [eq(
        bookLines.userId, user.id
    )]
    if (payload._tag === "single") {
        whereClauses.push(eq(bookLines.id, payload.id))
    }
    if (payload._tag === "multiple") {
        whereClauses.push(inArray(bookLines.id, payload.ids))
    }
    await tx.update(bookLines).set(payload).where(
        and(...whereClauses)
    )
}