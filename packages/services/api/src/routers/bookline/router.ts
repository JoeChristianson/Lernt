import { BookLineService } from "@lernt/application";
import { BookLineDTO } from "@lernt/domain";
import { protectedProcedure, router } from "../../context";

export const booklineRouter = router({
    create: protectedProcedure.input(BookLineDTO.CreateBookLinesPayloadSchema).mutation(async ({ input, ctx }) => {
        console.log("Creating booklines with input:", input);
        await ctx.db.transaction(async (tx) => {
            return await BookLineService({
                ...ctx,
                tx
            }).create(input);
        });
    }),
    edit: protectedProcedure.input(BookLineDTO.EditBookLinePayloadSchema).mutation(async ({ input, ctx }) => {
        await ctx.db.transaction(async (tx) => {
            return await BookLineService({
                ...ctx,
                tx
            }).edit(input);
        });
    }),
    delete: protectedProcedure.input(BookLineDTO.DeleteBookLinePayloadSchema).mutation(async ({ input, ctx }) => {
        await ctx.db.transaction(async (tx) => {
            return await BookLineService({
                ...ctx,
                tx
            }).delete(input);
        });
    }),
    read: protectedProcedure.input(BookLineDTO.ReadBookLinesPayloadSchema).query(async ({ input, ctx }) => {
        return await ctx.db.transaction(async (tx) => {
            return await BookLineService({
                ...ctx,
                tx
            }).read(input);
        });
    }),
});
