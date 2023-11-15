import { postData } from "./postData.mjs";


function goToPage(page){
    window.location.href = [`${page}`];  
}

/**
 * 
 * @param {string} url - where to send the data 
 * @param {object} formData - what data is sent via the request body
 * @param {object} divForError - a div where error messages are printed
 * @param {string} currentPage - the current page title 
 * 
 * This function logs you into the social media platform
 */
export function login(url, formData, divForError, currentPage) {
    const headers = {
        'Content-Type': 'application/json',
    }   
    let page;
    switch (currentPage) {
        case "Noroff Social Media | Log in":
            page = "feed/index.html";
            break;
        case "Noroff Social Media | Sign up":
            page = "index.html";
            break;
        default:
            break;
    } 
    postData(url, formData, divForError, headers, goToPage, page)
}
