
export function sortPost(posts, sortType) {
    console.log('Før sortering:', posts);
    if (sortType === 'new') {
        return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortType === 'popular') {
        // Anta at popularitet kan måles med antall reaksjoner (du må kanskje justere dette)
        return posts.sort((a, b) => b._count.reactions - a._count.reactions);
    } else if (sortType === 'alphabetically') {
        return posts.sort((a, b) => a.title.localeCompare(b.title));
    }
    console.log('Etter sortering:', posts);
    return posts; // Returner uendret hvis ingen sortType er gitt
}
