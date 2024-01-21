import { makeAutoObservable } from 'mobx';
import strings from '@/constants/strings';

class MenuStore {
  constructor() {
    this.activeTab = strings.menu.states.list;
    makeAutoObservable(this);
  }

  setActiveTab(tab) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
    }
  }

  getActiveTab() {
    return this.activeTab;
  }
}

export default MenuStore;
