"use client";
import { Button, Form, TextField } from "@lernt/ui";
import { useLoginContext } from "./LoginProvider";

const LoginView = () => {
	const { formContext, onSubmit } = useLoginContext("Login View");
	return (
		<Form formContext={formContext} onSubmit={onSubmit}>
			<TextField name="email" placeholder="Email" />
			<TextField name="password" type="password" placeholder="Password" />
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default LoginView;
