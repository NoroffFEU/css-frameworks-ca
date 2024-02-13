//Håndterer all kommunikasjon med APIet (GET, POST, PUT, DELETE)


// const API_BASE_URL = 'https://api.noroff.dev';

// const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

export const API_HOST_URL = 'https://nf-api.onrender.com';
export const API_BASE = '/api/v1';
export const API_SOCIAL_BASE = '/social';
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;



import { setRegisterFormListener } from "./handlers/register.js";
setRegisterFormListener();

// const API_PATH = "https://nf.api.onrender.com/api/v1/social";
// const postURL = "/posts";
// API_PATH + postURL
// 'https://nf.api.onrender.com/api/v1/social'

