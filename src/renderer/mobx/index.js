import { createContext, useContext } from 'react';
import MainStore from './mainStore';

class RootStore {
  constructor() {
    this.mainStore = new MainStore(this);
  }
}
const Context = createContext(new RootStore());
export default function useStore() {
  return useContext(Context);
}
