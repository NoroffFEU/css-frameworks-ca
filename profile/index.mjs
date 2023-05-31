import * as templates from '../src/js/templates/index.mjs';
import * as postmethod from '../src/js/posts/index.mjs';
import * as listeners from '../src/js/handlers/index.mjs';
import { isLoggedInNav } from '../src/js/templates/menu.mjs';
import { redirectIfLoggedIn } from '../src/js/api/helpers/auth.mjs';
import { search } from '../src/js/api/helpers/search.mjs';

const path = location.pathname;



if (path === '/login/') {
	listeners.setloginFormListener();
} else if (path === '/register/') {
	listeners.setRegisterFormListener();
} else if (path === '/feed/' || path === '/posts/' || path === '/profile/') {
	listeners.setPostFormListener();
	isLoggedInNav();
	redirectIfLoggedIn();

	/**
	 * shows posts based on the ID provided in the URL -
	 * or all posts if no ID is provided.
	 */
	async function showPosts() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');
		const postsContainer = document.querySelector('#userPost');

		if (id) {
			try {
				const post = await postmethod.get(id);
				templates.renderPostTemplate(post, postsContainer);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const posts = await postmethod.getPosts();
				templates.renderPostTemplates(posts, postsContainer);
			} catch (error) {
				console.error(error);
			}
		}
	}

	showPosts();
	search();
} else if (path === '/posts/edit/') {
	listeners.setEditPostFormListener();
}
