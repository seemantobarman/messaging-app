import React, { useState } from "react";
import {
	useColorModeValue,
	Button,
	Input,
	Heading,
	Flex,
} from "@chakra-ui/react";

const Login = (props) => {
	const [name, setName] = useState("");
	const formBackground = useColorModeValue("blue.50", "blue.900");

	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<Flex
				width={{ base: "80%", sm: "70%", md: "70%", lg: "50%" }}
				direction="column"
				background={formBackground}
				p={12}
				rounded={50}
			>
				<Heading textAlign="center" mb={6} size="lg">
					Enter a name and join the chat
				</Heading>
				<form
					onSubmit={(event) => {
						props.setTheUser(name);

						event.preventDefault();
					}}
				>
					<Flex alignItems="center" justifyContent="center" direction="column">
						<Input
							rounded={10}
							bgColor="white"
							value={name}
							onChange={(event) => {
								setName(event.target.value.trim());
							}}
							placeholder="Enter a name"
							marginBottom="5px"
							isRequired
						/>
						<Button isDisabled={!name} colorScheme="blue">
							Submit
						</Button>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
};

export default Login;
