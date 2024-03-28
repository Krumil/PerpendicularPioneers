import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import ChatComponent from "./components/Chat/ChatComponent";
import AvatarSelector from "./components/AvatarSelector/AvatarSelectorComponent";

function App() {
	const dispatch = useDispatch();
	const selectedAvatar = useSelector(state => state.avatars.selectedAvatar);

	useEffect(() => {
		dispatch({ type: "WS_CONNECT", payload: "ws://localhost:8000/ws/chat" });
	}, [dispatch]);

	return (
		<div className='App min-h-screen flex flex-col dark bg-white dark:bg-neutral-800'>
			<div className='flex flex-col md:w-7/12 md:mx-auto w-full px-4 flex-1'>
				<div className='w-full bg-transparent text-white my-10'>
					<div className='text-4xl font-bold'>Perpendicular Pioneers</div>
				</div>
				<AnimatePresence mode='wait'>
					{!selectedAvatar && (
						<motion.div
							key='avatarSelector'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<AvatarSelector />
						</motion.div>
					)}
					{selectedAvatar !== null && (
						<motion.div
							key='chatComponent'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className='flex flex-col flex-1'>
							<ChatComponent />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;
