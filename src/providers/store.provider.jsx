import { StoreContext, useStore } from '@/stores/stores';

export default function StoreProvider({ children }) {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
