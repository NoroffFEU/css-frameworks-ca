import { writable } from 'svelte/store';

const createSearchModalStore = () => {
  const { subscribe, set, update } = writable({ isOpen: false });

  return {
    subscribe,
    onOpen: () => {
 
      set({ isOpen: true });
  },
  onClose: () => {
 
      set({ isOpen: false });
  }
  };
}

const searchModal = createSearchModalStore();

export default searchModal;