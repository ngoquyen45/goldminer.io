const token = localStorage.getItem('token');
async function verify() {
  try {
    if (token) {
      const header = {
        Authorization: `Bearer ${token}`
      };
      const response = await getData('http://localhost:3000/api/verify', header);
      if (response.code == 200) {
        window.location.pathname = "/game";
      }
      else {
        setupLogin();
      }
    }
    else {
      setupLogin();
    }
  } catch (error) {
  
  }
}

(
  async () => {
    await verify()
  }
)();

function setupLogin() {
  // Get a reference to the login form element
  const loginForm = document.querySelector('#login-form');

  // Add an event listener for the form submission event
  loginForm.addEventListener('submit', async function(event) {    
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    const formData = new FormData(loginForm);
    const body = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    console.log(body)
    
    try {
      const response = await postData('http://localhost:3000/api/login', body);
      console.log(JSON.stringify(response));
      if (response.code == 200) {
        // Save token to cookie
        localStorage.setItem('token', response.token);
        window.location.pathname = "/game";
      }
      else {
        console.log("fail!");
      }
    } catch (error) {

    }
  });
}