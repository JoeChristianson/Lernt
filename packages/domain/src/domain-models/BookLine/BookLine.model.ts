import z from "zod"
import { zContentState, zDate, zId } from "../../shared"

export namespace BookLineModel {
    export const Schema = z.object({
        id: zId,
        userId: zId,
        book: z.number().int().min(1).max(100),
        chapter: z.number().int().min(1).max(100),
        line: z.number().int().min(1).max(100),
        text: z.string().max(70),
        state: zContentState,
        createdAt: zDate,
        updatedAt: zDate
    })
    export type Type = z.infer<typeof Schema>
}
