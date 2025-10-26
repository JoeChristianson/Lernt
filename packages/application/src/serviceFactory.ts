import { schema } from "@lernt/db";
import type { ServiceDeps } from "./Service";
import { createUserConfigService } from "./entity-services";

export const createServices = <T extends ServiceDeps>(deps: Omit<T, "schema">) => {

	const base = {
		...deps,
		schema,
	} as T;

	return {
		userConfig: createUserConfigService(base),
	};
};
