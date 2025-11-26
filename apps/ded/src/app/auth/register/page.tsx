import { RegisterProvider } from "../../../components/views/Register/RegisterProvider";
import RegisterView from "../../../components/views/Register/RegisterView";

const RegisterPage = () => {
	return (
		<RegisterProvider>
			<RegisterView />
		</RegisterProvider>
	);
};

export default RegisterPage;
