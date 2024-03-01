export class Subject {
  constructor() {
    this.Observers = [];
    this.data = {};
  }

  subscribe(Observer) {
    this.Observers.push(Observer);
  }

  unsubscribe(Observer) {
    this.Observers = this.Observers.filter((obs) => obs !== Observer);
  }

  notify(data) {
    this.data = data;
    this.Observers.forEach((Observer) => Observer.update(this.data));
  }
}

export const subject = new Subject();

export class Observer {
  constructor(element) {
    this.element = element;
  }

  update(data) {
    // Update the UI element with the new data
    this.element.textContent = data;
  }
}
