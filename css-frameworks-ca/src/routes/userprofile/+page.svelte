<LoginModal/>
<RegisterModal/>

<header>
    <Header headerLabel="Profile456" showOptions={false}  />
    <ProfileHero  src="../src/lib/images/logo10.png"/>
    <ProfileBio
     bio="The official Pide-piper account of Profile456, my flute are not my own"
      btnName="Follow" 
      profileName="Profile456"
      />
</header>

<section class="pt-2 pb-2">
    {#each Array(5) as post, i}
        <HomePost/>
    {/each}
</section>



<script>
    import ProfileHero from "../../lib/components/ProfileHero.svelte";
    import Header from "../../lib/components/Header.svelte";
    import ProfileBio from "../../lib/components/ProfileBio.svelte";
    import HomePost from "../../lib/components/HomePost.svelte";
    import RegisterModal from "../../lib/components/modals/RegisterModal.svelte";
    import LoginModal from "../../lib/components/modals/LoginModal.svelte";
</script>