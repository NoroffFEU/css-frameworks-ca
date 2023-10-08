
//using token to fetch the posts
export async function getData(url) {
    try {
        const token = localStorage.getItem("accessToken");
        const getData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }

}

