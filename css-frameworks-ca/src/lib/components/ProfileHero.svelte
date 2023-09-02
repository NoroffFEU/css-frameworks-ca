<!--Reusable hero, will be used for user profiles-->
<div>
    <div class="bg-neutral-700 h-44 relative">
        <img src="../../src/lib/images/svelte-welcome.png" class="absolute inset-0 w-full h-full object-cover"  alt="profileHeader"/>
        <div class="absolute -bottom-16 left-4">
            <ProfileImage src={src} />
            
        </div>

    </div>
</div>
<script>
    import ProfileImage from "./ProfileImage.svelte";
    export let src
  
</script>