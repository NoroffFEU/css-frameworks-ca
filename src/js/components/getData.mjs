export async function getData(url, token, domElement, action, actionParam) {
    const dataForPostRequest= {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
    }

    try {
        const fetchResponse = await fetch(url, dataForPostRequest)
        const finishedResponse = await fetchResponse.json();
        action(domElement, finishedResponse, actionParam);
        return finishedResponse;
    } catch (error) {
        console.log(error)
    }
}
