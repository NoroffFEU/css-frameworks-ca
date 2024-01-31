export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function load(key, value) {
    try {
    const value = localStorage.getItem(key);
    return JSON.stringify(value) 
    }   catch {
        return null
    }
}

export function remove(key, value) {
    localStorage.removeItem(key);
}