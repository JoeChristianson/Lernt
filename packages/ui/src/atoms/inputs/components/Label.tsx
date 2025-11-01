import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { cn } from "../../../utils/cn";

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
	({ className, ...props }, ref) => (
		<LabelPrimitive.Root
			ref={ref}
			className={cn("block text-sm font-medium text-zinc-900 dark:text-zinc-100", className)}
			{...props}
		/>
	),
);
Label.displayName = "Label";
