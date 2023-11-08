import { errorMsg } from "./errorMsg.mjs";


const token = localStorage.getItem('accessToken');
let error;
let goToPage;
const currentPage = document.title;

switch (currentPage) {
    case "Noroff Social Media | Log in":
        goToPage = "feed/index.html";
        break;
    case "Noroff Social Media | Sign up":
        goToPage = "index.html";
        break;
    default:
        break;
}

/**
 * 
 * @param {string} url - an url where we 
 * @param {object} formData - Data from submitForm.mjs
 * @param {object} divForError - OPTIONAL - a div where our error message will be output
 * @returns a finished response from our API Post request. 
 * 
 * This function takes an API URL and sends data from an object using a fetch (POST) request
 */
export async function postData(url, formData, divForError) {
    divForError.innerHTML = "";
    const dataForPostRequest= {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(formData)
    }

    try {
        const fetchResponse = await fetch(url, dataForPostRequest)
        const finishedResponse = await fetchResponse.json();
        if (finishedResponse.statusCode > 399) {
            error = finishedResponse.errors[0].message
            throw error;
        } 
        if (finishedResponse.accessToken && !token) {
            localStorage.setItem(`accessToken`, `${finishedResponse.accessToken}`);
            localStorage.setItem('userName', `${finishedResponse.name}`);
        }
        if (goToPage) {
            window.location.href = [goToPage];   
        }
        console.log(goToPage);
        return finishedResponse;
    } catch (error) {
        errorMsg(divForError, error);
    }
}

