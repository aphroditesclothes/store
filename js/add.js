let cart = document.querySelectorAll('.cart');

for (let i=0; i < cart.length; i++){
    cart[i].addEventListener('click', () => {
        cartnumbers();
    })
}

function cartnumbers(){
    var products = localStorage.getItem('cartnumbers');

    products = parseInt(products);
    localStorage.setItem('cartnumbers', 1);
}