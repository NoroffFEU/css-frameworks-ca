<form>
    <Modal
      disabled={isLoading}
      hideButton = {false}
      isOpen={$postModal.isOpen}
      title="Post"
      actionLabel="Post a PiedPiper post"
      onClose={postModal.onClose}
      searchBoolean={false}
      
      {onSubmit} 
    >
    
      <div class=" flex flex-col gap-4">
        <div class="container mx-auto mt-10">
            <label for="message" class="block text-sm font-medium text-gray-600">Whats on your mind?</label>
            <textarea
            onChange={(e) => (text = e.currentTarget.value)}
            value={text}
            id="message"
            name="message" 
            rows="4" 
            class="mt-1 p-2 w-full 
            border rounded-md"
            />
          </div>

      </div>

    </Modal>
  </form>
  
  <script>
    import postModal from "../../../data/postModal";
    import Modal from "../Modal.svelte";

    import { goto } from '$app/navigation';
  
    let text = ""
    let isLoading = false;

      const onSubmit = async () => {
      try {
          isLoading = true;
          postModal.onClose();
              goto("/feed")
    

      } catch (error) {
          console.log(error);
      } finally {
          isLoading = false;
      }
  };
</script>  