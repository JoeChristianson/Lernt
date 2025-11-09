"use client";
import type React from "react";
import { type FieldValues, FormProvider, type UseFormReturn } from "react-hook-form";
import { Typography } from "../../atoms";

// reexport UseFormReturn to ensure consistent versions of react-hook-form
export type { UseFormReturn };

const RootError = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<Typography variant="body2" className="mt-4 text-red-600">
			{errorMessage}
		</Typography>
	);
};

interface FormProps<T extends FieldValues> {
	formContext: UseFormReturn<T>;
	children: React.ReactNode;
	onSubmit: (data: T) => void;
}

const Form = <T extends FieldValues>({
	formContext,
	children,
	onSubmit,
	...rest
}: FormProps<T>) => {
	const rootError = formContext.formState.errors.root;
	return (
		<FormProvider {...formContext}>
			<form
				onSubmitCapture={(e) => console.log("⚡️ capture submit")}
				onSubmit={formContext.handleSubmit(onSubmit, (errors) =>
					console.error("❌ validation errors:", errors),
				)}
				{...rest}
			>
				{children}
				{rootError?.message && <RootError errorMessage={rootError.message} />}
			</form>
		</FormProvider>
	);
};

export default Form;
