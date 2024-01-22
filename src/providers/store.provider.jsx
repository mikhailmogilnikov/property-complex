import { StoreContext, useStore } from '@/store/store';
import items from '../../public/data/items.json';
import rooms from '../../public/data/rooms.json';

export default function StoreProvider({ children }) {
  const store = useStore();

  store.databaseStore.setRooms(rooms);
  store.databaseStore.setItems(items);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
