import NextLink, { type LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		children?: React.ReactNode;
	};

export const Link: React.FC<LinkProps> = ({ className, onMouseEnter, children, ...props }) => {
	const baseClasses =
		"text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium";

	const safeOnMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = onMouseEnter ?? (() => {});

	return (
		<NextLink
			{...props}
			className={`${baseClasses} ${className ?? ""}`}
			onMouseEnter={safeOnMouseEnter}
		>
			{children}
		</NextLink>
	);
};
