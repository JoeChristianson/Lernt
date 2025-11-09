// domain/types/session.ts
import { z } from "zod";
import { UserModel } from "../../User";

export const sessionSchema = z.object({
	user: UserModel.Schema,
});

export type Session = z.infer<typeof sessionSchema>;
