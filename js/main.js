// 

//--------- Håndtering innloggingsskjema -------

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Form Submitted");

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!validateEmail(email)) {
                document.getElementById('emailError').innerText = 'Please type in your valid noroff email';
                return;
            }

            await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, { email, password });
        })
    }

});




//eller: 




document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Forhindrer standard skjemainnsendelse
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginUser('https://api.noroff.dev/api/v1/social/auth/login', { email, password });
});







//---------------- Sende bruker videre til registrering -------


document.getElementById('signupButton').addEventListener('click', function() {
    window.location.href = 'html/profile/register/index.html'; 
});
