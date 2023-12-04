/*const API_BASE_URL = `https://api.noroff.dev/api/v1/social`
export async function fetchwithToken (url) {
    try {
        console.log(url);
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

const postsUrl = `${API_BASE_URL}/posts`;

fetchwithToken(postsUrl);*/

export function save (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}
    
