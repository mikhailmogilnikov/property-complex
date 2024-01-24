import { StoreContext, useStore } from '@/store/store';
import items from '../../public/data/items.json';
import rooms from '../../public/data/rooms.json';
import locations from '../../public/data/locations.json';

export default function StoreProvider({ children }) {
  const store = useStore();

  store.databaseStore.setLocations(locations);
  store.databaseStore.setRooms(rooms);
  store.databaseStore.setItems(items);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
