<!--Reusable profile Image, will be used for user profiles-->
<div class="border-4 border-white h-32 w-32 rounded-full cursor-pointer relative">
    <a href="/profile"  class="w-full h-full" >
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={src} class="w-full h-full object-cover  rounded-full transform scale-100 " alt="profile image"/> 
    </a>
</div>
<script>
export let src
</script>