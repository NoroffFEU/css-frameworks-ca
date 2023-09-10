import { feedRow } from "../modules/selectedElements.js";
import { Feed } from "../placeholders/feed.js";

const listFeed = () => {
  let feedList = "";
  Feed.map(({title, body}) => {
    feedList += `
      <div class="card mb-5 post-bg">
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-text">${body}</p>
        <a href="#" class="btn btn-primary" disabled>Read more..</a>
      </div>
    </div>
    `;
  });
  feedRow.innerHTML = feedList;
}

listFeed();