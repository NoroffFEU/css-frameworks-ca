import formValidation from "./utils/formValidation.js";
import apiClient from "./services/noroffAPI.js";
const main = ()=>{
    console.log('main running...');
    const signupForm = new formValidation('#signup-form');
    const signInForm = new formValidation('#sign-in-form');
    const signupButton = document.querySelector('#signup-button');
    const signInButton = document.querySelector('#sign-in-button');
    const signupFormFeedback = document.querySelector('#signup-form-feedback');
    const signInFeedback = document.querySelector('#sign-in-feedback');
    const signupCloseButton = document.querySelector("#signup-close-btn")
    const APICLIENT = new apiClient();
    signupForm.validate('#new-user-email', (value)=> {
        console.log(value);
        if(value.trim().length === 0){
            return {
                isValid: false,
                error: 'Please provide an email address.',
            }
        }
        if(value.substring(0, value.indexOf('@')).trim().length > 0 ){
            if(value.includes('@noroff.stud.no') || value.includes('@noroff.no')){
                return {
                    isValid: true,
                } 
            } else {
                return {
                    isValid: false,
                    error: 'Please provide a valid email address. A valid email address contains the @stud.noroff.no or @noroff.no domain.'
                }
            }

        }
        return {
            isValid: false,
            error: 'Please provide a valid email address.'
        }
    });

    signupForm.validate('#new-user-name', (value)=>{
        console.log(value);
        const regex = /\p{P}/gu;
        if(value.trim().length < 6){
            return {
                isValid: false,
                error: 'Please provide a valid username. Usernames must be at least 6 characters long.'
            }
        }

        if(value.trim().length >= 6 && !regex.test(value)){
            return {
                isValid: true,
            }
        } else {
            return {
                isValid: false,
                error: 'Usernames cannot contain punctuation symbols.'
            }
        }
    });

    signupForm.validate('#new-user-password', (value)=>{
        if(value.trim().length < 8){
            return {
                isValid: false,
                error: 'Passwords must be atleast 8 characters long.'
            }
        } else {
            return {
                isValid: true,
            }
        }
    });

    signupButton.addEventListener('click', (event)=>{
        event.preventDefault();
        signupFormFeedback.textContent = "";
        const newUser = {};
        const {inputs} = signupForm;
        inputs.forEach(input => {
            newUser[input.name] = input.value;
        })
        APICLIENT.registerUser(newUser, (response)=>{
            const {validRegistration, data} = response;
            if(validRegistration){
                const validRegistrationMessage = document.createElement('li');
                validRegistrationMessage.id = "valid-message"
                validRegistrationMessage.classList.add('list-group-item', 'list-group-item-success')
                validRegistrationMessage.textContent = 'Success! Close this window and sign in with your email and password!';
                signupFormFeedback.append(validRegistrationMessage)
                document.querySelector('#signup-form').reset();
                signupCloseButton.addEventListener("click", ()=>{
                    document.querySelector("#valid-message").remove()
                })
                
            } else {
                console.log(data.errors)
                const {errors} = data;
                errors.forEach(error =>{
                    const errorMessage = document.createElement('li');
                    errorMessage.id = "error-message"
                    errorMessage.classList.add('list-group-item', 'list-group-item-danger');
                    errorMessage.textContent = error.message;
                    signupFormFeedback.append(errorMessage);
                    signupCloseButton.addEventListener("click", ()=>{
                        document.querySelector("#error-message").remove()
                        document.querySelector('#signup-form').reset();
                    })
                })
            }
        })
    })

    signInButton.addEventListener('click', (event)=>{
        event.preventDefault()
        signInFeedback.textContent = "";
        console.log(signInForm.inputs)
        const user = {};
        const {inputs} = signInForm;
        inputs.forEach(input => {
            user[input.name] = input.value;
        })
        console.log(user)
        APICLIENT.login(user, (response)=>{
            const {isAuthenticated, data} = response;
            if(isAuthenticated){
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', data.name);
                document.location.href = `./profile.html?user=${data.name}`;
            } else {
                console.log(data)
                const {errors} = data;
                errors.forEach(error =>{
                    const errorMessage = document.createElement('li');
                    errorMessage.classList.add('list-group-item', 'list-group-item-danger');
                    errorMessage.textContent = error.message;
                    signInFeedback.append(errorMessage);
                })
            }
        })

    })

    signupCloseButton.addEventListener("click", ()=>{
        document.querySelector('#signup-form').reset();
    })
    
}

main();