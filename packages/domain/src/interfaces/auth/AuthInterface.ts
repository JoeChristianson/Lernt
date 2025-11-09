import { Credentials } from "../../domain-models";

namespace AuthInterface {
	export const LoginSchema = Credentials.pick({
		password: true,
		email: true,
	});
	export const RegisterSchema = Credentials.pick({
		name: true,
		email: true,
		password: true,
	})
		.extend({
			confirmPassword: Credentials.shape.password,
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: "Passwords must match",
			path: ["confirmPassword"],
		});
}

export default AuthInterface;
