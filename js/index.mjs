import {createPost} from "./api/posts/create.mjs"
import {updatePost} from "./api/posts/updatePost.mjs"

createPost ({
    title: "Example Post",
    body: "Also an example UPDATED"
})

updatePost ({
    id: 10007,
    title: "Example Post",
    body: "Also an example UPDATED lol"
})