import router from  "./router.mjs";

router();

/*import * as postMethods from "./api/posts/index.mjs"
import * as templates from "./templates/index.mjs";

async function testTemplate() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#posts");
    templates.renderPostTemplates(posts, container);
}

testTemplate() */