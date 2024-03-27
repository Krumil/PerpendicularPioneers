import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const AnimatedThought = () => {
	const thought = useSelector(state => state.chat.thought);

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

	return (
		<div className='mx-auto bg-white rounded-lg shadow-md overflow-hidden w-9/12 p-4 mt-10'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={thought}
					className='p-8'
					variants={textVariants}
					initial='hidden'
					animate='visible'
					exit='exit'>
					<div className='tracking-tight'>
						<span className='text-lg leading-relaxed text-gray-900'>{thought}</span>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedThought;
