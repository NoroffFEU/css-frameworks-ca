function isMediaValid(media) {
    if (media === null || media === "") {
        return false;
    }

    return (media.includes(".jpg") || media.includes(".jpeg") || media.includes(".png"));
}

export { isMediaValid };