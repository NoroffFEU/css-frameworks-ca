import { writable } from 'svelte/store';

const createRegisterModal = () => {
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

const registerModal = createRegisterModal();

export default registerModal;