import z from "zod"
import { zContentState, zDate, zId, zLongText } from "../../shared"

export namespace PostModel {
    export const Schema = z.object({
        id: zId,
        userId: zId,
        text: zLongText,
        state: zContentState,
        createdOn: zDate,
        publishedOn: zDate
    })
    export type Type = z.infer<typeof Schema>
}