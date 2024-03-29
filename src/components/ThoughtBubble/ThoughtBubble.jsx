import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
// import { changeThought } from "../Chat/ChatSlice";

const AnimatedThought = () => {
	const thought = useSelector(state => state.chat.thought);
	const actions = useSelector(state => state.chat.actions);
	// const dispatch = useDispatch();

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8 }
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.5 }
		}
	};

	// setInterval(() => {
	// 	// generate random string
	// 	const randomString = Math.random().toString(36).substring(7);
	// 	// const actions = [];
	// 	// const steps = [];
	// 	// const messages = [];
	// 	dispatch(changeThought({ thought: randomString }));
	// }, 3000);

	return (
		<div className='mx-auto bg-white rounded-lg shadow-md overflow-hidden w-9/12 py-2 mt-10'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={thought}
					className='p-3'
					variants={textVariants}
					initial='hidden'
					animate='visible'
					exit='exit'>
					{actions && (
						<div className='text-red-900'>
							Using Tool: {actions.tool} with parameters: {JSON.stringify(actions.tool_input)}
						</div>
					)}
					<div className='tracking-tight'>
						<span className='text-lg leading-relaxed text-gray-900'>{thought}</span>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedThought;
