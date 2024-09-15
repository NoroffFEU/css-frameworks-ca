/**
 * 
 * @param {string} url - Where to send the put request
 * @param {*} formData - what to send 
 * @returns {object} - an edit to the existing post 
 * Lets you edit data on the server
 */
export async function putData(url, formData) {
    let error;
    const token = localStorage.getItem("accessToken");
    const headerData = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const dataForPut = {
        method: "PUT",
        headers: headerData,
        body: JSON.stringify(formData)
    }
    try {
        const fetchResponse = await fetch(url, dataForPut)
        const finishedResponse = await fetchResponse.json();
        if (finishedResponse.statusCode > 399) {
            error = finishedResponse.errors[0].message;
            throw error;
        } 
        return finishedResponse;
    } catch (error) {
        console.log(error)
    }
}