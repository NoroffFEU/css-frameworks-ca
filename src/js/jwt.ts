
type registerProp = "email"|"userName"|"password"|"repeatedPassword"

interface registerInputValues{
    email:string;
    userName:string;
    password:string;
    repeatedPassword:string;
}

const registerObject:registerInputValues = {
    email:"email",
    userName:"username",
    password:"password",
    repeatedPassword:"password"


}

const inputPassword = document.querySelector("#password--register") as HTMLInputElement
const inputEmail = document.querySelector("#email--register") as HTMLInputElement
const inputRpassword = document.querySelector("#password--register--repeat") as HTMLInputElement
const inputUserName = document.querySelector("#username--register") as HTMLInputElement

function collectInput(input:HTMLInputElement,inputName:registerProp){
    input.addEventListener("input",()=>{
        if(input.value){
        registerObject[inputName] = input.value
        console.log({registerObject})
 }return })
}

collectInput(inputEmail,"email")
collectInput(inputPassword,"password")
collectInput(inputUserName,"userName")
collectInput(inputRpassword,"repeatedPassword")


//function registerAccount({email,userName,password,repeatedPassword}:registerInputValues){
 //}
