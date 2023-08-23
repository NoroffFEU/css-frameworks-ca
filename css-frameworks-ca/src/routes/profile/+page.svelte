<LoginModal/>
<RegisterModal/>

<header>
    <Header headerLabel="Profile123"  />
    <ProfileHero/>
    <ProfileBio />
</header>

<section>
    <h1 class="text-white">WHAT</h1>
</section>



<script>
    import ProfileHero from "../../lib/components/ProfileHero.svelte";
    import Header from "../../lib/components/Header.svelte";
    import ProfileBio from "../../lib/components/ProfileBio.svelte";

 import RegisterModal from "../../lib/components/modals/RegisterModal.svelte";
 import LoginModal from "../../lib/components/modals/LoginModal.svelte";
</script>