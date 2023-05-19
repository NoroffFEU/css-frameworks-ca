import * as storage from "../storage/index.js";

export function getProfile() {
	return storage.load("profile");
}

export function getName() {
	return getProfile()?.name;
}