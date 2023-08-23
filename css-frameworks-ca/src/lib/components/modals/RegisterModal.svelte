<div>
    <Modal disabled={isLoading}
     isOpen={$registerModal.isOpen}
     title="Create an account"
     actionLabel="Register"
     onClose={registerModal.onClose}
     onSubmit={onSubmit}>
      <div class=" flex flex-col gap-4">

        <Input placeholder="Your name" onChange={(e) => email = e.currentTarget.value} value={name} disabled= {isLoading} type="text" />
        <Input placeholder= "Email" onChange={(e) => email = e.currentTarget.value} value={email} disabled= {isLoading} type="email" />
            
        <Input placeholder="password" onChange={(e) => password = e.currentTarget.value} value={password} disabled= {isLoading} type="password" />
        <Input placeholder= "username" onChange={(e) => username = e.currentTarget.value} value={username} disabled= {isLoading} type="text" />

    </div>
    <div class="text-neutral-400 text-center mt-4">
        <p>Already have an account? 
            <span class="text-white cursor-pointer hover:underline" on:click={onToggle}>
                <em>Sign in</em>
            </span>
        </p>
    </div>
    </Modal>
  
</div>

<script>

    import registerModal from "../../../data/registerModal";
    import Modal from "../Modal.svelte";
    import Input from "../Input.svelte";
    import loginModal from "../../../data/loginModal";

    let name =""

    let email = ""

    let password =""

    let username = ""

    let isLoading = false
    
    const onToggle = () => {
        if(isLoading){
            return;
        }
        registerModal.onClose()
        loginModal.onOpen()
    }

const onSubmit = async () => {

    try{
        isLoading = true
        registerModal.onClose()
    }   catch(error){
        console.log(error)
    }  finally {
        isLoading = false
    }
}


</script>