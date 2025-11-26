"use client";
import { Button, Form, TextField } from "@lernt/ui";
import { useWritePostContext } from "./WritePostProvider";
export const WritePostView = () => {
	const { formContext, onSubmit } = useWritePostContext("WritePostView");
	return (
		<div className="max-w-2xl mx-auto ">
			<Form onSubmit={onSubmit} formContext={formContext}>
				<TextField name="text" label="Post Content" />
				<Button type="submit">Submit Post</Button>
			</Form>
		</div>
	);
};
