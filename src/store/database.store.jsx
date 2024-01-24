import { makeAutoObservable, toJS } from 'mobx';

class DatabaseStore {
  constructor() {
    this.locations = [];
    this.rooms = [];
    this.items = [];
    makeAutoObservable(this);
  }

  setLocations(locations) {
    this.locations = locations;
  }

  setRooms(rooms) {
    this.rooms = rooms;
  }

  setItems(items) {
    this.items = items;
  }

  getLocations() {
    return toJS(this.locations);
  }

  getRooms() {
    return toJS(this.rooms);
  }

  getItems() {
    return toJS(this.items);
  }
}

export default DatabaseStore;