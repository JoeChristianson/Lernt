import { router } from "../context";
import { authRouter } from "./auth/router";
import { booklineRouter } from "./bookline/router";
import { postRouter } from "./post/router";



export const appRouter = router({
    auth: authRouter,
    bookline: booklineRouter,
    post: postRouter,
});

export type AppRouter = typeof appRouter;