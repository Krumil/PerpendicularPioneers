import chatReducer from "./components/Chat/ChatSlice";
import avatarSelectorReducer from "./components/AvatarSelector/AvatarSlice";
import { configureStore } from "@reduxjs/toolkit";
import { websocketMiddleware } from "./middleware/websocketMiddleware";

export const store = configureStore({
	reducer: {
		chat: chatReducer,
		avatars: avatarSelectorReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(websocketMiddleware)
});
