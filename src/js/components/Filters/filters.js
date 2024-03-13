import { latestFilter } from "./latestFilter.js";
import { oldestFilter } from "./oldestFilter.js";
import { popularFilter } from "./popularFilter.js";
import { relevantFilter } from "./relevantFilter.js";

export async function filterOptions(posts) {

    popularFilter(posts);
    latestFilter(posts);
    oldestFilter(posts);
    relevantFilter(posts);

}