import { eq, users } from "@lernt/db";
import type { UserModel } from "@lernt/domain";
import type { ServiceDeps } from "../../Service";

export const UserDAL = (deps: ServiceDeps) => {
	return {
		createUser: async (userData: Omit<UserModel.Type, "id">) => {
			const userId = crypto.randomUUID();
			const newUser = {
				id: userId,
				...userData,
			};

			await deps.tx.insert(users).values(newUser);
			return newUser;
		},

		getUser: async (userId: string) => {
			const result = await deps.tx.select().from(users).where(eq(users.id, userId)).limit(1);
			const user = result[0];
			if (!user?.id) {
				throw new Error("User Not Found");
			}
			return user;
		},

		getUserByEmail: async (email: string) => {
			const result = await deps.tx.select().from(users).where(eq(users.email, email)).limit(1);

			return result[0] || null;
		},

		updateUser: async (userId: string, userData: Partial<Omit<UserModel.Type, "id">>) => {
			await deps.tx.update(users).set(userData).where(eq(users.id, userId));
		},
	};
};
