"use client";
import { toast } from "react-toastify";

type Args = {
	defaultMessage?: string;
};

const useClientErrors = () => {
	const handleErrors = async <T,>(cb: () => Promise<T>, args?: Args): Promise<T | null> => {
		try {
			return await cb();
		} catch (e) {
			console.error(e);
			const error = e instanceof Error ? e.message : String(e);
			toast.error(args?.defaultMessage ?? error ?? "An error occurred");

			return null;
		}
	};

	return handleErrors;
};

export default useClientErrors;
