import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedAvatar } from "./AvatarSlice";
import "./AvatarSelectorComponent.css";

function AvatarSelector() {
	const avatars = useSelector(state => state.avatars.avatars);
	const selectedAvatar = useSelector(state => state.avatars.selectedAvatar);
	const dispatch = useDispatch();

	const handleAvatarClick = index => {
		const avatar = avatars[index];
		dispatch(setSelectedAvatar(avatar));
	};

	return (
		<div className='grow flex flex-col justify-center items-center w-full dark:text-white'>
			<div className={`grid "grid-cols-1 md:grid-cols-2 gap-6 my-4 w-full max-w-5xl`}>
				{avatars.map((avatar, index) => (
					<div
						className={`avatar-card rounded-lg overflow-hidden shadow-lg p-4 cursor-pointer dark:bg-neutral-700 border-2  ${
							selectedAvatar === avatar ? "border-white w-full" : "border-transparent"
						}`}
						onClick={() => handleAvatarClick(index)}
						key={index}>
						<div className='flex flex-col md:flex-row my-4'>
							<img className='w-48 h-48 rounded self-center' src={avatar.portrait} alt={avatar.name} />
							<div className='px-4'>
								<div className='font-bold text-xl mb-2'>{avatar.name}</div>
								<p className='text-white clamp-5'>{avatar.system}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AvatarSelector;
