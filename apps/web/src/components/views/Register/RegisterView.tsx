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
import { useRegisterContext } from "./RegisterProvider";

const RegisterView = () => {
	const { formContext, onSubmit } = useRegisterContext("Register View");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
			{/* Register card */}
			<div className="relative w-full max-w-md">
				<Card>
					{/* Logo/Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
							Headline Here
						</h1>
						<p className="text-gray-600 dark:text-gray-400">Create your free account in seconds</p>
					</div>

					{/* Social signup options */}
					<div className="grid grid-cols-2 gap-3 mb-6">
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
					<TextDivider className="mb-6">or sign up with email</TextDivider>

					{/* Form */}
					<Form formContext={formContext} onSubmit={onSubmit}>
						<div className="space-y-4">
							<TextField name="name" placeholder="Full name" className="w-full" />
							<TextField name="email" placeholder="Email address" type="email" className="w-full" />
							<TextField
								name="password"
								placeholder="Create password"
								type="password"
								className="w-full"
							/>
							<TextField
								name="confirmPassword"
								placeholder="Confirm password"
								type="password"
								className="w-full"
							/>

							{/* Password requirements hint */}
							<div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
								<Typography variant="body3" className="font-bold">
									Password must include:
								</Typography>
								<ul className="space-y-0.5 ml-4">
									<li>• At least 8 characters</li>
									<li>• One uppercase and lowercase letter</li>
									<li>• One number</li>
								</ul>
							</div>
							<CheckboxWithLabel
								label="I agree to the Terms of Service and Privacy Policy"
								name="terms"
								textProps={{ className: "text-sm text-gray-600 dark:text-gray-400" }}
							/>

							<Button
								type="submit"
								className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
							>
								Create account
							</Button>
						</div>
					</Form>

					{/* Login link */}
					<Typography variant="body2" className="mt-6 text-center">
						Already have an account? <Link href="/auth/login">Log in</Link>
					</Typography>
				</Card>

				{/* @TODO: Trust indicators */}
				
				{/* <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
					<div className="flex items-center gap-1.5">
						<svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Secure signup</span>
					</div>
					<div className="flex items-center gap-1.5">
						<svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Free forever</span>
					</div>
					<div className="flex items-center gap-1.5">
						<svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
						<span>No spam, ever</span>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default RegisterView;
