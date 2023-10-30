/**
 * 
 * @param {string} url - an url where we 
 * @param {object} formData 
 * @returns a finished response from our API Post request. 
 * 
 * This function takes an API URL and sends data from an object using a fetch (POST) request
 */
export async function postData(url, formData) {
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
        console.log(finishedResponse);
        return finishedResponse;
    } catch (error) {
        console.log(error);
    }
}


