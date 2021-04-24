import { Box, Flex } from "@chakra-ui/layout";
import React, { forwardRef } from "react";
import { Text } from "@chakra-ui/react";

const Chat = forwardRef((props, ref) => {
	const { message, username, localUser } = props;
	const checkIfTrue = message && username;
	return (
		<Flex
			mx={{ lg: "25px", sm: "3px", base: "0px" }}
			justifyContent={localUser === username ? "flex-end" : "flex-start"}
		>
			<Box my="3px" width="fit-content" p="3" ref={ref}>
				<Box
					rounded={8}
					shadow="lg"
					p="3"
					bg={localUser === username ? "blue.100" : "gray.100"}
				>
					{checkIfTrue && <Text fontSize="md">{message}</Text>}
				</Box>
				<Box textAlign={localUser === username ? "end" : "start"}>
					{checkIfTrue && <Text fontSize="xs">send by {username}</Text>}
				</Box>
			</Box>
		</Flex>
	);
});

export default Chat;
