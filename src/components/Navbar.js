export default class Navbar{
    constructor(selector){
        this.navbar = document.querySelector(selector)
    }
    addNavItem(selector, callback){
        const navbarItem = this.navbar.querySelector(selector)
        const {href, signOut} = callback()
        navbarItem.href = href;
        if(signOut){
            navbarItem.addEventListener('click', ()=>{
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            })
        }

    }
}