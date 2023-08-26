<article class="p-5 flex justify-center w-full bg-neutral-300 border-b border-neutral-400">
    <div class="bg-neutral-100 p-5 border border-gray-300 rounded-lg w-full max-w-md mx-auto">


        <div class="flex items-start mb-3">
 
            <a href="/profile">
                <img src="../../src/lib/images/profile.png" alt="User Avatar" class="rounded-full w-12 h-12 mr-4">
            </a>
           
    
   
            <div>
                <div class="flex gap-2 items-center">
                   <a href="/profile" class="hover:underline"><p class="font-bold">John Doe</p></a> 
                    <small class="font-small text-gray-600">2m</small>
                </div>
               
                <p class="text-gray-600">@johndoe</p>
            </div>
        </div>
    
  
        <p class="mb-3">
            This is the content of a Pied piper post. #tailwindcss FTW
        </p>
    
        
        <div class="flex justify-start space-x-5 text-gray-500">
            <button class="flex items-center space-x-1 hover:text-blue-500">
                <i class="far fa-comment"></i>
                <span>5</span>
            </button>

            <button class="flex items-center space-x-1 hover:text-red-500" on:click={handleLike}>
                <i class="far fa-heart {isActive ? "text-red-500" : ""}"></i>
                <span class="{isActive ? "text-red-500" : ""}">{count}</span>
            </button>
            <button class="flex items-center hover:text-blue-500">
                <i class="fas fa-share"></i>
            </button>
        </div>
    
    </div>
    
</article>
<script>
    
 let isActive
 $: isActive = false
 let count
 $: count = 20


 const handleLike = () => {
    isActive = !isActive
    isActive ? count ++ : count --
 }

</script>