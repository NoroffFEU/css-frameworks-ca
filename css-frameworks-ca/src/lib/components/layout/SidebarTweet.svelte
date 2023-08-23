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
    bg-sky-500
    hover:bg-opacity-90
    cursor-pointer
    transition">
        <p class="hidden lg:block text-center font-semibold text-white text-[20px]">Tweet</p>
    </div>
</div>
<script>
    import loginModal from "../../../data/loginModal";
    const onClick = () => {
        loginModal.onOpen()
    }
</script>