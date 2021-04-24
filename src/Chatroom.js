import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import React, { useState, useEffect, useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import Login from "./Login";
import Chat from "./Chat";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
require("dotenv").config();

const Chatroom = () => {
	const divContainer = useRef("target");

	const [username, setUsername] = useState("");
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		db.collection("messages")
			.orderBy("timestamp")
			.limitToLast(25)
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
				);
			});
	}, []);

	const sendMessage = (event) => {
		db.collection("messages").add({
			text: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp({
				behavior: "smooth",
			}),
		});

		setInput("");
		divContainer.current.scrollIntoView();
		event.preventDefault();
	};

	return (
		<div>
			{username ? (
				<Flex
					height="100vh"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
				>
					<Flex
						marginTop="5px"
						flexDirection="column"
						height="100vh"
						width={{ base: "90%", sm: "90%", md: "90%", lg: "50%" }}
						shadow="md"
						overflow="scroll"
						padding="2"
					>
						<FlipMove>
							{messages.map((message) => {
								return (
									<Chat
										key={message.id}
										message={message.data.text}
										username={message.data.username}
										localUser={username}
									/>
								);
							})}
						</FlipMove>
						<div ref={divContainer}></div>
					</Flex>
					<Flex
						width={{ base: "90%", sm: "90%", md: "90%", lg: "50%" }}
						height="100px"
						justifyContent="center"
						alignItems="center"
					>
						<form>
							<Flex alignItems="center">
								<Input
									width={{ base: "xsm", sm: "sm", lg: "lg" }}
									size="lg"
									height="16"
									placeholder="Enter Your Message"
									value={input}
									onChange={(event) => setInput(event.target.value.trimStart())}
								/>
								<Button
									colorScheme="blue"
									marginLeft="10px"
									type="submit"
									onClick={sendMessage}
									isDisabled={!input}
								>
									<IoSendSharp size="25" />
								</Button>
							</Flex>
						</form>
					</Flex>
				</Flex>
			) : (
				<Login
					setTheUser={(name) => {
						setUsername(name);
					}}
				/>
			)}
		</div>
	);
};

export default Chatroom;
