import type { HTMLAttributes } from "react";

export const Card = (
	props: Partial<HTMLAttributes<HTMLDivElement>> & {
		children: React.ReactNode | React.ReactNode[];
	},
) => {
	const { children, className, ...rest } = props;

	return (
		<div
			className={`bg-white dark:bg-gray-900 rounded-2xl shadow-soft dark:shadow-none border border-gray-200 dark:border-gray-800 p-8 ${className ?? ""}`}
			{...rest}
		>
			{children}
		</div>
	);
};
