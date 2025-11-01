/// This will use tailwind styles

import type React from "react";

interface TypographyProps {
	variant?: "body1" | "body2" | "body3" | "h1" | "h2" | "h3" | "span";
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
	variant = "body1",
	children,
	className = "",
	style,
}) => {
	if (!children) return null;

	const baseClasses = className;

	switch (variant) {
		case "h1":
			return (
				<h1
					className={`text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 ${baseClasses}`}
					style={style}
				>
					{children}
				</h1>
			);
		case "h2":
			return (
				<h2 className={`text-gray-600 dark:text-gray-400 ${baseClasses}`} style={style}>
					{children}
				</h2>
			);
		case "h3":
			return (
				<h3 className={`text-2xl font-bold ${baseClasses}`} style={style}>
					{children}
				</h3>
			);
		case "body1":
			return (
				<p className={`text-base ${baseClasses}`} style={style}>
					{children}
				</p>
			);
		case "body2":
			return (
				<p className={`text-sm ${baseClasses}`} style={style}>
					{children}
				</p>
			);
		case "body3":
			return (
				<p className={`text-xs ${baseClasses}`} style={style}>
					{children}
				</p>
			);
		case "span":
			return (
				<span className={baseClasses} style={style}>
					{children}
				</span>
			);
		default:
			return (
				<p className={`text-base ${baseClasses}`} style={style}>
					{children}
				</p>
			);
	}
};

export default Typography;
