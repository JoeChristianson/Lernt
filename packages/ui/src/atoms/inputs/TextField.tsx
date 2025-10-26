import type React from "react";
import { Controller, useFormContext } from "react-hook-form";

import InputError from "./components/InputError";
import Wrapper from "./components/Wrapper";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
};

const TextField = (props: TextFieldProps) => {
	const { control } = useFormContext();
	const { label, ...rest } = props;

	return (
		<Wrapper>
			{label && <label htmlFor={props.name}>{label}</label>}
			<Controller
				name={props.name}
				control={control}
				render={({ field }) => <input {...field} {...rest} />}
			/>
			<InputError name={props.name} />
		</Wrapper>
	);
};

export default TextField;
