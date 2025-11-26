"use client";
import { PostDTO } from "@lernt/domain";
import { api, createCtx, trpcClient, useClientErrors, useZodForm } from "@lernt/next-lib";
import type { UseFormReturn } from "react-hook-form";
const formSchema = PostDTO.CreatePostPayloadSchema;
type FormSchema = PostDTO.CreatePostPayload;

interface WritePostContextProps {
	formContext: UseFormReturn<FormSchema>;
	onSubmit: (data: FormSchema) => void;
}

export const [useWritePostContext, Provider] =
	createCtx<WritePostContextProps>("WritePostProvider");

export const WritePostProvider = ({ children }: { children: React.ReactNode }) => {
	const utils = api.useUtils();
	const formContext = useZodForm({
		schema: formSchema,
		mode: "onBlur",
		defaultValues: {
			text: "",
		},
	});
	const handleErrors = useClientErrors();

	console.log("!!! form context:", formContext.getValues());

	const onSubmit = (data: FormSchema) => {
		handleErrors(async () => {
			await trpcClient.post.create.mutate(data);
			formContext.reset();
			await utils.post.read.invalidate();
			await utils.post.read.refetch();
		});
	};

	return <Provider value={{ formContext, onSubmit }}>{children}</Provider>;
};
