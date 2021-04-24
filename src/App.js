import { ChakraProvider } from "@chakra-ui/react";
import Chatroom from "./Chatroom";
function App() {
	return (
		<ChakraProvider>
			<Chatroom />
		</ChakraProvider>
	);
}

export default App;
