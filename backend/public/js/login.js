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
    const response = await postData('/login', body);
    console.log(JSON.stringify(response));
    if (response.code == 200) {
      // Save token to cookie
      token = 'my-token-value';
      document.cookie = `token=${token}; Secure; SameSite=Strict; HttpOnly`;
      // window.location.pathname = "/game";
    }
    else {
      console.log("fail!");
    }
  } catch (error) {

  }
});
  

// APIs
async function postData(url, data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}