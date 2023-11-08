function isPostTitleGood(post) {
    return post.title.length > 3;
}

function doesPostHaveMedia(post) {
    return Boolean(post.media && post.media.length);
}

// function doesPostHaveBody(post) {
//     return post.body;
// }

function doesPostMeetCriterias(post) {
    return isPostTitleGood(post) && doesPostHaveMedia(post);
}

export function filterBadPostData(posts) {
    return posts.filter(doesPostMeetCriterias);
}
