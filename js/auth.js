const API_BASE_URL = 'https://api.noroff.dev/api/v1';

async function registerUser(name, email, password, avatar, banner) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
          banner,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      console.log('User registered successfully:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function loginUser(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('User logged in successfully:', data);
  
      // Store the access token in localStorage
      localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function getAuthHeader() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  
  


  
  