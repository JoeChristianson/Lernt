import { BookProvider } from "./BookProvider";
import { BookView } from "./BookView";

export const Book = () => {
	return (
		<BookProvider>
			<BookView />
		</BookProvider>
	);
};
