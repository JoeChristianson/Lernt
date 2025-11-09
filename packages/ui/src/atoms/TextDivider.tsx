type TextDividerProps = {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
};

export const TextDivider: React.FC<TextDividerProps> = ({ children, className }) => {
	return (
		<div className={`relative my-6 ${className}`}>
			<div className="absolute inset-0 flex items-center">
				<div className="w-full border-t border-gray-200 dark:border-gray-800" />
			</div>
			<div className="relative flex justify-center text-sm">
				<span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
					{children}
				</span>
			</div>
		</div>
	);
};
