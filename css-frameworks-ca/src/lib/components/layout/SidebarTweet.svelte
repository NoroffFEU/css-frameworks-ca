<div on:click={onClick}>
    <div
     class="mt-6 
     lg:hidden 
     rounded-full 
     h-14 
     w-14 
     p-4 
     flex 
     items-center
     justify-center
     bg-sky-500
     hover:bg-opacity-80
     transition
     cursor-pointer
     ">
     <i class="fa-brands fa-pied-piper-alt lg"></i>
    </div>
    <div class="mt-6

    hidden lg:block
    px-4
    py-2
    rounded-full

    bg-white
    
    hover:bg-opacity-90
    cursor-pointer
    transition">
        <p class="hidden lg:block text-center  font-semibold custom-text-color text-[19px]">PiperPeep </p>
    </div>
</div>
<script>
    import loginModal from "../../../data/loginModal";
    const onClick = () => {
        loginModal.onOpen()
    }
</script>
<style lang="postcss">
    .custom-button-color{
        background-color: #007C5C;
    }
    .custom-text-color{
        color:#004230;
    }
</style>