import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = (value: number) => {
    this.count += value;
  };

  decrement = (value: number) => {
    this.count -= value;
  };
}

export default new CounterStore();
