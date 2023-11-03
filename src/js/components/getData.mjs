

export async function getData(url, token, action, actionParam) {
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
        switch (action) {
            case "Print":
                // Will run script for printing the data 
                // in HTML
                break;
            case "Sort": {
                // Will sort the array, then print
                // "actionParam" will contain information how to  sort 
            }
            case "Search": {
                // Will search the array, then print
                // "actionParam" will contain the search query
            }
            case "Filter": {
                // Will filter, then print
                // "actionParam" will contain the filter query
            }
            default:
                break;
        }
        return finishedResponse;
    } catch (error) {
        console.log(error)
    }
}
