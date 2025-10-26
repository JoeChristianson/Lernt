import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => {
	return (
		<button ref={ref} {...rest}>
			{children}
		</button>
	);
});

export default Button;
