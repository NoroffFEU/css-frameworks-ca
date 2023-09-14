export function getUserName() {
    const userString = localStorage.getItem('profile');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user.name;
}
