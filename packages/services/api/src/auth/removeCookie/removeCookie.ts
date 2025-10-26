import { type SerializeOptions, serialize } from "cookie";
import type { NextApiResponse } from "next";
export function removeCookie(res: NextApiResponse, name: string) {
	const cookieOptions: SerializeOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		path: "/",
		maxAge: 0,
	};

	res.setHeader("Set-Cookie", serialize(name, "", cookieOptions));
}

export default removeCookie;
