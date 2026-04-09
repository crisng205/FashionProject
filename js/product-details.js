const productsData = [
    {
        id: 1,
        name: "Elegant Black Dress",
        price: 100,
        image: "image/1.jpg",
        description: "A timeless elegant black dress designed for formal events and special occasions. It offers a sleek silhouette, premium fabric, and a refined modern look."
    },
    {
        id: 2,
        name: "Casual Grey Hoodie Dress",
        price: 200,
        image: "image/2.jpg",
        description: "A comfortable and stylish hoodie dress perfect for casual outings. Soft material and relaxed fit make it an effortless everyday fashion choice."
    },
    {
        id: 3,
        name: "Classic White Top",
        price: 250,
        image: "image/3.jpg",
        description: "A classic white top that pairs easily with jeans, skirts, or trousers. Its minimal design makes it a wardrobe essential."
    },
    {
        id: 4,
        name: "Soft Grey Pants",
        price: 150,
        image: "image/9.JPG",
        description: "Soft grey pants with a clean and comfortable cut. Suitable for both work and casual wear."
    },
    {
        id: 5,
        name: "Chic Off-Shoulder Top",
        price: 175,
        image: "image/5.JPG",
        description: "A chic off-shoulder top that adds elegance and charm to your outfit. Great for parties, dinners, and stylish everyday looks."
    },
    {
        id: 6,
        name: "Mini Black Summer Dress",
        price: 200,
        image: "image/6.jpg",
        description: "A light and fashionable mini black summer dress perfect for warm weather. Simple, modern, and easy to style."
    },
    {
        id: 7,
        name: "Classic Leather Jacket",
        price: 280,
        image: "image/7.jpg",
        description: "A classic leather jacket with a bold and timeless appeal. Perfect for layering and adding attitude to your style."
    },
    {
        id: 8,
        name: "Wide Leg Trousers",
        price: 190,
        image: "image/8.JPG",
        description: "Wide leg trousers with a modern silhouette and relaxed fit. Comfortable and fashionable for many occasions."
    },
    {
        id: 9,
        name: "Minimal Beige Shirt",
        price: 160,
        image: "image/10.JPG",
        description: "A minimal beige shirt that delivers a clean and sophisticated look. Ideal for a smart casual wardrobe."
    },
    {
        id: 10,
        name: "Floral Midi Dress",
        price: 210,
        image: "image/1.jpg",
        description: "A feminine floral midi dress with graceful style and soft details. A lovely option for daytime events or weekend outings."
    },
    {
        id: 11,
        name: "Denim Cropped Jacket",
        price: 230,
        image: "image/4.JPG",
        description: "A trendy denim cropped jacket that works well with dresses, tops, and high-waisted pants. Stylish and versatile."
    }
];

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const addToCartBtn = document.getElementById("addToCartBtn");
const cartMessage = document.getElementById("cartMessage");

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const selectedProduct = productsData.find(product => product.id === productId);

if (selectedProduct) {
    productImage.src = selectedProduct.image;
    productImage.alt = selectedProduct.name;
    productName.textContent = selectedProduct.name;
    productPrice.textContent = `$${selectedProduct.price.toFixed(2)}`;
    productDescription.textContent = selectedProduct.description;
    updateTotalPrice();
} else {
    document.getElementById("productDetailsContainer").innerHTML = `
        <div class="col-12 text-center">
            <h2>Product not found.</h2>
            <a href="products.html" class="btn btn-dark mt-3">Back to Products</a>
        </div>
    `;
}

function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value) || 1;
    const total = selectedProduct.price * quantity;
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

quantityInput.addEventListener("input", function () {
    if (this.value < 1 || this.value === "") {
        this.value = 1;
    }
    updateTotalPrice();
});

addToCartBtn.addEventListener("click", function () {
    const quantity = parseInt(quantityInput.value) || 1;

    const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: quantity,
        total: selectedProduct.price * quantity
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartMessage.textContent = "Item added to cart successfully!";
});