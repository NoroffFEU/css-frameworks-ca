import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";

const endpoint = endpointObject("Jarle");
const getOption = optionFactory("GET", {}, endpoint);

export default async function filterPosts(
  searchword: string,
  category: string
) {
  endpoint.filterUrl.resetCount();
  console.log(searchword, category);
  const data = await callApi(endpoint.filterUrl.incrementUrl(), getOption);
  const allPosts = await recursiveFilter(data);
  console.log(allPosts);
  let filteredPost;
  if (Array.isArray(allPosts[0][category])) {
    console.log("tags ROUTE TAKEN");
    filteredPost = allPosts.filter((post) =>
      post[category]?.some(
        (element) => element?.toLowerCase() === searchword?.toLowerCase()
      )
    );
  } else if (category === "author") {
    filteredPost = allPosts.filter(
      (post) => post[category]?.name.toLowerCase() === searchword?.toLowerCase()
    );
  } else {
    console.log(allPosts[0][category]);
    filteredPost = allPosts.filter(
      (post) => post[category]?.toLowerCase() === searchword?.toLowerCase()
    );
  }
  console.log(filteredPost);
  return filteredPost;
}

async function recursiveFilter(prevArray: []) {
  const postsPerPage: number = 100;
  const data = await callApi(endpoint.filterUrl.incrementUrl(), getOption);
  if (data.length < postsPerPage) {
    return [...prevArray, ...data];
  } else if (data === undefined || data === null) {
    return [...prevArray];
  } else {
    return recursiveFilter([...prevArray, ...data]);
  }
}
