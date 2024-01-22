import { StoreContext, useStore } from '@/store/store';

export default function StoreProvider({ children }) {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
