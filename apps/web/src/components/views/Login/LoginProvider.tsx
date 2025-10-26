"use client";
import { AuthInterface } from "@lernt/domain";
import { createCtx, useClientErrors, useZodForm } from "@lernt/next-lib";
import { signIn } from "next-auth/react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

const formSchema = AuthInterface.LoginSchema;
type FormSchema = z.infer<typeof formSchema>;

type LoginContext = {
	formContext: UseFormReturn<FormSchema>;
	onSubmit: (data: FormSchema) => void;
};

export const [useLoginContext, Provider] = createCtx<LoginContext>("LoginProvider");

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
	const formContext = useZodForm({
		schema: formSchema,
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const handleErrors = useClientErrors();
	const onSubmit = async (values: FormSchema) => {
		const { email, password } = values;
		await handleErrors(async () => {
			const res = await signIn("credentials", {
				redirect: true,
				callbackUrl: "/",
				email,
				password,
			});
			if (!res?.ok) {
				throw new Error(res?.error || "Login failed");
			}
			return res;
		});
	};
	return <Provider value={{ formContext, onSubmit }}>{children}</Provider>;
};
