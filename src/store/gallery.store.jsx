import { makeAutoObservable } from 'mobx';

class GalleryStore {
  constructor() {
    this.imageLink = '';
    this.selectedId = null;
    makeAutoObservable(this);
  }

  setImageLink(imageLink) {
    this.imageLink = imageLink;
  }

  setSelectedId(selectedId) {
    this.selectedId = selectedId;
  }

  getImageLink() {
    return this.imageLink;
  }

  getSelectedId() {
    return this.selectedId;
  }
}

export default GalleryStore;
