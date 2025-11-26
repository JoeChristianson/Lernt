"use client";
import { BookLineDTO, type BookLineModel } from "@lernt/domain";
import { api, createCtx, useClientErrors, useZodForm } from "@lernt/next-lib";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

const formSchema = BookLineDTO.CreateBookLinesPayloadSchema;

type FormSchema = BookLineDTO.CreateBookLinesPayload;

interface BookContextProps {
	formContext: UseFormReturn<FormSchema>;
	topLine: Pick<BookLineModel.Type, "book" | "chapter" | "line">;
	setTopLine: React.Dispatch<
		React.SetStateAction<Pick<BookLineModel.Type, "book" | "chapter" | "line">>
	>;
	onSubmit: (data: FormSchema) => void;
	loadedLines: BookLineDTO.ReadBookLinesResponse;
	setLoadedLines: React.Dispatch<React.SetStateAction<BookLineDTO.ReadBookLinesResponse>>;
}

export const [useBookContext, Provider] = createCtx<BookContextProps>("BookProvider");

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
	const [loadedLines, setLoadedLines] = useState<BookLineDTO.ReadBookLinesResponse>([]);
	const utils = api.useUtils();
	const formContext = useZodForm({
		schema: formSchema,
		mode: "onBlur",
		defaultValues: [],
	});
	const [topLine, setTopLine] = useState<
		Pick<z.infer<typeof BookLineModel.Schema>, "book" | "chapter" | "line">
	>({
		book: 1,
		chapter: 1,
		line: 1,
	});

	const handleErrors = useClientErrors();
	console.log("!!! form context:", formContext.getValues());

	const onSubmit = (data: FormSchema) => {
		handleErrors(async () => {});
	};

	return (
		<Provider value={{ formContext, onSubmit, topLine, setTopLine, loadedLines, setLoadedLines }}>
			{children}
		</Provider>
	);
};
