
<!--Will handle register-->
<form>
    <Modal disabled={isLoading}
     isOpen={$registerModal.isOpen}
     title="Create an account"
     actionLabel="Register"
     onClose={registerModal.onClose}
     onSubmit={onSubmit}
     searchBoolean={false}
     hideButton = {true}
     >
      <div class=" flex flex-col gap-4">


        {#if showNameError}
        <small class="text-red-500 pl-1">Name is required</small>
    {/if}
    <Input 
        placeholder="Your name" 
        onChange={(e) => name = e.currentTarget.value} 
        value={name} 
        disabled={isLoading} 
        type="text" 
    />

    {#if showEmailError}
        <small class="text-red-500 pl-1">Invalid email</small>
    {/if}
    <Input 
        placeholder="Email" 
        onChange={(e) => email = e.currentTarget.value} 
        value={email} 
        disabled={isLoading} 
        type="email" 
    />

    {#if showPasswordError}
        <small class="text-red-500 pl-1">Password should be at least 8 characters long</small>
    {/if}
    <Input 
        placeholder="Password" 
        onChange={(e) => password = e.currentTarget.value} 
        value={password} 
        disabled={isLoading} 
        type="password" 
    />

    {#if showUsernameError}
        <small class="text-red-500 pl-1">Username is required</small>
    {/if}
    <Input 
        placeholder="Username" 
        onChange={(e) => username = e.currentTarget.value} 
        value={username} 
        disabled={isLoading} 
        type="text" 
    />

    </div>
    <div class="text-neutral-400 text-center mt-4">
        <p>Already have an account? 
            <button on:click={onToggle}>
                <span class="text-white cursor-pointer hover:underline" >
                    <em>Sign in</em>
                </span>
            </button>

        </p>
    </div>
    </Modal>
  
</form>

<script>

    import registerModal from "../../../data/registerModal";
    import Modal from "../Modal.svelte";
    import Input from "../Input.svelte";
    import loginModal from "../../../data/loginModal";

    let name = "";
    let email = "";
    let password = "";
    let username = "";
    let isLoading = false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Email validation regex "https://regexr.com/3e48o"

    let showNameError = false;
    let showEmailError = false;
    let showPasswordError = false;
    let showUsernameError = false;

    const onToggle = () => {
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    };

    const onSubmit = async () => {
        try {
            isLoading = true;

            showNameError = !name.trim();
            showEmailError = !email.match(regex);
            showPasswordError = password.length < 8;
            showUsernameError = !username.trim();

            if (!showNameError && !showEmailError && !showPasswordError && !showUsernameError) {
                registerModal.onClose();
                loginModal.onOpen();
                
            }

        } catch (error) {
            console.log(error);
        } finally {
            isLoading = false;
        }
    };

</script>