import z from "zod";
import { zEmail, zId, zPassword, zUrl } from "../../shared";
export namespace UserModel {

	export const Schema = z.object({
		id: zId,
		email: zEmail,
		emailVerified: z.date().nullable(),
		name: z.string().min(1).max(100),
		image: zUrl.nullable(),
		password: zPassword
	});

	export type Type = z.infer<typeof Schema>;
}
