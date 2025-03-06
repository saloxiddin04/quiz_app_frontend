import instance from "../plugins/axios";
import {
	forgotPasswordEndpoint,
	loginEndpoint, passwordChangeEndpoint,
	registerEndpoint,
	tokenKeyName,
	userKeyName, verifyEndpoint,
} from "./jwt.config";

export function login(...args) {
	return instance.post(loginEndpoint, ...args).then((res) => {
		setAccessToken(res.data.token);
		setUserData(res.data.user);
	});
}

export function logout() {
	document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	// localStorage.clear()
	// window.location.reload();
}

export function register(...args) {
	return instance.post(registerEndpoint, ...args);
}

export function verify(...args) {
	return instance.post(verifyEndpoint, ...args)
}

export function forgotPasswordJwt(...args) {
	return instance.post(forgotPasswordEndpoint, ...args)
}

export function changePassword(...args) {
	return instance.patch(passwordChangeEndpoint, ...args)
}

export function setAccessToken(value) {
	setCookie(tokenKeyName, value, 7);
}

export function getAccessToken() {
	return getCookie(tokenKeyName);
}

export function setUserData(value) {
	setCookie(userKeyName, JSON.stringify(value), 7);
}

export function getUserData() {
	const cookies = document.cookie.split(";");
	const userCookie = cookies.find((cookie) => cookie.includes("user="));
	
	if (userCookie) return JSON.parse(userCookie.split("=")[1] || '{}');
}

export function setCookie(name, value, expirationDays) {
	const date = new Date();
	date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	// document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
	const cookieString = document.cookie;
	const cookieArray = cookieString.split("; ");
	for (const cookie of cookieArray) {
		const [key, value] = cookie.split("=");
		if (key === name) {
			return value;
		}
	}
	return null;
}