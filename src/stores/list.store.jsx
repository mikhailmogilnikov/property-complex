import { makeAutoObservable } from 'mobx';

class ListStore {
  constructor() {
    this.searchValue = '';
    this.currentCollection = [];
    makeAutoObservable(this);
  }

  setSearchValue(value) {
    this.searchValue = value;
  }

  getSearchValue() {
    return this.searchValue;
  }

  getCurrentCollection() {
    return this.currentCollection;
  }
}

export default ListStore;
