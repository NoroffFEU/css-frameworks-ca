const signInBtn = document.getElementById('sign-in-btn')
const form = document.getElementById('sign-in-form')
const email = document.getElementById('email')
const password = document.getElementById('password')



const submitForm = (event)=>{
    event.preventDefault()
    window.location.href = '/feed.html'
}

const main = ()=>{
    form.addEventListener('submit', submitForm)
}

main()