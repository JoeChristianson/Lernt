import { z } from "zod";
import { zEmail, zId } from "../../shared";
import { PostModel } from "./Post.model";
export namespace PostDTO {
    export const CreatePostPayloadSchema = PostModel.Schema.pick({
        text: true,
    });
    export type CreatePostPayload = z.infer<typeof CreatePostPayloadSchema>;

    export const ReadPostPayloadSchema = z.object({
        postId: zId
    })

    export type ReadPostPayload = z.infer<typeof ReadPostPayloadSchema>

    export const ReadPostsPayloadSchema = z.object({
        poster: zEmail,
    }).nullable()

    export type ReadPostsPayload = z.infer<typeof ReadPostsPayloadSchema>

    export const ReadPostsResponseSchema = z.array(PostModel.Schema);
    export type ReadPostsResponse = z.infer<typeof ReadPostsResponseSchema>;

    export const EditPostPayloadSchema = PostModel.Schema.pick({
        id: true,
        text: true
    })
    export type EditPostPayload = z.infer<typeof EditPostPayloadSchema>

    export const DeletePostPayloadSchema = z.array(
        zId
    )
    export type DeletePostPayload = z.infer<typeof DeletePostPayloadSchema>

}
