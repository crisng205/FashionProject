const promoTitle = document.getElementById("promoTitle");

const titles = [
    "Welcome to Thanh Shop",
    "Summer Sale Up to 50% Off",
    "Discover Your Perfect Style"
];

let currentIndex = 0;

function changeTitle() {
    promoTitle.classList.add("fade-out");

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        promoTitle.textContent = titles[currentIndex];
        promoTitle.classList.remove("fade-out");
    }, 500);
}

setInterval(changeTitle, 3000);

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll("#productGrid .product-link");
const productGrid = document.getElementById("productGrid");

filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const selectedCategory = this.getAttribute("data-category").trim().toLowerCase();

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        products.forEach((product) => {
            const productCategory = product.getAttribute("data-category").trim().toLowerCase();

            if (selectedCategory === "all" || productCategory === selectedCategory) {
                product.classList.remove("hidden");
            } else {
                product.classList.add("hidden");
            }
        });

        productGrid.scrollLeft = 0;
    });
});