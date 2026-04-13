function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    let nameError = document.getElementById("registerNameError");
    let emailError = document.getElementById("registerEmailError");
    let passwordError = document.getElementById("registerPasswordError");
    let confirmError = document.getElementById("confirmPasswordError");
    let message = document.getElementById("registerMessage");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    message.textContent = "";

    if (name === "" || email === "" || password === "" || confirm === "") {
        message.style.color = "red";
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (password !== confirm) {
        confirmError.textContent = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(function (user) {
        return user.email === email;
    });

    if (existingUser) {
        emailError.textContent = "Email already exists.";
        return;
    }

    let newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "Register successful!";

    document.getElementById("registerForm").reset();
}

document.getElementById("registerForm").addEventListener("submit", registerUser);