function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        user = document.getElementById("user");
        pass = document.getElementById("password");
        console.log(user.value, pass.value);
        async function fetchLogin() {
            console.log("Dentro de Fetch")

            const response = await fetch('http://localhost:3011/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.value,
                    password: pass.value
                })
            });
            console.log("Despues de Fetch")
            const data = await response.json();
            console.log(data);
        }
        //fetchLogin();
        window.location.href = "movies.html";
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });



    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        user = document.getElementById("signupUsername");
        pass = document.getElementById("passwordReg");
        console.log(user.value, pass.value);
        async function fetchRegister() {
            console.log("Dentro de Fetch")

            const response = await fetch('http://localhost:3011/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.value,
                    password: pass.value
                })
            });
            console.log("Despues de Fetch")
            const data = await response.json();
            console.log(data);
        }
        fetchRegister();
        setFormMessage(createAccountForm, "error", "Invalid username/password combination");
    });




    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});



async function myFunction1() {
    console.log("Dentro de Fetch")
    const response = await fetch('http://localhost:3000/movies/');
    const data = await response.json();
    console.log(data);
    let fh = '';
    data.forEach(e => fh += template(e))
    $('#myID').html(fh)
}


async function myFunction2() {
    console.log("Dentro de Fetch")
    const response = await fetch('http://localhost:3000/movies/2');
    const data = await response.json();
    console.log(data);
    $('#myID').html(template(data))
}
/*
async function myFunction3(){
    console.log("Dentro de Fetch")
    const response = await fetch('http://localhost:3000/movies/add');
    const data =  await response.json();
    console.log(data);
    $('#myID').html(template(data))


    console.log("Dentro de Fetch")
    
    const response = await fetch('http://localhost:3000/movies/add',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id.value,
                title: title.value,
                genres: genres.value,
                actors: actors.value,
                year: year.value,
                director: director.value
            })
        });
        console.log("Despues de Fetch")
        const data =  await response.json();
        console.log(data);
}*/

async function myFunction3() {
    console.log("Dentro de Fetch")
    const newMov = {
        "id": 10,
        "title": "Dances with Wolves",
        "genres": [
            "Adventure", "Western ", "Drama"
        ],
        "year": 1990,
        "director": "Kevin Costner",
        "actors": [
            "Kevin Costner",
            "Mary McDonnell",
            "Graham Greene",
            "Rodney A. Grant"
        ]
    }
    const response = await fetch('http://localhost:3000/movies/add', {
        method: 'PUT',
        body: JSON.stringify(newMov), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    const data = await response.json();
    console.log(data);
    let fh = '';
    data.forEach(e => fh += template(e))
    $('#myID').html(fh)
    //console.log(data);
    //$('#myID').html(template(data))
}


async function myFunction4() {
    console.log("Dentro de Fetch")
    const response = await fetch('http://localhost:3000/movies/1', {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
    let fh = '';
    data.forEach(e => fh += template(e))
    $('#myID').html(fh)
}

async function myFunction5() {
    console.log("Dentro de Fetch")
    const upMov = {
        "id": 3,
        "title": "El padrino parte 8080",
        "genres": [
            "Crime", "Drama"
        ],
        "year": 1994,
        "director": "Frank Darabont",
        "actors": [
            "Tim Robbins",
            "Ricard el profe",
            "Bob Gunton",
            "William Sadler",
            "Clancy Brown",
            "Gil Bellows"
        ]
    }
    const response = await fetch('http://localhost:3000/movies/update', {
        method: 'PUT',
        body: JSON.stringify(upMov), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    const data = await response.json();
    console.log(data);
    let fh = '';
    data.forEach(e => fh += template(e))
    $('#myID').html(fh)
}


function template(data) {
    return `ID ${data.id} <br> 
    Title: ${data.title} <br> 
    Generes ${data.genres} <br>
    Director: ${data.director} <br> 
    Actors ${data.actors} <br>
    Year ${data.year} <br>
    Director ${data.director} <br>`;
}

