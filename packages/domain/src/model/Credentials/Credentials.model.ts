import z from "zod";

export const Credentials = z.object({
	name: z.string(),
	userId: z.string().uuid(),
	hash: z.string().min(2).max(1000),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(100, "Password must be at most 100 characters long")
		.superRefine((password, ctx) => {
			const doesNotHaveASpecialCharacter = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
			const doesNotHaveUpperCase = !/[A-Z]/.test(password);
			const doesNotHaveLowerCase = !/[a-z]/.test(password);
			const doesNotHaveNumber = !/[0-9]/.test(password);

			if (doesNotHaveASpecialCharacter) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Password must contain at least one special character",
				});
			}
			if (doesNotHaveUpperCase) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Password must contain at least one uppercase letter",
				});
			}
			if (doesNotHaveLowerCase) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Password must contain at least one lowercase letter",
				});
			}
			if (doesNotHaveNumber) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Password must contain at least one number",
				});
			}
		}),
	email: z.string().email(),
});

export type Credentials = z.infer<typeof Credentials>;

export const RegisterSchema = Credentials.pick({ email: true, password: true, name: true })
	.extend({
		confirmPassword: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
			});
		}
	});
export type RegisterSchema = z.infer<typeof RegisterSchema>;
