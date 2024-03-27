import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "./ChatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Input, Button } from "react-chat-elements";
import ThoughtBubble from "../ThoughtBubble/ThoughtBubble";

function ChatComponent() {
	const [message, setMessage] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	// const chatHistory = useSelector(state => state.chat.history);
	const selectedAvatar = useSelector(state => state.avatars.selectedAvatar); // Ensure this is the correct path
	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();
		if (!message.trim()) return;
		dispatch(addMessage(message));
		setMessage("");
	};

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying) {
			if (window.socket && window.socket.readyState === WebSocket.OPEN) {
				const startMessage = JSON.stringify({ type: "start", avatar: selectedAvatar.name });
				window.socket.send(startMessage);
			} else {
				console.error("WebSocket is not connected.");
			}
		} else {
			// Optional: Handle stopping logic, if needed
		}
	};

	function playButton({ isPlaying, togglePlay }) {
		return (
			<div className='relative inline-flex justify-center items-center mr-4'>
				<button
					onClick={togglePlay}
					className='z-10 dark:text-neutral-700 w-10 h-10 dark:bg-white rounded-full inline-flex justify-center items-center'>
					<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
				</button>
				{isPlaying && (
					<div className='absolute flex justify-center items-center'>
						<div className='animate-spin rounded-full border-4 border-t-4 border-t-white border-r-white border-b-transparent border-l-transparent w-14 h-14'></div>
					</div>
				)}
			</div>
		);
	}

	const sendButton = (
		<Button
			onClick={handleSubmit}
			icon={{
				component: <FontAwesomeIcon icon={faCircleArrowRight} size='lg' />,
				size: 25
			}}
			type='transparent'
			color='#262626'
			className='p-1'
		/>
	);

	return (
		<div className='flex flex-col justify-between text-white flex-1'>
			<div className='flex flex-col flex-1 overflow-hidden '>
				{selectedAvatar && (
					<div className='inline-flex w-full justify-between items-center'>
						<div className='inline-flex justify-center items-center space-x-2'>
							<Avatar src={selectedAvatar.portrait} alt='avatar' size='xlarge' type='rounded' />
							<div className='text-2xl font-bold'>{selectedAvatar.name}</div>
						</div>
						{playButton({ isPlaying, togglePlay })}
					</div>
				)}
				<ThoughtBubble />
			</div>

			<Input
				placeholder={`Message ${selectedAvatar.name}`}
				multiline={true}
				className='placeholder-neutral-700 s mb-5 rounded'
				rightButtons={sendButton}
			/>
		</div>
	);
}

export default ChatComponent;
