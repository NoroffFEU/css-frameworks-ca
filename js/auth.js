const apiBaseURL = "https://api.noroff.dev/api/v1";
const apiRegister = "https://api.noroff.dev/api/v1/social/auth/register";
const apiLogin = "https://api.noroff.dev/api/v1/social/auth/login";

async function registerUser(name, email, password) {
    try {
      const response = await fetch(`${apiRegister}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  
  async function loginUser(email, password) {
    try {
      const response = await fetch(`${apiLogin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  async function fetchProtectedData(endpoint) {
    try {
      const token = localStorage.getItem('accessToken');
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await fetch(`${apiBaseURL}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }
  
  registerUser('Ramtin_Mosh', 'rammos68620@stud.noroff.no', 'UzI1NiIsInR5cCI')
  .then(data => console.log(data))
  .catch(error => console.error(error));

  