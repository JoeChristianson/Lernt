import React, { useMemo } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "outline" | "filled" | "light-filled" | "grey-filled";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className: classNameProp, variant = "filled", children, ...rest } = props;
	const baseClass = useMemo(() => {
		if (variant === "filled") {
			return "w-full bg-gradient-primary hover:opacity-90 transition-opacity";
		}
		if (variant === "light-filled") {
			return "w-full bg-gradient-primary-light hover:bg-gradient-primary-light/80 transition-opacity";
		}
		if (variant === "grey-filled") {
			return "w-full bg-gradient-gray hover:bg-gradient-gray/80 transition-opacity";
		}
		return "border border-gray-300 dark:border-gray-700";
	}, [variant]);

	const className = [baseClass, classNameProp].filter(Boolean).join(" ");
	console.log("Button className:", className);
	return (
		<button ref={ref} className={className} {...rest}>
			{children}
		</button>
	);
});

export default Button;
