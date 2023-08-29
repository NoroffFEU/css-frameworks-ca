<!--Reusable sidebar items, if i want to add more logos etc to the sidebar-->
<div class="flex flex-row-items-center">
    <div class="relative
        rouned-full 
        h-14 w-14 
        flex 
        items-center 
        jusitfy-center 
        p-4 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden">
        <a href={route} class="text-white">
            <i class="{iconName} text-white " ></i>
        </a>
    </div>
    <div 
    class="
    relative
    hidden
    lg:flex 
    items-center 
    gap-4 p-4 rounded-full 
    hover:bg-slate-300 
    hover:bg-opacity-10
    cursor-pointer ">
    <a href={route} class="text-white  lg:flex  items-center   gap-4  rounded-full  ">
        <i class="{iconName} text-white " ></i>
        <p class="hidden lg:block text-white text-xl">{name}</p>
    </a>
    </div>
</div>


<script>
export let name
export let route
export let iconName
</script>