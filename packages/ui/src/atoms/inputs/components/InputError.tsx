import { useFormError } from "../../../hooks";

const InputError = ({ name }: { name: string }) => {
	const { errorMessage } = useFormError(name);
	return errorMessage ? <span>{errorMessage}</span> : null;
};

export default InputError;
