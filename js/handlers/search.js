
export function filterPostBySearchTerm(posts, searchTerm) {
    return posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
