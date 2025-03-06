import { getAccessToken, logout } from "../auth/jwtService.js";
import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080", //server
	timeout: 20000,
	
	headers: {
		Accept: "application/json",
		// "ngrok-skip-browser-warning": true
	},
});

//send token
instance.interceptors.request.use(
	(config) => {
		let token = getAccessToken();
		if (token && config.headers) {
			config.headers.Authorization = "Bearer " + token;
		}
		
		return config;
	},
	(error) => {
		// toast.error(error?.message)
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			if (
				window.location.pathname !== "/sign-in" &&
				window.location.pathname !== "/sign-up"
			) {
				window.location.href = "/sign-in";
				logout();
				// window.location.reload()
			}
		}
		// else if (error.response.status === 422) {
		//   console.log("422", error.response);
		// } else if (error.response.status === 500) {
		//   toast.error("Error from server!");
		// }
		
		return Promise.reject(error);
	}
);

export default instance;