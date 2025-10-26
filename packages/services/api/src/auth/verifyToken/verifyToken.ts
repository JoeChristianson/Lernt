import jwt from "jsonwebtoken";

const JWT_SECRET = process.env?.JWT_SECRET;

function verifyToken(token: string) {
	try {
		if (!JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}
		const res = jwt.verify(token, JWT_SECRET) as {
			id: string;
			email: string;
		};
		return res;
	} catch (error) {
		throw new Error("Invalid token");
	}
}

export default verifyToken;
