import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "./ChatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Input, Button } from "react-chat-elements";

function ChatComponent() {
	const [message, setMessage] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	// const chatHistory = useSelector(state => state.chat.chatHistory);
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
				const startMessage = JSON.stringify({ type: "start" });
				window.socket.send(startMessage);
			} else {
				console.error("WebSocket is not connected.");
			}
		} else {
			// Optional: Handle stopping logic, if needed
		}
	};

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
			{selectedAvatar && (
				<div className='inline-flex w-full justify-between items-center'>
					<div className='inline-flex justify-center items-center space-x-2'>
						<Avatar src={selectedAvatar.portrait} alt='avatar' size='xlarge' type='rounded' />
						<div className='text-2xl font-bold'>{selectedAvatar.name}</div>
					</div>
					<button
						onClick={togglePlay}
						className='dark:text-neutral-700 w-10 h-10 dark:bg-white rounded-full inline-flex justify-center items-center'>
						<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
					</button>
				</div>
			)}
			{/* <form onSubmit={handleSubmit} className='relative flex items-center bg-neutral-700 rounded m-4 p-2'>
				<textarea
					value={message}
					onChange={handleChange}
					placeholder={`Talk to ${selectedAvatar.name}`}
					className='textarea-input flex-grow bg-transparent text-white placeholder-neutral-300 p-2 rounded-md border-transparent focus:border-transparent focus:ring-0'
				/>
				<button
					type='submit'
					className='absolute right-4 bg-transparent border-none text-white disabled:opacity-50'
					disabled={!message.trim()}>
					<FontAwesomeIcon icon={faCircleArrowRight} size='2xl' />
				</button>
			</form> */}

			<Input
				placeholder={`Message ${selectedAvatar.name}`}
				multiline={true}
				className='placeholder-neutral-700 mb-5 rounded'
				rightButtons={sendButton}
			/>
		</div>
	);
}

export default ChatComponent;
