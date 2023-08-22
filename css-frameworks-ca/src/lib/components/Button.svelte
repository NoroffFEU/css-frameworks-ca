
<button
disabled= {disabled}
on:click={onClick}
 class={`
disabled: opacity-70
disabled:cursor-not-allowed
rounded-full
font-semibold
hover:opacity-89
transition
border-2
${fullWidth ? "w-full" : "w-fit"}
${secondary ? "bg-white" : "bg-sky-500"}
${secondary ? "text-black" : "text-white"}
${secondary ? "border-black" : "border-sky-500"}

${large ? "text-xl" : "text-md"}
${large ? "px-5" : "px-4"}
${large ? "py-3" : "py-2"}

${outline ? "bg-transparent" : ""}
${outline ? "border-white" : ""}
${outline ? "text-whitee" : ""}
`}>
    {buttonName}
</button>
<script>
    export let buttonName
    export let secondary
    export let fullWidth
    export let large
    export let onClick
    export let disabled 
    export let outline
</script>