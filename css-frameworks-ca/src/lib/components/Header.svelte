<div class="border-b-[1px] border-neutral-800 p-5">
    <div class="flex flex-row items-center gap-2">
        {#if showReturn}
            <i class="fa-solid fa-arrow-left text-white lg cursor-pointer hover:opacity-70 transition" on:click={handleReturn}></i>    
        {/if}
        <h1 class="text-right text-xl font-semibold text-white">{headerLabel}</h1>
    </div>
</div>
<script>
    export let headerLabel
    export let showReturn
    const handleReturn = () => {
        window.history.back();
    }
 showReturn = false


</script>
