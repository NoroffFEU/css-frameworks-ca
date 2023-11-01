import { errorMsg } from "./errorMsg.mjs";
const token = localStorage.getItem('accessToken');

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
            console.log("goodbye")
        }
        if (finishedResponse.accessToken && !token) {
            localStorage.setItem(`accessToken`, `${finishedResponse.accessToken}`)
        }
        console.log(finishedResponse)
        return finishedResponse;
        // ISSUE //
        // When the function runs, but returns as 400 / 401, etc, the catch block
        // does not run. Might have to use an if statement to fix it, but I don't want that.
        // Maybe I can set an if (response > 399) and break? Gotta do some research here
    } catch (error) {
        console.log("hello");
        console.dir(divForError);
        errorMsg(divForError, error);
    }
}

