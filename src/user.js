/*
async function asyncCall() {
    const form = {
        email: document.getElementById(user),
        password: document.getElementById(password),
    };
    console.log(form);
    //POST request with body equal on data in JSON format
    fetch('http://localhost:3011/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        })

            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
                console.log('Success:', data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error('Error:', error);
            })
    })
}

*/