const API_BASE_URL = 'https://api.noroff.dev';

const userLogin = {
    email: 'nor@noroff.no',
    password: 'my-password',
  };
  
  async function loginUser(url, data) {
    try {
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      console.log(response);
      const json = await response.json();
      const accessToken = json.accessToken;
      localStorage.setItem('accessToken', accessToken);
      console.log(json);
      // Logs:
      // accessToken: "eyJhbGciOiJIuzI1NiIsInR...
      // avatar: ""
      // email: "test-account-a@noroff.no
      // name: "test_account_a"
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  
  loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);