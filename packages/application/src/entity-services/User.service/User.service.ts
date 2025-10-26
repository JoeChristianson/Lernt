import type { RegisterSchema, UserDTO } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import { loginM, registerM } from "./methods";

export const UserService = (deps: ServiceDeps) => {
	const register = async (payload: RegisterSchema) => {
		return await registerM(deps, payload);
	};

	const login = async (payload: UserDTO.LoginPayload) => {
		return await loginM(deps, payload);
	};

	return {
		register,
		login,
	};
};
