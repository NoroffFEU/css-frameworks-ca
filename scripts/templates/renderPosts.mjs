import { postTemplate } from "./post.mjs"
/**
 * Renders a single post template and appends it to the specified parent element
 * @param {Object} postData - contains all the data of the post to be rendered
 * @param {HTMLElement} parent - the parent element to which the post template will be appended
 */
export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

/**
 * Renders multiple templates and appends them to the specified parent element
 * @param {Array<Object>} postDataList - array of post data objects for rendering
 * @param {HTMLElement} parent - The parent element to which the post templates will be appended
 */
export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate))
}
