const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-item");
const noResultMessage = document.getElementById("noResultMessage");

let currentCategory = "all";

function filterProducts() {
    let visibleCount = 0;

    products.forEach(function (product) {
        const category = product.getAttribute("data-category");

        if (currentCategory === "all" || category === currentCategory) {
            product.classList.remove("d-none");
            visibleCount++;
        } else {
            product.classList.add("d-none");
        }
    });

    if (visibleCount === 0) {
        noResultMessage.classList.remove("d-none");
    } else {
        noResultMessage.classList.add("d-none");
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
            btn.classList.remove("btn-dark");
            btn.classList.add("btn-outline-dark");
        });

        this.classList.add("active");
        this.classList.add("btn-dark");
        this.classList.remove("btn-outline-dark");

        currentCategory = this.getAttribute("data-category");
        filterProducts();
    });
});

filterProducts();