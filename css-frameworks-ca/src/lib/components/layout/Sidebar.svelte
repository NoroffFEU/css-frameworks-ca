<section class="col-span-1 h-full pr-4 md:pr-6">
    <aside class="flex flex-col items-end">
        <div class="space-y-2 lg:w-[230px]">
            <SidebarLogo/>
            {#each icons as icon}
             
                <SidebarItem name={icon.name} route={icon.route} iconName={icon.iconName}/>
                    
            {/each}
            <SidebarItem name="Logout" route="/" iconName="fa-solid fa-right-from-bracket text-white lg" />
            <SideBarPost/>
        </div>
    </aside>
</section>


<script>
    import SidebarLogo from "./SidebarLogo.svelte";
    import SidebarItem from "./SidebarItem.svelte";
    import SideBarPost from "./SideBarPost.svelte";
    const icons = 
    [
        {
            name:"Home",
            route:"/home",
            iconName:"fa-solid fa-house"
        },
        {
            name:"Notifications",
            route:"/notifications",
            iconName: "fa-solid fa-bell"
        },    
        {
            name:"Profile",
            route:"/profile",
            iconName:"fa-solid fa-user"
      
        }
    ]
</script>
<style></style>