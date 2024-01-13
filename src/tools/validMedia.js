/** 
 * This function checks if the post includes a right format of media(img)
 * 
 * @param {string} media 
 * @returns {}
 */
export function isMediaValid(media) {
    if (media === null || media === "") {
        return false;
    }
    return (media.toLowerCase().includes(".jpg") || media.toLowerCase().includes(".jpeg") || media.toLowerCase().includes(".png"));
}