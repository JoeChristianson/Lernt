import type { UserDTO } from "@lernt/domain";
import bcrypt from "bcryptjs";
import type { ServiceDeps } from "../../../Service";
import { UserDAL } from "../../../data-access/User.DAL/User.DAL";

export const registerM = async (deps: ServiceDeps, credentials: UserDTO.RegisterPayload): Promise<UserDTO.RegisterReturn> => {

	if (deps._tag !== "unsessioned") {
		throw new Error("Cannot register a user when already authenticated");
	}
	const userDAL = UserDAL(deps);

	const passwordHash = bcrypt.hashSync(credentials.password, 10);

	const newUser = await userDAL.createUser({
		email: credentials.email,
		password: passwordHash,
		name: credentials.name,
		emailVerified: null,
		image: null,
	});
	return {
		id: newUser.id,
		email: credentials.email,
		name: credentials.name,
		image: null,
		emailVerified: null,
	};
};


