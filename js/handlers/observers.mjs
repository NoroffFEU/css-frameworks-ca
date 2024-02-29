import { getPostById } from "../api/posts/get.mjs";
import { showMessage } from "../utils/messages.mjs";

export class Subject {
  constructor() {
    this.observers = [];
    this.likedPostId = null;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(postId) {
    this.likedPostId = postId;
    this.observers.forEach((observer) => observer.update(postId));
  }
}

export const subject = new Subject();

export class Counter {
  constructor(element, postId, type) {
    this.element = element;
    this.postId = postId;
    this.type = type;
    this.subject = null;
  }

  setSubject(subject) {
    this.subject = subject;
    this.subject.subscribe(this);
  }

  update(postId) {
    if (postId === this.postId) {
      // Fetches latest data from the API and updates the counter
      this.fetchAndUpdate();
    }
  }

  async fetchAndUpdate() {
    try {
      const postData = await getPostById(this.postId);
      const count = postData._count[this.type] || 0;

      const countElement = this.element.querySelector(
        ".like-count-number, .comment-count-number"
      );
      if (countElement) {
        countElement.innerText = count;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showMessage("Failed to fetch data", "error", error);
    }
  }
}
