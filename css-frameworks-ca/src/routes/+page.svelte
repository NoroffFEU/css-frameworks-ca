<RegisterModal/>
<LoginModal/>
  
  
  <script>
    import loginModal from "../data/loginModal";
    import registerModal from "../data/registerModal";
    import RegisterModal from "../lib/components/modals/RegisterModal.svelte";
    import LoginModal from "../lib/components/modals/LoginModal.svelte";
    import { onMount } from "svelte";

	onMount( () => {
        loginModal.onOpen()
	});




  </script>
  