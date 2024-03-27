import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	avatars: [],
	selectedAvatar: null
};

export const avatarSlice = createSlice({
	name: "avatars",
	initialState,
	reducers: {
		setAvatars: (state, action) => {
			state.avatars = action.payload;
		},
		setSelectedAvatar: (state, action) => {
			state.selectedAvatar = action.payload;
		}
	}
});

export const { setAvatars, setSelectedAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;
