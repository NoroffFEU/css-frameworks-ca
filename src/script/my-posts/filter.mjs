const feedContainer = document.querySelector(".all-feeds");
feedContainer.classList.add("d-flex", "flex-row", "justify-content-between", "bg-white", "p-3");
const newFeeds = document.createElement("h1");
newFeeds.classList.add("col-6", "col-md-7", "col-lg-8", "col-xl-10", "text-dark");
newFeeds.innerText = "All posts";
const filterCoontainer = document.createElement("select");
filterCoontainer.classList.add("form-select", "custom-sort");
filterCoontainer.ariaLabel = "filter options";

const defaultOption = document.createElement("option");
defaultOption.textContent = "All Posts";
defaultOption.value = "all";

function newFeedsHtml() {
  filterCoontainer.append(defaultOption);

  feedContainer.append(newFeeds, filterCoontainer);
}

export { newFeedsHtml, feedContainer };
