//search
function titleMatches(query, post) {
    return post.title.toLowerCase().includes(query.toLowerCase());
}

function bodyMatches(query, post) {
    return post.body && post.body.toLowerCase().includes(query.toLowerCase());
}

function authorMatches(query, post) {
    return post.author.name.toLowerCase().includes(query.toLowerCase());
}

function tagMatches(query, post) {
    return post.tags.map((tag) => tag.toLowerCase()).includes(query.toLowerCase());
}

export function search(query, posts) {
    return posts.filter((post) => {
        return titleMatches(query, post) || bodyMatches(query, post) || authorMatches(query, post) || tagMatches(query, post);
    });
}

// async function test() {
//     const posts = await postMethods.getPosts();

//     const searchResults = search("pinky1", posts);

//     console.log("Search result:", searchResults);
// }

// test();

// ------------------------------
//second video with input (52min i video)

const searchInput = document.querySelector("#search-input");

console.log(searchInput);

searchInput.addEventListener("keyup", handleSearchInput);

function handleSearchInput(event) {
    // console.log(event.currentTarget.value);
    const inputValue = event.currentTarget.value;

    console.log(inputValue);
}
