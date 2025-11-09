import type { UserModel } from "@lernt/domain";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env?.JWT_SECRET;

interface Params {
	user: Pick<UserModel.Type, "id" | "email">;
}
const createToken = ({ user }: Params) => {
	if (!JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined");
	}
	const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "1h",
	});
	return token;
};

export default createToken;
