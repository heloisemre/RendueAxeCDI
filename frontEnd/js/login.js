const email = document.getElementById('email'); // get the email input field
const password = document.getElementById('password'); // get the password input field

window.onload = function() { // when the page loads get the email from local storage and set it to the email input field
    email.value = localStorage.getItem('email');
}

email.addEventListener('keyup', function() { // when the user types in the email input field, save the email to local storage
    localStorage.setItem('email', email.value);
});

const form = document.querySelector('form'); // get the form element

form.addEventListener('submit', function(event) { // when the form is submitted
    event.preventDefault(); // prevent the form from submitting

    let data = { // create an object with the data to send to the server
        email: email.value,
        password: password.value
    };

    fetch('http://localhost:3000/login', { // send a POST request to the server
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { 
        if (data.message) { // if there is an error, display the error message
            alert(data.message);
        } else {
            localStorage.setItem('token', data.token); // save the token to local storage
            window.location.href = 'index.html'; // redirect to the home page
        }
    })

});


