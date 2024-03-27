import { addMessage } from "../components/Chat/ChatSlice";
import { setAvatars } from "../components/AvatarSelector/AvatarSlice";

function sendMessage(socket, message) {
	if (!socket) return;

	// Wait for connection to open if it's still connecting
	if (socket.readyState === WebSocket.CONNECTING) {
		const waitForOpen = setInterval(() => {
			if (socket.readyState === WebSocket.OPEN) {
				clearInterval(waitForOpen);
				socket.send(message);
			}
		}, 10);
	} else if (socket.readyState === WebSocket.OPEN) {
		socket.send(message);
	}
}

export const websocketMiddleware = store => next => action => {
	switch (action.type) {
		case "WS_CONNECT":
			if (window.socket && window.socket.readyState === WebSocket.OPEN) {
				window.socket.close();
			}

			window.socket = new WebSocket(action.payload);

			window.socket.onmessage = event => {
				const data = JSON.parse(event.data);
				if (data.type === "avatar") {
					store.dispatch(setAvatars(data.data.avatars));
				} else if (data.type === "internal_thought") {
					const actions = JSON.parse(data.action).length > 0 ? JSON.parse(JSON.parse(data.action)[0]) : null;
					const messages = JSON.parse(data.messages) ? JSON.parse(JSON.parse(data.messages)) : [];
					const steps = JSON.parse(data.steps) ? JSON.parse(data.steps) : [];
					console.log("Actions:", actions);
					console.log("Message:", messages.content);
					console.log("Steps:", steps);
					if (messages.length > 0) {
						store.dispatch(addMessage({ ai: messages.content }));
					}
				} else {
					const response = JSON.parse(event.data);
					store.dispatch(addMessage({ ai: response.output }));
				}
			};

			window.socket.onopen = () => {
				sendMessage(window.socket, JSON.stringify({ type: "avatar" }));
			};
			break;

		default:
			break;
	}

	return next(action);
};
