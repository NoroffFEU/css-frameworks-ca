import { writable } from 'svelte/store';

const createLoginModalStore = () => {
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

const loginModal = createLoginModalStore();

export default loginModal;