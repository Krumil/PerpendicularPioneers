import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		history: [],
		thought: "I'm thinking...",
		actions: [],
		steps: [],
		messages: []
	},
	reducers: {
		addThought: (state, action) => {
			state.thought = action.payload.thought;
			state.actions = action.payload.actions;
			state.steps = action.payload.steps;
			state.messages = action.payload.messages;
		},
		addMessage: (state, action) => {
			state.history.push(action.payload);
		}
	}
});

export const { addMessage, addThought } = chatSlice.actions;

export default chatSlice.reducer;
