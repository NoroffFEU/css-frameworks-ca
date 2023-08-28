<article class="border-b-[1px] border-neutral-800 pb-4">
    <div class="flex justify-end p-2">
        <Button buttonName="Edit profile"
         secondary={true}
         disabled={false}
         fullWidth={false}
         large={false}
        outline={false}
        onClick={handleEdit}
        />
    </div>
    <div class="mt-8 px-4">
        <div class="flex flex-col">
            <p class="text-white text-2xl font-semibold">
                Profile123
            </p>
            <p class="text-md text-neutral-500">
                @Profile123
            </p>
        </div>
        <div class="flex flex-col mt-4">
            <p class="text-white">
                The official Pide-piper account of Profile123, my flute are my own
            </p>
            <div class="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                <p>
                    Joined {formattedDate}
                </p>
            </div>
        </div>
        <div class="flex flex-row items-center mt-4 gap-6">
            <div class="flex flex-row items-center gap-1">

                <p class="text-white">10 </p>
                <p class="text-neutral-500">Following</p>

            </div>

            <div class="flex flex-row items-center gap-1">

                <p class="text-white">20 </p>
                <p class="text-neutral-500">Followers</p>

            </div>


        </div>
    </div>
</article>
<script>
    import Button from "./Button.svelte";
    const currentDate = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${year}`;
    //editprofile comes later
    const handleEdit=() => {
        console.log("coming soon")
    }
</script>