import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
// import { removePost } from "./api/posts/delete.mjs";
import * as post from "./api/posts/index.mjs";

setRegisterFormListener();
setLoginFormListener();

//removePost(6115);

// post.createPost();
// post.updatePost();
// post.removePost();
// post.getPost();
// post.getPosts().then(console.log);

post.getPost(6126).then(console.log)