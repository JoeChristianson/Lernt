import z from "zod";

export const themeOptions = ["light", "dark"] as const;

export const themeSchema = z.enum(themeOptions);

export const userConfigSchema = z.object({
	userId: z.string().uuid(),
	theme: themeSchema,
});

export type UserConfig = z.infer<typeof userConfigSchema>;
