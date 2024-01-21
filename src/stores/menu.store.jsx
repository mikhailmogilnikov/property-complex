import { makeAutoObservable, runInAction } from 'mobx';
import strings from '@/constants/strings';

class MenuStore {
  constructor() {
    this.activeTab = strings.menu.states.list;
    this.visibility = true;
    makeAutoObservable(this);

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  setActiveTab(tab) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
    }
  }

  toggleVisibility(visibility = this.visibility) {
    runInAction(() => {
      this.visibility = !visibility;
    });
  }

  getActiveTab() {
    return this.activeTab;
  }

  getVisibility() {
    return this.visibility;
  }
}

export default MenuStore;
