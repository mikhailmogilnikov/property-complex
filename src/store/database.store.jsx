import { makeAutoObservable } from 'mobx';

class DatabaseStore {
  constructor() {
    this.rooms = [];
    this.items = [];
    makeAutoObservable(this);
  }

  setRooms(rooms) {
    this.rooms = rooms;
  }

  setItems(items) {
    this.items = items;
  }

  getRooms() {
    return this.rooms;
  }

  getItems() {
    return this.items;
  }
}

export default DatabaseStore;