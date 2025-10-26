"use client";
import { Button, Form, TextField } from "@lernt/ui";
import { useRegisterContext } from "./RegisterProvider";

const RegisterView = () => {
	const { formContext, onSubmit } = useRegisterContext("Register View");

	return (
		<Form formContext={formContext} onSubmit={onSubmit}>
			<TextField name="name" placeholder="Name" />
			<TextField name="email" placeholder="Email" />
			<TextField name="password" placeholder="Password" type="password" />
			<TextField name="confirmPassword" placeholder="Confirm Password" type="password" />
			<Button type="submit">Register</Button>
		</Form>
	);
};
export default RegisterView;
