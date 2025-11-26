import { BookLineInvariants } from "@lernt/domain/src/domain-models/BookLine/BookLine.invariants";
import { api } from "@lernt/next-lib";
import { useEffect, useMemo } from "react";
import { useBookContext } from "../BookProvider";

type ScrollLoaderProps = {
	linesPerPage?: number;
	linePadding?: number;
};

export const ScrollLoader = (props: ScrollLoaderProps) => {
	const { topLine, loadedLines, setLoadedLines } = useBookContext("ScrollLoader");

	const linesToLoad = useMemo(() => {
		return BookLineInvariants.getLinesToLoad({
			currentLine: topLine,
			loadedLines: loadedLines,
			linesPerPage: props.linesPerPage ?? 20,
			linePaddingMax: props.linePadding ?? 10,
			linePaddingMin: props.linePadding ? Math.floor(props.linePadding / 2) : 5,
		});
	}, [topLine, loadedLines, props.linesPerPage, props.linePadding]);
	// Here we fetch more lines based on linesToLoad
	const { data, isLoading, isError } = api.bookline.read.useQuery(
		linesToLoad as Exclude<typeof linesToLoad, null>,
		{
			enabled: Boolean(linesToLoad),
		},
	);

	useEffect(() => {
		if (data && !isLoading && !isError) {
			setLoadedLines((prev) => {
				const newLines = data.filter(
					(line) =>
						!prev.find(
							(l) => l.book === line.book && l.chapter === line.chapter && l.line === line.line,
						),
				);
				return [...prev, ...newLines]
					.sort((a, b) => {
						if (a.book !== b.book) {
							return a.book - b.book;
						}
						if (a.chapter !== b.chapter) {
							return a.chapter - b.chapter;
						}
						return a.line - b.line;
					})
					.map((line) => ({
						...line,
						edits: [
							...line.edits.map((edit) => ({
								...edit,
								createdAt: new Date(edit.createdAt),
								modifiedAt: new Date(edit.modifiedAt),
								publishedAt: edit.publishedAt ? new Date(edit.publishedAt) : null,
							})),
						],
					})); // return new objects to trigger re-renders
			});
		}
	}, [data, isLoading, isError, setLoadedLines]);

	return <>{linesToLoad ? JSON.stringify(linesToLoad) : "All lines loaded"}</>;
};
