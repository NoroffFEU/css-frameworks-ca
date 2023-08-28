<form>


<Modal
    disabled={isLoading}
    isOpen={$searchModal.isOpen}
    title="Search"
    actionLabel="Search"
    onClose={searchModal.onClose}
    {onSubmit} 
    searchBoolean={true}
  >



    <Input
      placeholder="Search"
      onChange={(e) => (searchText = e.currentTarget.value)}
      value={searchText}
      disabled={isLoading}
      type="text"
    />




</Modal>
</form>
<script>
  import Modal from "../Modal.svelte";
  import Input from "../Input.svelte";
  import searchModal from  "../../../data/searchModal";

  let searchText
$: searchText = ""
let isLoading = false;

const onToggle = () => {
        if(isLoading){
            return;
        }
     
        searchModal.onClose()
    }
    // Propper searchHandling later
    const onSubmit = async () => {
    try {
        isLoading = true;

      
    } catch (error) {
        console.log(error);
    } finally {
        isLoading = false;
        searchModal.onClose()
    }
};



</script>
<style lang="postcss">

</style>