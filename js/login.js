function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let emailError = document.getElementById("loginEmailError");
    let passwordError = document.getElementById("loginPasswordError");
    let message = document.getElementById("loginMessage");

    emailError.textContent = "";
    passwordError.textContent = "";
    message.textContent = "";

    if (email === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Please fill in all fields.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!foundUser) {
        message.style.color = "red";
        message.textContent = "Invalid email or password.";
        return;
    }

    let currentUser = {
        name: foundUser.name,
        email: foundUser.email
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    message.style.color = "green";
    message.textContent = "Login successful!";

    document.getElementById("loginForm").reset();
}
    
document.getElementById("loginForm").addEventListener("submit", loginUser);