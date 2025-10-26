// packages/services/api/src/routers/auth.ts

import { UserService } from "@lernt/application/src/entity-services/User.service/User.service";
import { UserDTO } from "@lernt/domain";
import { publicProcedure, router } from "../../context";

// Re‑use the same TRPC instance you use elsewhere:

export const authRouter = router({
    register: publicProcedure
        .input(
            UserDTO.RegisterPayloadSchema
        )
        .mutation(async ({ ctx, input }) => {
            const { db, ...serviceDeps } = ctx;
            console.log("Registering user with input:", input);
            try {

                await db.transaction(async (tx) => {
                    const userService = UserService({ tx, ...serviceDeps });
                    return await userService.register(input);
                });
            } catch (error) {
                console.error("Error during user registration:", (error as Error));
                throw error;
            }
        }),
    me: publicProcedure.query(({ ctx }) => {
        return ctx.user;
    }),
});
