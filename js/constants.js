// URL's
export const API_BASE_URL = "https://api.noroff.dev/api/v1/social";
export const registerUrl = `${API_BASE_URL}/auth/register`;
export const loginUrl = `${API_BASE_URL}/auth/login`;
export const getPostsUrl = `${API_BASE_URL}/posts?_author=true&_comments=true&_reactions=true`;
export const postUrl = `${API_BASE_URL}/posts`;

// HTML Elements
export const loader = document.querySelector(".loader");
export const profile = document.querySelector(".profile");
export const reactions = document.querySelector(".reactions");
export const comments = document.querySelector(".comments");

export const accessToken = localStorage.getItem("accessToken");
