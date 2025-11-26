import { and, bookLines, eq, inArray } from "@lernt/db"
import type { BookLineDTO } from "@lernt/domain"
import { requireAuthed, type ServiceDeps } from "../../../Service"

type Payload = BookLineDTO.DeleteBookLinePayload

export const deleteM = async (deps: ServiceDeps,
    payload: Payload
) => {
    const { user, tx } = requireAuthed(deps);
    await tx.delete(bookLines).where(
        and(eq(
            bookLines.userId, user.id
        ), inArray(bookLines.id, payload))
    )
}