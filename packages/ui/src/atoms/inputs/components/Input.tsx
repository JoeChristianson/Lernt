import { type VariantProps, cva } from "class-variance-authority";
// components/ui/input.tsx
import * as React from "react";
import { cn } from "../../../utils/cn";

const inputBase =
	"w-full rounded-lg border bg-background text-foreground placeholder:text-muted-foreground " +
	"focus:outline-none focus:ring-2 focus:ring-ring focus:border-input " +
	"disabled:cursor-not-allowed disabled:opacity-50 transition-shadow";

const inputVariants = cva(inputBase, {
	variants: {
		size: {
			sm: "h-9 px-3 text-sm",
			md: "h-10 px-3.5 text-sm",
			lg: "h-11 px-4 text-base",
		},
		tone: {
			default: "", // uses border/input/ring from tokens
			subtle: "border-muted bg-[hsl(var(--muted))]/20",
			danger: "border-destructive focus:ring-destructive",
		},
	},
	defaultVariants: {
		size: "md",
		tone: "default",
	},
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof inputVariants> & {
		/** When true, apply “danger” tone styles */
		error?: boolean;
	};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, size, tone, error, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={cn(inputVariants({ size, tone: error ? "danger" : tone }), className)}
				aria-invalid={error || undefined}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";
