const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");

const contactNameError = document.getElementById("contactNameError");
const contactEmailError = document.getElementById("contactEmailError");
const contactMessageError = document.getElementById("contactMessageError");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    contactNameError.textContent = "";
    contactEmailError.textContent = "";
    contactMessageError.textContent = "";
    contactSuccess.textContent = "";

    contactName.classList.remove("error-input");
    contactEmail.classList.remove("error-input");
    contactMessage.classList.remove("error-input");

    let name = contactName.value.trim();
    let email = contactEmail.value.trim();
    let message = contactMessage.value.trim();

    let valid = true;

    if (name === "") {
        contactNameError.textContent = "Please enter your name.";
        contactName.classList.add("error-input");
        valid = false;
    }

    if (email === "") {
        contactEmailError.textContent = "Please enter your email.";
        contactEmail.classList.add("error-input");
        valid = false;
    } else if (!email.includes("@")) {
        contactEmailError.textContent = "Please enter a valid email.";
        contactEmail.classList.add("error-input");
        valid = false;
    }

    if (message === "") {
        contactMessageError.textContent = "Please enter your message.";
        contactMessage.classList.add("error-input");
        valid = false;
    }

    if (!valid) return;

    contactSuccess.style.color = "green";
    contactSuccess.textContent = "Your message has been sent successfully!";

    contactForm.reset();
});