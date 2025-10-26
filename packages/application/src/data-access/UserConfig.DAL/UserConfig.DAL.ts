
import type { UserConfig } from "@lernt/domain";
import { eq } from "drizzle-orm";
import type { ServiceDeps } from "../../Service";


export const UserConfigDAL = (deps: ServiceDeps) => {
	const { schema } = deps;
	const { userConfigs } = schema;

	return {
		getUserConfig: async (userId: string) => {
			const configs = await deps.tx
				.select()
				.from(userConfigs)
				.where(eq(userConfigs.userId, userId));
			const matchingConfig = configs[0];
			if (!matchingConfig?.userId) {
				throw new Error("User Config Not Found");
			}
			return matchingConfig;
		},
		updateUserConfig: async (userId: string, config: Partial<UserConfig>) => {
			await deps.tx
				.update(userConfigs)
				.set({
					...config,
				})
				.where(eq(userConfigs.userId, userId));
		},
	};
};
