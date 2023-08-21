<section class="w-full">
    <!-- Header Image -->
    <div class="relative bg-gray-900 h-[200px] md:h-[300px] bg-center bg-cover" style="background-image: url('../../src/lib/images/svelte-welcome.png')">
        <!-- Profile Image Container -->
        <div class="absolute bottom-[-50px] md:bottom-[-60px] left-2 md:left-4 text-center">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="../../src/lib/images/logo4.png" alt="profile image" class="w-16 h-16 md:w-20 md:h-20" />
            <p class="text-gray-900">Half6</p>
        </div>
      
    </div>

</section>
<section>
    <ProfileNavigation/>
</section>
<script>
    import ProfileNavigation from "./profileNavigation.svelte";
</script>