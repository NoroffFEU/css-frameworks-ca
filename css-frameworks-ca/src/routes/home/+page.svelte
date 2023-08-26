<LoginModal/>
<RegisterModal/>


<header>
    <Header headerLabel="Home" showReturn={false} />
</header>
<section>
    {#each Array(15) as post, index}
    <div >
        <Posts />
    </div>
    {/each}
</section>
<script>
    import Header from "../../lib/components/Header.svelte";
    import RegisterModal from "../../lib/components/modals/RegisterModal.svelte";
    import LoginModal from "../../lib/components/modals/LoginModal.svelte";
    import Posts from "../../lib/components/Posts.svelte";

  
</script>