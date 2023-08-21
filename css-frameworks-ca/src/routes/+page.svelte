

                <section class="bg-gray-900 h-screen flex items-center">
                    <div class="flex flex-col items-center md:flex-row md:items-stretch justify-center px-6 py-8 mx-auto w-full max-w-5xl">
           
                        <div class="flex flex-col  w-full md:w-1/2 rounded-t md:rounded-l md:rounded-t-none md:rounded-b-none   sm:max-w-md xl:p-0 bg-gray-800">
                            
                
                            <div class="flex-grow p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div class="m-auto  flex justify-center">
                                    <div class="flex items-center text-2xl font-semibold text-white align-center">
                                        <img class="logo" src="../../src/lib/images/logo4.png" alt="logo">
                                        <p>Future-social </p>   
                                    </div>
                                   
                                </div>
                                <h1 class="text-xl font-bold    md:text-2xl text-white">
                                    Sign in
                                </h1>
                                <form class="space-y-4 md:space-y-6"on:submit|preventDefault={handleSubmit} >
                
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
                                        {#if form?.errors?.email}
                                         <span  class="label-text-alt text-red-500">{form?.errors?.email[0]}</span>
                                        {/if}
                                        <input type="email" name="email" id="email"
                                         class=" {form?.errors?.email ? "input-error" : "input-bordered" }
                                         sm:text-sm rounded-lg
                                         block w-full p-2.5 bg-gray-700
                                         border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="example@mail.com"  value={form?.data?.email ?? ""}>
                                    </div>
                
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                                        {#if form?.errors?.password}
                                         <span  class="label-text-alt  text-red-500">{form?.errors?.password[0]}</span>
                                         {/if}
                                        <input type="password" name="password" id="password" placeholder="********"
                                        value={form?.data?.password ?? ""} 
                                          class="
                                          {form?.errors?.password ? "input-error" : "input-bordered" }
                                          sm:text-sm rounded-lg
                                           block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"  minlength="8">
                                    </div>
                                    
                                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                      Sign in
                                    </button>
                                </form>
                                <div>
                                    <p class="text-white">Dont have a account ? / <a href="/register" class="hover:underline">sign up </a> </p>
                                </div>
                            </div>
                        </div>
                
                
                
                
                    </div>
                </section>
          

  <script>

export let form;

</script>

  <style lang="postcss">
    .logo{
        width: 120px;
    }
  </style>
