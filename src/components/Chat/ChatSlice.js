import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chatHistory: []
	},
	reducers: {
		addMessage: (state, action) => {
			state.chatHistory.push(action.payload);
		}
	}
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
