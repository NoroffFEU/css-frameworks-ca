/**
 * Retrieves logged in users username from local storage
 * @returns {string|null} return username if available, or null if not
 */
export function getUserName() {
    const userString = localStorage.getItem('profile');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user.name;
}
