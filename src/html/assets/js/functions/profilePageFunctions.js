import {profileFeedRow} from "../modules/selectedElements.js";
import {Feed} from "../placeholders/feed.js";

const profileListFeed = () => {
  let feedList = "";
  Feed.map(({userId, title, body}) => {
    if (userId === 1) {
      feedList += `
      <div class="card mb-5">
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-text">${body}</p>
        <a href="#" class="btn btn-primary" disabled>Read more..</a>
      </div>
    </div>
    `;
    }
  });
  profileFeedRow.innerHTML = feedList;
}

profileListFeed();