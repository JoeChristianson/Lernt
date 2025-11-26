import { z } from "zod";
import { zContentState, zDate, zId } from "../../shared";
import { BookLineModel } from "./BookLine.model";

export namespace BookLineDTO {
    export const CreateBookLinePayloadSchema = BookLineModel.Schema.pick({
        book: true,
        chapter: true,
        line: true,
        text: true,
    });
    export type CreateBookLinePayload = z.infer<typeof CreateBookLinePayloadSchema>;

    export const CreateBookLinesPayloadSchema = z.array(CreateBookLinePayloadSchema)

    export type CreateBookLinesPayload = z.infer<typeof CreateBookLinesPayloadSchema>

    export const ReadBookLinesPayloadSchema = z.object({
        userId: z.string().nullable().optional(),
        startingBook: z.number(),
        startingChapter: z.number(),
        startingLine: z.number(),
        closingBook: z.number(),
        closingChapter: z.number(),
        closingLine: z.number(),
        versionDate: zDate.optional(),
        fillInMissing: z.boolean().optional().default(false)
    })
    export type ReadBookLinesPayload = z.infer<typeof ReadBookLinesPayloadSchema>

    export const ReadBookLinesResponseSchema = z.array(
        z.object({
            book: z.number(),
            chapter: z.number(),
            line: z.number(),
            edits: z.array(
                z.object({
                    userId: zId,
                    text: z.string(),
                    state: zContentState,
                    createdAt: zDate,
                    modifiedAt: zDate,
                    publishedAt: zDate.nullable()
                })
            )
        })
    )

    export type ReadBookLinesResponse = z.infer<typeof ReadBookLinesResponseSchema>;

    // export const EditBookLinePayloadSchema = BookLineModel.Schema.pick({
    //     id: true,
    //     state: true
    // })
    export const EditBookLinePayloadSchema = z.union(
        [z.object({
            _tag: z.literal("single").readonly(),
            id: zId.readonly(),
            state: zContentState.readonly()
        }),
        z.object({
            _tag: z.literal("multiple"),
            ids: z.array(zId),
            state: zContentState
        }
        )]
    )
    export type EditBookLinePayload = z.infer<typeof EditBookLinePayloadSchema>

    export const DeleteBookLinePayloadSchema = z.array(zId)
    export type DeleteBookLinePayload = z.infer<typeof DeleteBookLinePayloadSchema>
}
