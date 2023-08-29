<!--Reusable Inputs, might remove them if i only use them for login and search-->
<input 
disabled={disabled}
on:change ={onChange}
value={value}
placeholder={placeholder}
type={type}
class="
w-full
p-4
text-lg
custom-background
border-2
border-neutral-800
rounded-md
outline-none
text-white
focus:border-sky-500
focus:border-2
transition
disabled:bg-netural-900
disabled:opacity-70
disabled:cursor-not-allowed
"

  />
<script>
    export let placeholder
    export let value
    export let type
    export let disabled
    export let onChange
</script>
<style lang="postcss">
  .custom-background{
background-color: #01100c;
}
</style>