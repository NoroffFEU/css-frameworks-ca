<script>
	import Sidebar from "../lib/components/layout/Sidebar.svelte";
	import FollowSideBar from "../lib/components/layout/FollowSideBar.svelte";
	import "../app.css";
</script>

<div class="app">
	
    <div  class="h-screen bg-black">

		<div class="container h-full mx-auto xl:px-30 max-w-6x">
			<div class="grid grid-cols-4 h-full">
				<Sidebar/>
				<div class="col-span-3 lg:col-span-2 border-x-[1px]  border-neutral-800">
					<slot />
				</div>
				<FollowSideBar/>
			</div>
			
		</div>

</div>
</div>

<style>

</style>