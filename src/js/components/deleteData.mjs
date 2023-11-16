

export async function deletePost(url) {
    const token = localStorage.getItem("accessToken");
    const dataForPostRequest= {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
    }
    try {
        const fetchResponse = await fetch(url, dataForPostRequest)
        const finishedResponse = await fetchResponse.json();
        return finishedResponse;
    } catch (error) {
        console.log(error)
    }
}