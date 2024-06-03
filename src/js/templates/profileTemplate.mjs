export function profileTemplate(profileData) {
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("border-bottom", "border-5", "border-primary", "bg-white")
    
    //PROFILENAME IN TITLE
    const userTitle = document.getElementById("userTitle");
    userTitle.innerHTML = `Profile of ${profileData.name}` ;

    //PAGE NAME
    const pageName = document.createElement("h1");
    pageName.classList.add("m-auto", "fs-5", "py-2", "ms-2", "font-righteous", "text-center");
    pageName.textContent = `Welcome to ${profileData.name}´s Profile`;

    const profileInfo = document.createElement("div");
    profileInfo.classList.add( "bg-white")
    
    //NAME
    const myName = document.createElement("h1");
    myName.classList.add("d-flex", "fw-bolder", "justify-content-center", "text-decoration-none");
    myName.textContent = `${profileData.name}`;
    
    //EMAIL
    const myEmail = document.createElement("h2");
    myEmail.classList.add("profileTexts", "d-flex", "justify-content-center");
    myEmail.innerHTML = `${profileData.email}`;
    
    //POSTS COUNT
    const myPostCount = document.createElement("h2");
    myPostCount.classList.add("profileText", "d-flex", "justify-content-center", "fw-bolder", "mt-4", "border-top", "border-secondary", "py-2");
    myPostCount.innerHTML = `POSTS: ${profileData._count.posts}`;

    //BANNER / BACKGROUND
    const bannerImg = document.createElement("img");
    bannerImg.classList.add("container-fluid", "bannerImg", "object-fit-cover", "p-0");
    bannerImg.style.width = "100%";
    bannerImg.style.height = "125px";
    if (profileData.banner) {
        bannerImg.src = profileData.banner;
    } else {
        bannerImg.src = "../../../images/particle.jpeg";
    }
    bannerImg.alt = `Banner of: ${profileData.name}`;

    //EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit profile";
    //const userName = JSON.parse(localStorage.getItem("profile")).name;
    //location.href = /post/edit/;
    editBtn.classList.add("btn", "fs-4", "top-1", "end-0", "p-2", "py-1", "m-2", "bg-white", "border-secondary", "position-absolute", "rounded-circle");
    editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;

    editBtn.addEventListener("click", () => {
        window.location.href = `../../../../profile/edit/`;
    });

    const profileHead = document.createElement("div");
    profileHead.classList.add("profileText", "d-flex", "m-auto", "justify-content-evenly", "bg-white", "mt-n3", "position-relative", "rounded-4")

    //FOLLOWERS
    const followersSectíon = document.createElement("div");
    followersSectíon.classList.add("d-block", "mt-3");

    const followersText = document.createElement("h3");
    followersText.innerHTML = "FOLLOWERS";
    followersText.classList.add("fs-7", "fw-bolder");
    const followersNumber = document.createElement("p");
    followersNumber.innerHTML = `${profileData._count.followers}`;
    followersNumber.classList.add("d-flex","fs-4", "mt-n2", "justify-content-center");
    followersSectíon.append(followersText, followersNumber);
    profileHead.append(followersSectíon);

    //AVATAR
    const avatarImg = document.createElement("img")
    avatarImg.classList.add("avatarImg", "object-fit-cover", "rounded-circle", "border", "border-3", "border-white");
    avatarImg.style.width = "100px";
    avatarImg.style.height = "100px";
    if (profileData.avatar){
        avatarImg.src = profileData.avatar;
    } else {
        avatarImg.src = "../../../images/moon.avif";
    }            
    avatarImg.alt = `Avatar of: ${profileData.name}`;
    profileHead.append(avatarImg)

    //FOLLOWING
    const followingSectíon = document.createElement("div");
    followingSectíon.classList.add("profileText", "d-block", "mt-3");

    const followingText = document.createElement("h3");
    followingText.innerHTML = "FOLLOWING";
    followingText.classList.add("fs-7", "fw-bolder")
    const followingNumber = document.createElement("p");
    followingNumber.innerHTML = `${profileData._count.following}`;
    followingNumber.classList.add("d-flex","fs-4", "mt-n2", "justify-content-center");
    followingSectíon.append(followingText, followingNumber);
    profileHead.append(followingSectíon);

    //BUTTON
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add( "profileText", "d-flex", "justify-content-center", "py-3", "bg-light")
    
    //Follow
    const followBtn = document.createElement("button");
    followBtn.type = "button";
    followBtn.innerHTML = `FOLLOW <i class="bi bi-plus-lg"></i>`;
    followBtn.classList.add("profileText", "me-1", "fw-bolder", "bg-white", "rounded");
    buttonContainer.append(followBtn)

    //Message  
    const messageBtn = document.createElement("button");
    messageBtn.type = "button";
    messageBtn.innerHTML = `MESSAGE <i class="bi bi-envelope-heart"></i>`;
    messageBtn.classList.add("profileText", "ms-1", "fw-bolder", "bg-white", "rounded");
    buttonContainer.append(messageBtn);
  
    profileInfo.append(myName, myEmail, myPostCount);
    profileContainer.append(pageName, bannerImg, editBtn, profileHead, profileInfo, buttonContainer);

    return profileContainer;
}