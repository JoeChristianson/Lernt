"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, type UseFormReturn, useForm } from "react-hook-form";
import type { ZodType } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: Zod schema needs generic any
type SchemaType = ZodType<any, any>;

function useZodForm<TSchema extends ZodType, TFormValues>(
	props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
		schema: TSchema;
	},
): UseFormReturn<TSchema["_input"]> {
	return useForm<TSchema["_input"]>({
		mode: "all",
		...props,
		resolver: zodResolver(props.schema as SchemaType, undefined),
	}) as UseFormReturn<TSchema["_input"]>;
}

export default useZodForm;
