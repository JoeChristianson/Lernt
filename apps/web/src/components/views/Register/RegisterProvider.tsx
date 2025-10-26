"use client";

import { UserDTO } from "@lernt/domain";
import { createCtx, trpcClient, useZodForm } from "@lernt/next-lib";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

const formSchema = UserDTO.RegisterPayloadSchema;
type FormSchema = z.infer<typeof formSchema>;

type RegisterContext = {
	formContext: UseFormReturn<FormSchema>;
	onSubmit: (data: FormSchema) => void;
};

export const [useRegisterContext, Provider] = createCtx<RegisterContext>("RegisterProvider");

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
	const formContext = useZodForm({
		schema: formSchema,
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});
	const onSubmit = async (values: FormSchema) => {
		try {
			await trpcClient.auth.register.mutate(values);
		} catch (error) {
			console.error("Registration error:", error);
		}
	};

	return <Provider value={{ formContext, onSubmit }}>{children}</Provider>;
};
