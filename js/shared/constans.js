// // ------- V2 ---------
// const BASE_URL = 'https://v2.api.noroff.dev';  

// export const AUTH_URL = `${BASE_URL}/auth`;
// export const LOGIN_URL = `${BASE_URL}/auth/login`;
// export const REGISTER_URL = `${BASE_URL}/auth/register`;
// // export const API_KEY_URL = '';
// // export const POSTS_URL = `${BASE_URL}/social/posts`;;








// --------- V1 ------------------
const BASE_URL = 'https://api.noroff.dev/api/v1'; 

export const LOGIN_URL = `${BASE_URL}/social/auth/login`;
export const REGISTER_URL = `${BASE_URL}/social/auth/register`;
export const POSTS_URL = `${BASE_URL}/social/posts`;

// export const API_KEY_URL = '';








// export const API_KEY_URL = "/create-api-key";

// export async function createAPIKey() {
//   const response = await fetch(API_BASE + API_AUTH + API_KEY_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type" : "application/json",
//       Authorization: `Bearer ${load("token")}`, // Sørg for at 'load' funksjonen riktig henter tokenet du har lagret
//     },
//     body: JSON.stringify({
//       name: "Test API key", // Valgfritt: Gi nøkkelen et navn
//     })
//   });

//   if (response.ok) {
//     const data = await response.json();
//     localStorage.setItem('apiKey', data.key); // Lagrer API-nøkkelen
//     console.log('API Key created:', data.key);
//     return data.key; // Returnerer API-nøkkelen
//   } else {
//     // Logg feilen for diagnostikk
//     console.error('Failed to create API Key:', await response.json());
//     throw new Error("Could not register for an API key");
//   }
// }



// export const API_HOST_URL = 'https://nf-api.onrender.com';
// export const API_BASE = '/api/v1';
// export const API_SOCIAL_BASE = '/social';
// export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

