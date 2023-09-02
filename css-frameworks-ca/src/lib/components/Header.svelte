<!--Header labels for knowing  where you are -->
<div class="border-b-[1px] border-neutral-800 p-5 flex items-center gap-5">
    <div class="flex flex-row items-center gap-2 align-center">

        <h1 class="text-right text-xl font-semibold text-white">{headerLabel}</h1>
    </div>
    {#if showOptions}
    <div class="flex items-center">
        <label for="sort-posts" class="mr-2 text-lg text-white">Sort by:</label>
        <select id="sort-posts" class="border rounded px-4 py-2">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
{/if}
</div>

<script>
    export let headerLabel
    export let showOptions


</script>
