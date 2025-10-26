import type { UserConfig } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";
import { UserConfigDAL } from "../../data-access/UserConfig.DAL/UserConfig.DAL";

export const createUserConfigService = (deps: ServiceDeps) => {
	const userConfigDAL = UserConfigDAL(deps);
	return {
		getUserConfig: async (userId: string) => {
			const config = await userConfigDAL.getUserConfig(userId);
			return config;
		},
		updateUserConfig: async (userId: string, config: Partial<UserConfig>) => {
			await userConfigDAL.updateUserConfig(userId, config);
		},
	};
};
