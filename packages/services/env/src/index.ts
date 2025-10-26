import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
export const getEnvSchema = () => {
    return z.object({
        NEXTAUTH_URL: z.string().url().optional(),
        NEXTAUTH_SECRET: z.string(),
        DB_HOST: z.string(),
        DB_PORT: z.string().transform((val) => Number.parseInt(val, 10)),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),
        DB_DATABASE: z.string(),
        DATABASE_URL: z.string().optional(),
        NODE_ENV: z.enum(["development", "production", "test"]),
        JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
        SKIP_ENV_CHECK: z.string().optional(),
        GOOGLE_ID: z.string(),
        GOOGLE_SECRET: z.string(),
        GITHUB_ID: z.string(),
        GITHUB_SECRET: z.string()
    });
};

const envSchema = getEnvSchema();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
