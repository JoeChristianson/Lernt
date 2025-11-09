import { PostService } from "@lernt/application";
import { PostDTO } from "@lernt/domain";
import { protectedProcedure, router } from "../../context";

export const postRouter = router({
    create: protectedProcedure.input(PostDTO.CreatePostPayloadSchema).mutation(async ({ input, ctx }) => {
        console.log("Creating post with input:", input);
        await ctx.db.transaction(async (tx) => {
            return await PostService({
                ...ctx,
                tx
            }).create(input);
        });
    }),
    edit: protectedProcedure.input(PostDTO.EditPostPayloadSchema).mutation(async ({ input, ctx }) => {
        await ctx.db.transaction(async (tx) => {
            return await PostService({
                ...ctx,
                tx
            }).edit(input);
        });
    }),
    delete: protectedProcedure.input(PostDTO.DeletePostPayloadSchema).mutation(async ({ input, ctx }) => {
        await ctx.db.transaction(async (tx) => {
            return await PostService({
                ...ctx,
                tx
            }).delete(input);
        });
    }),
    read: protectedProcedure.input(PostDTO.ReadPostsPayloadSchema).query(async ({ input, ctx }) => {
        return await ctx.db.transaction(async (tx) => {
            return await PostService({
                ...ctx,
                tx
            }).read(input);
        });
    }),
});
