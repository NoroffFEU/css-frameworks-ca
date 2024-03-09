
export function sortPost(posts, sortType) {
    // console.log('before sorting:', posts);
    if (sortType === 'new') {
        return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortType === 'popular') {
        // Anta at popularitet kan måles med antall reaksjoner 
        return posts.sort((a, b) => b._count.reactions - a._count.reactions);
    } else if (sortType === 'alphabetically') {
        return posts.sort((a, b) => a.title.localeCompare(b.title));
    }
    // console.log('After sorting:', posts);
    return posts; // Returner uendret hvis ingen sortType er gitt
}
