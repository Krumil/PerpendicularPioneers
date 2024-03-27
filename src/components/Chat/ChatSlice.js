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
			return {
				...state,
				thought: action.payload.thought,
				actions: action.payload.actions,
				steps: action.payload.steps
			};
		},
		addMessage: (state, action) => {
			state.history.push(action.payload);
		}
	}
});

export const { addMessage, addThought } = chatSlice.actions;

export default chatSlice.reducer;
