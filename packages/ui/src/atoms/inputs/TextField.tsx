// components/form/form-field.tsx
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../utils";
import { Input, type InputProps } from "./components/Input";
import InputError from "./components/InputError";
import { Label } from "./components/Label";

export type FormFieldProps = Omit<InputProps, "name"> & {
	name: string;
	label?: string;
	labelClassName?: string;
	containerClassName?: string;
	description?: string;
	descriptionClassName?: string;
};

const FormField: React.FC<FormFieldProps> = ({
	name,
	label,
	description,
	className,
	containerClassName,
	labelClassName,
	descriptionClassName,
	...inputProps
}) => {
	const { control } = useFormContext();

	const inputId = React.useId();
	const describedBy: string[] = [];
	if (description) describedBy.push(`${inputId}-desc`);
	describedBy.push(`${inputId}-error`);

	return (
		<div className={cn("space-y-1.5", containerClassName)}>
			{label && (
				<Label htmlFor={inputId} className={labelClassName}>
					{label}
				</Label>
			)}

			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => (
					<Input
						id={inputId}
						aria-describedby={describedBy.join(" ")}
						error={!!fieldState.error}
						className={className}
						{...inputProps}
						{...field}
					/>
				)}
			/>

			{description && (
				<p id={`${inputId}-desc`} className={cn("text-xs text-zinc-500", descriptionClassName)}>
					{description}
				</p>
			)}

			<InputError name={name} />
		</div>
	);
};

export default FormField;
