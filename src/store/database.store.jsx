import { makeAutoObservable, toJS } from 'mobx';

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
    return toJS(this.rooms);
  }

  getItems() {
    return toJS(this.items);
  }
}

export default DatabaseStore;