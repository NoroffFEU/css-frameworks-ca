<!--Will handle login-->
<form>
  <Modal
    disabled={isLoading}
    hideButton = {true}
    isOpen={$loginModal.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModal.onClose}
    searchBoolean={false}
    {onSubmit} 
  >
  
    <div class=" flex flex-col gap-4">
      {#if showErrorMail}
      <small class="text-red-500 pl-1">Invalid email</small>
      {/if}
      <Input
        placeholder="Email *"
        onChange={(e) => (email = e.currentTarget.value)}
        value={email}
        disabled={isLoading}
        type="text"
      />
      {#if showErrorPassword}
      <small class="text-red-500 pl-1" >Wrong password</small>
      {/if}
      <Input
        placeholder="Password *"
        onChange={(e) => (password = e.currentTarget.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
    <div class="text-neutral-400 text-center mt-4">

      <p>First time using Pied Piper?
        <button on:click={onToggle}>
          <span class="text-white cursor-pointer hover:underline" >
              <em>Time to pay the piper</em>
          </span>
        </button>
      </p>
  </div>
  </Modal>
</form>


<script>
  import loginModal from "../../../data/loginModal";
  import registerModal from "../../../data/registerModal";

  import Modal from "../Modal.svelte";
  import Input from "../Input.svelte";

  import { goto } from '$app/navigation';

  let email = "";
  let password = "";
  let isLoading = false;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g


  let showErrorMail
  let showErrorPassword
  $: showErrorMail = false
  $: showErrorPassword = false

  const onToggle = () => {
        if(isLoading){
            return;
        }
        registerModal.onOpen()
        loginModal.onClose()
    }
    const onSubmit = async () => {
    try {
        isLoading = true;
        showErrorMail = !email.match(regex);
        showErrorPassword = password.length < 8;
      
  
        if (!showErrorMail && !showErrorPassword ) {
            loginModal.onClose();
            goto("/profile");
        }
      
    } catch (error) {
        console.log(error);
    } finally {
        isLoading = false;
    }
};


</script>

