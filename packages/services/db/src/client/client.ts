// packages/db/src/client.ts
import { assertDefinedVariable } from "@lernt/utilities";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import * as schema from "../schema"; // barrel file that re-exports all tables
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

assertDefinedVariable(host, "DB_HOST");
assertDefinedVariable(user, "DB_USER");
assertDefinedVariable(password, "DB_PASSWORD");
assertDefinedVariable(database, "DB_DATABASE");

const connection = mysql.createPool({
	host,
	user,
	password,
	database,
});

// singleton drizzle instance
export const db = drizzle(connection, { schema, mode: "default" });
