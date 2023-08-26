
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
bg-black
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