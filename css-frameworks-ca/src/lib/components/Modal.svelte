 {#if  isOpen}
    <div
    class="
    justify.center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800
    bg-opacity-70"
    >
        <div
        class="
        relative
        w-full
        lg:w-3/6
        my-6
        mx-auto
        lg:max-w-3xl
        h-full
        lg:h-auto"
        >
        <!---CONTENT-->
            <div class="
            h-full
            lg:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-black
            outline-none
            focus:outline-none"
            >
    <!---HEADER-->
            <div class="
                flex
                items-center
                justify-between
                p-10
                rounted-t">
                <h3 class="text-3xl font-semibold text-white">{title}</h3>
                <button class="p-1 ml-auto border-0 text-white hover:opacity-70 transition" on:click={handleClose}>
                    <i class="fa-solid fa-xmark lg text-white"></i>
                </button>
            </div>
            <!--BODY-->
            <div class="relative p-10 flex-auto">
            <slot></slot>
            </div>
            <!--Footer-->
            <div class="flex flex-col gap-2 p-10">
                 <!--Handles the form submit-->
                <Button 
                disabled={disabled} 
                buttonName={actionLabel} 
                secondary 
                fullWidth 
                large 
                onClick={handleSubmit}/>
              
            </div>
        </div>
    </div>
    </div>
{/if}
<script>
    import Button from "./Button.svelte";
    export let isOpen
    export let onClose
    export let onSubmit
    export let title
    export let actionLabel
    export let disabled


    const handleClose = () => {

        if(disabled){
            return 
        }
        onClose()
        }



    const handleSubmit = () => {

        if(disabled){
            return 
        }
        onSubmit()
        }



    
</script>