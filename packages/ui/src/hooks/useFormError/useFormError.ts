import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

const useFormError = (fieldName: string) => {
	const formErrors = useFormContext().formState.errors;

	// errorMessage should be a string or null
	const error = useMemo(() => {
		return formErrors[fieldName];
	}, [formErrors, fieldName]);
	const errorMessage = (error?.message ?? null) as string | null;

	return { errorMessage };
};

export default useFormError;
