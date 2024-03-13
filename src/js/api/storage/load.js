export function load(key) {
    const value = localStorage.getItem(key);
    if (value !== null) {
        return JSON.parse(value);
    } else {
        throw new Error(`No value found for key: ${key}`);
    }
}
