const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart">Your cart is empty.</div>`;
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Item Total: $${itemTotal.toFixed(2)}</p>
                </div>

                <div class="cart-item-actions">
                    <label>Quantity:</label>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);

    if (isNaN(newQuantity) || newQuantity < 1) {
        return;
    }

    cart[index].quantity = newQuantity;
    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

renderCart();