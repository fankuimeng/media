import { createContext, useContext } from 'react';
import MainStore from './mainStore';

class RootStore {
  mainStore: MainStore;
  constructor() {
    this.mainStore = new MainStore(this);
  }
}
const Context = createContext(new RootStore());

function useStore() {
  return useContext(Context);
}

export { RootStore, useStore };
