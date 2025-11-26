import { bookLines } from "@lernt/db";
import { BookLineDTO } from "@lernt/domain";
import { createId } from "@lernt/utilities";
import { type ServiceDeps, requireAuthed } from "../../../Service";

type Payload = BookLineDTO.CreateBookLinesPayload

export const createM = async (deps: ServiceDeps, payload: Payload) => {
    try {

        const { user, tx } = requireAuthed(deps);

        const values = payload.map((bl) => ({
            ...bl,
            id: createId(),
            userId: user.id
        }))
        await tx.insert(bookLines).values(values)
    } catch (err) {
        console.error("Error in createM:", err);
        throw err;
    }
}