const loginNav = document.getElementById("loginNav");
const profileNav = document.getElementById("profileNav");

function updateNavbar() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        if (loginNav) {
            loginNav.style.display = "none";
        }

        if (profileNav) {
            profileNav.style.display = "list-item";
        }
    } else {
        if (loginNav) {
            loginNav.style.display = "list-item";
        }

        if (profileNav) {
            profileNav.style.display = "none";
        }
    }
}

updateNavbar();