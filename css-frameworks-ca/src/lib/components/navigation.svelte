
<nav class="bg-red-600 w-full">
    <ul class="flex justify-end items-center space-x-5 p-2">
        {#each routes as navigationLink}
            <li><a href={navigationLink.route} class="hover:text-blue-500">{navigationLink.name}</a></li>
        {/each}
    </ul>
</nav>

<script>
    const routes = [
        {
            route: "/profile",
            name: "Profile"
        },
        {
            route: "/feed",
            name: "Feed"
        },
        {
            route: "/",
            name: "Log out"
        }
    ];
</script>