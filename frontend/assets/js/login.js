// Get a reference to the login form element
const loginForm = document.querySelector('#login-form');

// Add an event listener for the form submission event
loginForm.addEventListener('submit', function(event) {
    alert("Hello baby");
    
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the form data
    const formData = new FormData(loginForm);
  
    // Create a new XHR object
    const xhr = new XMLHttpRequest();
  
    // Set the request method and URL
    xhr.open('POST', '/login');
  
    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    // Define a callback function to handle the response
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle a successful response
        console.log(xhr.responseText);
      } else {
        // Handle an error response
        console.error('Error: ' + xhr.statusText);
      }
    };
  
    // Send the form data
    xhr.send(formData);
  });