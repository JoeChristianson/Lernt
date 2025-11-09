import z from "zod";

// @TODO - Make these more specific

const accountTypeSchema = z.string().min(2).max(100);
const providerSchema = z.string().min(2).max(100);
const providerAccountIdSchema = z.string().min(2).max(100);
const refreshTokenSchema = z.string().min(2).max(1000);
const accessTokenSchema = z.string().min(2).max(1000);
const idTokenSchema = z.string().min(2).max(1000);
const scopeSchema = z.string().min(2).max(1000);
const tokenTypeSchema = z.string().min(2).max(100);
const sessionStateSchema = z.string().min(2).max(100);

export const accountSchema = z.object({
	userId: z.string().uuid(),
	accountType: accountTypeSchema,
	provider: providerSchema,
	providerAccountId: providerAccountIdSchema,
	refreshToken: refreshTokenSchema,
	accessToken: accessTokenSchema,
	idToken: idTokenSchema,
	scope: scopeSchema,
	tokenType: tokenTypeSchema,
	sessionState: sessionStateSchema,
});

export type Account = z.infer<typeof accountSchema>;
