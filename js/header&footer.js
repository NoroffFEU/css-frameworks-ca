const onlyPc = "nav-item d-none d-sm-inline"
const onlyMb = "d-sm-none d-inline"

document.querySelector('header').innerHTML+=`
  <div id="top-menu" class="p-0 fixed-top navbar ${onlyMb}"></div>
`
//    <div id="header-design class="d-sm-inline d-none text-bg-primary">  </div>

document.querySelector('footer').innerHTML+=`
  <nav id="mobile-nav-menu" class="p-0 fixed-bottom navbar ${onlyMb}"></nav>
`

const topMenuSelector = document.getElementById('top-menu')
topMenuSelector.innerHTML=`

    <div class="text-bg-light">
        <div class="row justify-content-between align-items-center text-bg-primary p-3">
            <div class="col-auto">
                <a href="/feed/index.html">
                    <i class="bi bi-arrow-left-circle fs-1 text-bg-primary"></i>
                </a>
            </div>
            <div class="col-auto">
                <span class="fs-1">${document.title}</span>
            </div>
            <div class="col-auto">
                <a class="nav-link" href="#">
                    <i class="bi bi-bell fs-1"></i>
                </a>
            </div>
        </div>
    <div id="addPostMenu" class="${onlyMb} m-1 d-none">
        <div class="mb-2 ms-2 row justify-content-between">
            <button type="button" class="col-6  btn btn-primary">Upload image</button>
            <button onclick="toggleAddPostMenu()" class=" col-4 nav-link">
                <i class="bi bi-x-lg"></i>
                <span class="${onlyPc}">Add post</span>
            </button>
        </div>
        <div class="m-2">
            <textarea class="mb-2 form-control border-primary" rows="4" placeholder="Enter description"></textarea>
        </div>
        <div class="ms-2">
            <button type="button" class="btn btn-primary" disabled>Post</button>
        </div>
    </div>
    </div>
`


let sideMenu =`<ul class="col list-unstyled ps-1">`
sideMenu+=menuItems(5)+"</ul>"
document.getElementById('nav-menu').innerHTML=sideMenu

let bottomMenu= `<ul class="list-unstyled p-3 m-0 d-flex justify-content-between w-100 text-bg-primary">`
bottomMenu+=menuItems(1)+"</ul>"
document.getElementById('mobile-nav-menu').innerHTML=bottomMenu




function menuItems(size){
if(size){size="fs-"+size}
return`
<li class="nav-item">
    <a class="nav-link active" href="#">
        <i class="bi bi-house ${size}"></i>
        <span class="${onlyPc} ${size}">Home</span>
    </a>
</li>
<li class="nav-item">
    <a class="nav-link" href="../feed/index.html">
        <i class="bi bi-search ${size}"></i>
        <span class="${onlyPc} ${size}">Explore</span>
    </a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#">
        <i class="bi bi-play-circle ${size}"></i>
        <span class="${onlyPc} ${size}">Videos</span>
    </a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#">
        <i class="bi bi-chat ${size}"></i>   
        <span class="${onlyPc} ${size}">Messages</span>
    </a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#">
        <i class="bi bi-person ${size}"></i>
        <span class="${onlyPc} ${size}">Profile</span>
    </a>
</li>
<li class="nav-item nav-item ${onlyPc}">
    <a class="nav-link text-nowrap" href="#">
        <i class="bi bi-bell ${size}"></i>
        <span class="${onlyPc} ${size}">Notifications</span>
    </a>
</li>
<li class="nav-item ${onlyPc}">
    <a class="nav-link mt-3" href="#">
        <i class="bi bi-gear ${size}"></i>
        <span class="${size}">Settings</span>
    </a>
</li>
<li class="nav-item ${onlyPc}">
    <a class="nav-link mt-3" href="/index.html">
        <i class="bi bi-box-arrow-in-left ${size}"></i>
        <span class="${size}">Log out</span>
    </a>
</li>
<li class="nav-item ${onlyMb}">
    <button onclick="toggleAddPostMenu()" class="nav-link">
        <i class="bi bi-plus-circle ${size}"></i>
        <span class="${size} ${onlyPc}">Add post</span>
    </button>
</li>
<div class="${onlyPc}">
    <button type="button" class="mt-5 mb-2 btn btn-primary">Upload image</button>
    <textarea class="mb-2 form-control border-primary" rows="2" placeholder="Description"></textarea>
    <button type="button" class="btn btn-primary" disabled>Post</button>
<div>

`
}

const addPostMenu = document.getElementById('addPostMenu')
function toggleAddPostMenu(){
    addPostMenu.classList.toggle('d-none')
    updateMainMargin()
}

function chechMenuForActive(){
    const navItems = navContainer.querySelectorAll('a');
    const currentPath = window.location.pathname.toLowerCase();
    function normalizePath(path) {
    return path.replace(/^(\.\.)+/, '');
    }
    navItems.forEach(link => {
    const href = normalizePath(link.getAttribute('href')).toLowerCase();
    console.log(href,currentPath);
    if (href === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add("active");
    }
    });
}

const mainSelector = document.querySelector('main')

function updateMainMargin(){
    const headerHeight = document.getElementById('top-menu').offsetHeight;
    const footerHeight = document.getElementById('mobile-nav-menu').offsetHeight;
    mainSelector.style.paddingTop = headerHeight+10 + 'px';
    mainSelector.style.paddingBottom = footerHeight+10 + 'px';
}

updateMainMargin()