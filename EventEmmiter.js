// Реализация

class EventEmmiter {
  events = {};
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }
  emit(eventName, args) {
    const event = this.events[eventName];
    if (event) event.forEach((callback) => callback.call(null, args));
  }

  off(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(
      (eventClb) => callback !== eventClb
    );
  }
}

// Тестирование
const emmiter = new EventEmmiter();

const logData = (data) => console.log(data);

emmiter.on("data", logData);
emmiter.emit("data", { message: "Hello world" });
emmiter.off("data", logData);
emmiter.emit("data", { message: "Hello world" });
