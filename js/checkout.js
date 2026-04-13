const checkoutForm = document.getElementById("checkoutForm");
const fullName = document.getElementById("fullName");
const addressInput = document.getElementById("address");
const paymentMethod = document.getElementById("paymentMethod");

const orderSummary = document.getElementById("orderSummary");
const orderTotal = document.getElementById("orderTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const confirmationMessage = document.createElement("p");
confirmationMessage.className = "confirmation-message";
checkoutForm.appendChild(confirmationMessage);

function createErrorElement(input) {
    const error = document.createElement("small");
    error.className = "error-text";
    input.parentElement.appendChild(error);
    return error;
}

const nameError = createErrorElement(fullName);
const addressError = createErrorElement(addressInput);
const paymentError = createErrorElement(paymentMethod);

function renderOrderSummary() {
    orderSummary.innerHTML = "";

    if (cart.length === 0) {
        orderSummary.innerHTML = `<p class="empty-order">Your cart is empty.</p>`;
        orderTotal.textContent = "Total: $0.00";
        return;
    }

    let total = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderSummary.innerHTML += `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="summary-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Item Total: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function clearErrors() {
    nameError.textContent = "";
    addressError.textContent = "";
    paymentError.textContent = "";

    fullName.classList.remove("error-input");
    addressInput.classList.remove("error-input");
    paymentMethod.classList.remove("error-input");
}

function validateForm() {
    clearErrors();
    confirmationMessage.textContent = "";

    let isValid = true;

    if (fullName.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
        fullName.classList.add("error-input");
        isValid = false;
    }

    if (addressInput.value.trim() === "") {
        addressError.textContent = "Please enter your address.";
        addressInput.classList.add("error-input");
        isValid = false;
    }

    if (paymentMethod.value === "") {
        paymentError.textContent = "Please select a payment method.";
        paymentMethod.classList.add("error-input");
        isValid = false;
    }

    return isValid;
}

checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        confirmationMessage.style.color = "#d11a2a";
        confirmationMessage.textContent = "Your cart is empty. Please add products before checking out.";
        return;
    }

    if (!validateForm()) {
        return;
    }

    confirmationMessage.style.color = "green";
    confirmationMessage.textContent = `Order placed successfully, ${fullName.value.trim()}!`;

    localStorage.removeItem("cart");
    cart = [];
    renderOrderSummary();
    checkoutForm.reset();
    clearErrors();
});

renderOrderSummary();