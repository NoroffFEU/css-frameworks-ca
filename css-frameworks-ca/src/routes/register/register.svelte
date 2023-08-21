

  <section class="bg-gray-150 dark:bg-gray-900 h-screen flex items-center">
    <div class="flex flex-col items-center md:flex-row md:items-stretch justify-center px-6 py-8 mx-auto w-full max-w-5xl">
        <!-- Sign up Section -->
        <div class="flex flex-col  w-full md:w-1/2 bg-white rounded-t md:rounded-l md:rounded-t-none md:rounded-b-none shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 md:border-r-0">
            <div class="flex-grow p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign up
                </h1>
                <form class="space-y-4 md:space-y-6" action="/profile">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                    </div>

                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" 
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required minlength="8">
                    </div>
                    
                    <button class="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                      Sign up
                    </button>
                </form>
                
            </div>
        </div>

        <!-- Logo and Description Section -->
        <div class="flex flex-col w-full bg-white rounded-b md:rounded-r md:rounded-t-none md:rounded-b-none shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 justify-center">
            <div class="m-auto p-6">
                <div class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white align-center">
                    <img class="logo" src="../../src/lib/images/logo4.png" alt="logo">
                    <p>Future-social </p>   
                </div>
                <p class="text-center text-gray-100">Join the future of social networking</p>
            </div>
        </div>

    </div>
</section>

  <style lang="postcss">
    .logo{
        width: 100px;
    }
  </style>
