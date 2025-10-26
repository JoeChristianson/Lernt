import { env } from "@lernt/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    schema: "./src/schema/index.ts",
    out: "./migrations",
    dbCredentials: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        port: env.DB_PORT ?? 3306,
        database: env.DB_DATABASE,
    },
});
