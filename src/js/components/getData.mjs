

export async function getData(url, token, emptyArr) {
    emptyArr = [];
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
        emptyArr.push(finishedResponse);
        return emptyArr;
    } catch (error) {
        console.log(error)
    }
}
