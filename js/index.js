const productGrid = document.getElementById('productGrid');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.addEventListener('click', function () {
    const card = productGrid.querySelector('.product-card');
    productGrid.scrollLeft += card.offsetWidth + 20;
});

prevBtn.addEventListener('click', function () {
    const card = productGrid.querySelector('.product-card');
    productGrid.scrollLeft -= card.offsetWidth + 20;
});