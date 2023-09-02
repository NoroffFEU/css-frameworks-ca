<!--Reposts might replace for something else-->
<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-1">

    <div class="flex space-x-4">
        <a href="/profile">
            <img src="../../src/lib/images/profile.png" alt="User Avatar" class="rounded-full w-12 h-12" >
        </a>
       
      <div class="text-sm">
        <p class="font-bold">Profile123</p>
        <p>@Profile123· <small>5m</small></p>
      </div>
      <span class="text-gray-400 ml-auto text-xs"><i class="fa-solid fa-retweet"></i> You reposted</span>
    </div>
  

    <div class="mt-4 border-l-2 border-gray-300 pl-4">
      <div class="flex items-center space-x-4">
        <a href="/userprofile">
           <img src="../../src/lib/images/logo10.png" alt="User Avatar" class="rounded-full w-10 h-10" >
        </a>
        <div class="text-sm">
          <p class="font-bold">Profile456</p>
          <p>@Profile456</p>
        </div>
      </div>
      <p class="mt-4 text-gray-700">I love working with tailwind</p>
    </div>
  

    <div class="flex justify-start space-x-5 text-gray-500 pt-5">
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