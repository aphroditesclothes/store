let carBtn = document.querySelectorAll('.cart');

let products = [
    {
        image: '../img/products/sweater1.jpg',
        title: "Cut and Sew Pullover",
        price: '170.000',
        inCart: 0
    },
    {
        image: '../img/products/sweater2.jpg',
        title: "Color Block Jumper Sweater",
        price: '185.000',
        inCart: 0
    },
    {
        image: '../img/products/sweater3.jpg',
        title: "Constrast Collar Knit 2 In 1 Blouse",
        price: '193.000',
        inCart: 0
    },
    {
        image: '../img/products/sweater4.jpg',
        title: "Casual Round Neck Sweatshirt",
        price: '180.000',
        inCart: 0
    },
    {
        image: '../img/products/hoodie1.jpg',
        title: "Color Block Hoodie",
        price: '165.000',
        inCart: 0
    }
];

for (let i=0; i < carBtn.length; i++){
    carBtn[i].addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('clicked');
        cartNu(products[i]);
        totalCost(products[i]);
    })
}

const cartNu = (product) => {
    let productNu = localStorage.getItem('cartNu');
    productNu = parseInt(productNu);

    if (productNu){
        localStorage.setItem('cartNu', productNu + 1);
    }
    else{
        localStorage.setItem('cartNu', 1);
    }

    setItems(product)
}

let setItems = (product) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[product.title] == undefined){
            cartItems = {
                ...cartItems,
                [product.title]: product
            }
        }
        cartItems[product.title].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.title]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

const totalCost = (productCost) => {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + productCost.price);
    }
    else{
        localStorage.setItem('itemCost', productCost.price);
    }
}

const display = () => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.cartshop');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <h1>your cart</h1>
            <div class="cart-content">
                <div class="cart-content">
                    <div class="cart-box">
                        <img src="${item.image}" alt="">
                        <div class="cart-product-details">
                            <div class="product-title">${item.title}</div>
                            <div class="product-price">${item.price}</div>
                            <input type="number" value="${item.inCart}" class="quantity">
                        </div>

                        <i class="fa-solid fa-trash product-remove"></i>

                    </div>
                </div>
            </div>
            `;
        })
    }
}

display();