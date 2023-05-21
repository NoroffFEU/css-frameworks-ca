export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch {
        return null
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}

//Save posts and read posts for the search
export function savePosts(value) {
    localStorage.setItem("posts", JSON.stringify(value));
}

export function loadPosts() {
    try {
        const value = localStorage.getItem("posts");
        return JSON.parse(value);
    } catch {
        return [];
    }
}
