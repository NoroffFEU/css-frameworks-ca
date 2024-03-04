import { getPostById } from "../../api/posts/get.mjs";
import { showMessage } from "../../utils/messages.mjs";

/**
 * Represents a counter that updates based on changes to a subject.
 */
export class Counter {
  /**
   * Creates an instance of Counter.
   * @param {HTMLElement} element - The element representing the counter.
   * @param {string} postId - The ID of the post associated with the counter.
   * @param {string} type - The type of counter (e.g., 'like', 'comment').
   */
  constructor(element, postId, type) {
    /**
     * The element representing the counter.
     * @type {HTMLElement}
     */
    this.element = element;
    /**
     * The ID of the post associated with the counter.
     * @type {string}
     */
    this.postId = postId;
    /**
     * The type of counter.
     * @type {string}
     */
    this.type = type;
    /**
     * The subject to observe for changes.
     * @type {Subject}
     */
    this.subject = null;
  }

  /**
   * Sets the subject to observe for changes.
   * @param {Subject} subject - The subject to observe.
   */
  setSubject(subject) {
    this.subject = subject;
    this.subject.subscribe(this);
  }

  /**
   * Updates the counter when notified by the subject.
   * @param {string} postId - The ID of the post associated with the update.
   */
  update(postId) {
    if (postId === this.postId) {
      // Fetches latest data from the API and updates the counter
      this.fetchAndUpdate();
    }
  }

  /**
   * Fetches the latest data from the API and updates the counter.
   */
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
