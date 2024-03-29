import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		history: [],
		thought: "I'm thinking...",
		actions: {},
		steps: [],
		messages: [],
		audio: null
	},
	reducers: {
		changeThought: (state, action) => {
			state.thought = action.payload.thought;
		},
		changeActions: (state, action) => {
			state.actions = action.payload.actions;
		},
		changeLastAnswer: (state, action) => {
			state.steps = action.payload.steps;
			state.messages = action.payload.messages;
			state.audio = action.payload.audio;
		},
		addMessage: (state, action) => {
			state.history.push(action.payload);
		}
	}
});

export const { changeThought, changeActions, changeLastAnswer, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
