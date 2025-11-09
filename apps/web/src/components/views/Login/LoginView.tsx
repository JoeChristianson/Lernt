"use client";
import { Link } from "@lernt/next-lib";
import {
	Button,
	Card,
	CheckboxWithLabel,
	Form,
	Icon,
	TextDivider,
	TextField,
	Typography,
} from "@lernt/ui";
import { useLoginContext } from "./LoginProvider";

const LoginView = () => {
	const { formContext, onSubmit } = useLoginContext("Login View");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
			{/* Background decorative elements */}

			{/* Login card */}
			<div className="relative w-full max-w-md">
				<Card>
					{/* Logo/Header */}
					<div className="text-center mb-8">
						<Typography variant="h1">Welcome back</Typography>
						<Typography variant="body2">Sign in to continue learning</Typography>
					</div>

					{/* Form */}
					<Form formContext={formContext} onSubmit={onSubmit}>
						<div className="space-y-4">
							<TextField name="email" placeholder="Email" type="email" className="w-full" />
							<TextField
								name="password"
								type="password"
								placeholder="Password"
								className="w-full"
							/>

							<div className="flex items-center justify-between text-sm">
								<CheckboxWithLabel label="Remember me" name="rememberMe" />
								<Link href="/forgot-password">Forgot password?</Link>
							</div>

							<Button type="submit" variant="filled">
								Sign in
							</Button>
						</div>
					</Form>

					<TextDivider className="my-6">or continue with</TextDivider>

					{/* Social login options */}
					<div className="grid grid-cols-2 gap-3">
						<Button
							variant="light-filled"
							className="w-full flex items-center justify-center p-2"
							type="button"
						>
							<Icon name="google" />
							Google
						</Button>
						<Button
							variant="light-filled"
							className="w-full flex items-center justify-center p-2"
							type="button"
						>
							<Icon name="github" />
							GitHub
						</Button>
					</div>

					{/* Sign up link */}
					<Typography variant="body2" className="mt-6 text-center">
						Don't have an account? <Link href="/auth/register">Sign up for free</Link>
					</Typography>
				</Card>

				{/* Terms footer */}
				<Typography variant="body3" className="mt-4 text-center text-gray-500 dark:text-gray-400">
					By continuing, you agree to our{" "}
					<Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
						Privacy Policy
					</Link>
				</Typography>
			</div>
		</div>
	);
};

export default LoginView;
