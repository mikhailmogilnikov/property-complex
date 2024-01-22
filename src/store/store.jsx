import { createContext, useContext } from 'react';
import MenuStore from './menu.store';
import DatabaseStore from './database.store';

const store = {
  menuStore: new MenuStore(),
  databaseStore: new DatabaseStore()
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default store;
