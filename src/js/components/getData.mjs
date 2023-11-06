import { printFeed } from "./getActions.mjs";
import { sortArray } from "./getActions.mjs";


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
        switch (action) {
            case "print":
                // Will run script for printing the data 
                // in HTML
                printFeed(finishedResponse, domElement);
                break;
            case "sort": {
                // Will sort the array, then print
                // "actionParam" will contain information how to  sort 
                // I first run the sort function, then printFeed based on the new array
                sortArray(finishedResponse, domElement, actionParam)
            }
            case "search": {
                // Will search the array, then print
                // "actionParam" will contain the search query
            }
            case "filter": {
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
