const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const profileNameError = document.getElementById("profileNameError");
const profileEmailError = document.getElementById("profileEmailError");
const profileMessage = document.getElementById("profileMessage");

const logoutBtn = document.getElementById("logoutBtn");

window.onload = function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        profileName.value = currentUser.name;
        profileEmail.value = currentUser.email;
    } else {
        profileMessage.style.color = "red";
        profileMessage.textContent = "No user logged in.";
    }
};

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    profileNameError.textContent = "";
    profileEmailError.textContent = "";
    profileMessage.textContent = "";

    let name = profileName.value.trim();
    let email = profileEmail.value.trim();

    let valid = true;

    if (name === "") {
        profileNameError.textContent = "Please enter your name.";
        valid = false;
    }

    if (email === "") {
        profileEmailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!email.includes("@")) {
        profileEmailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (!valid) return;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        profileMessage.style.color = "red";
        profileMessage.textContent = "No user logged in.";
        return;
    }

    currentUser.name = name;
    currentUser.email = email;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(function (user) {
        if (user.email === currentUser.email) {
            return {
                ...user,
                name: name,
                email: email
            };
        }
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));

    profileMessage.style.color = "green";
    profileMessage.textContent = "Profile updated successfully!";
});

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});