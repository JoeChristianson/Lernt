import z from "zod";

export namespace UserModel {

	export const Schema = z.object({
		id: z.string().uuid(),
		email: z.string().email(),
		emailVerified: z.date().nullable(),
		name: z.string().min(1).max(100),
		image: z.string().url().nullable(),
		password: z
			.string()
			.min(2)
			.max(1000)
			.refine((val) => {
				// Password must be hashed
				return val.length > 20;
			}),
	});

	export type Type = z.infer<typeof Schema>;
}
