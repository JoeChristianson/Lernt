import type { HTMLAttributes } from "react";

type CheckboxWithLabelProps = HTMLAttributes<HTMLInputElement> & {
	label: string;
	name?: string;
	containerProps?: HTMLAttributes<HTMLLabelElement>;
	textProps?: HTMLAttributes<HTMLSpanElement>;
};

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
	label,
	containerProps,
	textProps,
	className,
	...checkboxProps
}) => {
	const { className: containerClassName, ...restContainerProps } = containerProps || {};
	const { className: textClassName, ...restTextProps } = textProps || {};

	return (
		<label
			{...restContainerProps}
			className={`flex items-center gap-2 cursor-pointer ${containerClassName ?? ""}`}
		>
			<input
				type="checkbox"
				{...checkboxProps}
				className={`rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${className ?? ""}`}
			/>
			<span
				{...restTextProps}
				className={`text-gray-600 dark:text-gray-400 ${textClassName ?? ""}`}
			>
				{label}
			</span>
		</label>
	);
};
