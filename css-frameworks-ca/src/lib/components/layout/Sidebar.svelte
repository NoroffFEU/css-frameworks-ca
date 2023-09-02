<!--Sidebar-->
<section class="col-span-1 h-full pr-4 md:pr-6">
    <SearchModal/>
    <PostModal/>

    <aside class="flex flex-col items-end">
       
        <div class="space-y-2 lg:w-[230px]">
            <SidebarLogo/>
            {#each icons as icon}
             
                <SidebarItem name={icon.name} route={icon.route} iconName={icon.iconName}/>
                    
            {/each}
            <SidebarItem name="Logout" route="/" iconName="fa-solid fa-right-from-bracket text-white lg" />
            <button class=" md:hidden block" on:click={handleOpenSearch}>          
                <span class=" inset-y-0 left-0 flex items-center pl-3">
                    <i class="fa-solid fa-magnifying-glass text-white"></i>
                </span>
            </button>
            <SideBarPost/>
            
        </div>
    </aside>
</section>


<script>
    import SidebarLogo from "./SidebarLogo.svelte";
    import SidebarItem from "./SidebarItem.svelte";
    import SideBarPost from "./SideBarPost.svelte";
    import SearchModal from "../modals/SearchModal.svelte";
    import searchModal from "../../../data/searchModal";
    import PostModal from "../modals/PostModal.svelte";
    import postModal from "../../../data/postModal";
    
    const icons = 
    [
        {
            name:"Feed",
            route:"/feed",
            iconName:"fa-solid fa-house"
        },
   
        {
            name:"Profile",
            route:"/profile",
            iconName:"fa-solid fa-user"
      
        }
    ]
    const handleOpenSearch = () => {
        searchModal.onOpen()
    }
</script>
<style></style>