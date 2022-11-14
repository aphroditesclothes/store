let cart = document.querySelectorAll('.cart');

let products = [
    {
        name: "Cut and Sew Pullover",
        tag: "10121",
        price: "170.000 VND",
        inCart: 0
    },
    {
        name: "Color Block Jumper Sweater",
        tag: "10115",
        price: "185.000 VND",
        inCart: 0
    },
    {
        name: "Constrast Collar Knit 2 In 1 Blouse",
        tag: "10885",
        price: "193.000 VND",
        inCart: 0
    }
];

for (var i=0; i < cart.length; i++){
    cart[i].addEventListener('click', () => {
        cartnumbers(products[i]);
    })
}

function cartnumbers(product){
    var setproducts = localStorage.getItem('cartnumbers');

    setproducts = parseInt(setproducts);
    localStorage.setItem('cartnumbers', 1);

    setItems(product);
}

function setItems(product){
    product.inCart = 1;
    
    var cartItems = {
        [product.name]: product
    }

    localStorage.setItem("productsIncart", cartItems);
}