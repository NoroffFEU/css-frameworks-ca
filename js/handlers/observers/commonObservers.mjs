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
    console.log("Subject: Notifying Observers");
    this.Observers.forEach((Observer) => Observer.update(this.data));
  }
}

export const subject = new Subject();

export class Observer {
  constructor(element) {
    this.element = element;
  }

  update(data) {
    console.log("Observer: Update called");
    // Update the UI element with the new data
    this.element.textContent = data;
  }
}

