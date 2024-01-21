import { createContext, useContext } from 'react';
import MenuStore from './menu.store';

const store = {
  menuStore: new MenuStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default store;
