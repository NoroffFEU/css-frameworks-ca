<script>
  import loginModal from "../../../data/loginModal";
  import Modal from "../Modal.svelte";
  import Input from "../Input.svelte";

  let email = "";

  let password = "";

  let isLoading = false;

  const onSubmit = async () => {
    try {
      isLoading = true;
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  };
</script>

<div>
  <Modal
    disabled={isLoading}
    isOpen={$loginModal.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModal.onClose}
    {onSubmit}
  >
    <div class=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => (email = e.currentTarget.value)}
        value={email}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Password"
        onChange={(e) => (password = e.currentTarget.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  </Modal>
</div>
