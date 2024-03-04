/**
 * Represents a subject that maintains a list of observers and notifies them of changes.
 */
export class Subject {
  /**
   * Creates an instance of Subject.
   */
  constructor() {
    /**
     * The list of observers subscribed to this subject.
     * @type {Observer[]}
     */
    this.Observers = [];
    
    /**
     * The data associated with the subject.
     * @type {Object}
     */
    this.data = {};
  }

  /**
   * Subscribes an observer to this subject.
   * @param {Observer} observer - The observer to subscribe.
   */
  subscribe(observer) {
    this.Observers.push(observer);
  }

  /**
   * Unsubscribes an observer from this subject.
   * @param {Observer} observer - The observer to unsubscribe.
   */
  unsubscribe(observer) {
    this.Observers = this.Observers.filter((obs) => obs !== observer);
  }

  /**
   * Notifies all observers of a change in the data.
   * @param {Object} data - The new data to notify observers with.
   */
  notify(data) {
    this.data = data;
    this.Observers.forEach((observer) => observer.update(this.data));
  }
}

/**
 * The default subject instance.
 * @type {Subject}
 */
export const subject = new Subject();

/**
 * Represents an observer that updates UI elements with new data.
 */
export class Observer {
  /**
   * Creates an instance of Observer.
   * @param {HTMLElement} element - The UI element to update.
   */
  constructor(element) {
    /**
     * The UI element to update.
     * @type {HTMLElement}
     */
    this.element = element;
  }

  /**
   * Updates the UI element with new data.
   * @param {any} data - The new data to display.
   */
  update(data) {
    // Update the UI element with the new data
    this.element.textContent = data;
  }
}
