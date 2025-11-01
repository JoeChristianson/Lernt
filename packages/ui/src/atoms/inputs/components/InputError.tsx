// components/ui/input-error.tsx
import type * as React from "react";
import { useFormError } from "../../../hooks";
import { cn } from "../../../utils/cn";

export type InputErrorProps = {
	name: string;
	className?: string;
};

const InputError: React.FC<InputErrorProps> = ({ name, className }) => {
	const { errorMessage } = useFormError(name);

	return (
		<p role="alert" className={cn("mt-1 text-sm text-red-600", className)}>
			{errorMessage}
		</p>
	);
};

export default InputError;
