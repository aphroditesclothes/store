let carBtn = document.querySelectorAll('.cart');
let nf = new Intl.NumberFormat('en-US');

let products = [
    {
        image: '../img/products/person3.jpg',
        title: "Tie Front Waffle Knit Cardigan",
        price: 410,
        inCart: 0
    },
    {
        image: '../img/products/person4.jpg',
        title: "Angulu V - Neck Pullover",
        price: 180,
        inCart: 0
    },
    {
        image: '../img/products/person1.jpg',
        title: "Cropped Grey Blazer - High Waist Mini SKirt",
        price: 420,
        inCart: 0
    },
    {
        image: '../img/products/sweater1.jpg',
        title: "Cut and Sew Pullover",
        price: 170,
        inCart: 0
    },
    {
        image: '../img/products/sweater2.jpg',
        title: "Color Block Jumper Sweater",
        price: 185,
        inCart: 0
    },
    {
        image: '../img/products/sweater3.jpg',
        title: "Constrast Collar Knit 2 In 1 Blouse",
        price: 193,
        inCart: 0
    },
    {
        image: '../img/products/sweater4.jpg',
        title: "Casual Round Neck Sweatshirt",
        price: 180,
        inCart: 0
    },
    {
        image: '../img/products/hoodie1.jpg',
        title: "Color Block Hoodie",
        price: 165,
        inCart: 0
    },
    {
        image: '../img/products/hoodie2.jpg',
        title: "Rainbow Cropped Hoodie",
        price: 160,
        inCart: 0
    },
    {
        image: '../img/products/hoodie3.jpg',
        title: "Multi Colored Hoodie",
        price: 270,
        inCart: 0
    },
    {
        image: '../img/products/dress3.jpg',
        title: "Contrast Collar 2 In 1 Pullover",
        price: 170,
        inCart: 0
    },
    {
        image: '../img/products/pants1.jpg',
        title: "High - Waisted Cargo Pants",
        price: 250,
        inCart: 0
    },
    {
        image: '../img/products/pants2.jpg',
        title: "High - Waisted Denim Shorts",
        price: 175,
        inCart: 0
    },
    {
        image: '../img/products/pants3.jpg',
        title: "Wide - Leg Light Brown Pants",
        price: 280,
        inCart: 0
    },
    {
        image: '../img/products/overalls.jpg',
        title: "Pink Denim Overalls",
        price: 290,
        inCart: 0
    },
    {
        image: '../img/products/skirt1.jpg',
        title: "Checkered Skirt",
        price: 250,
        inCart: 0
    },
    {
        image: '../img/products/skirt2.jpg',
        title: "Denim Skirt",
        price: 260,
        inCart: 0
    },
    {
        image: '../img/products/top1.jpg',
        title: "Daisy Crop Top",
        price: 258,
        inCart: 0
    },
    {
        image: '../img/products/suit1.jpg',
        title: "Floral Jumpsuit",
        price: 487,
        inCart: 0
    },
    {
        image: '../img/products/dress1.jpg',
        title: "Royal Blue Dress",
        price: 1100,
        inCart: 0
    },
    {
        image: '../img/products/dress2.jpg',
        title: "Shirty Gray Vintage Dress",
        price: 1250,
        inCart: 0
    },
    {
        image: '../img/products/coat1.jpg',
        title: "Gucci Coat",
        price: 1500,
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
        localStorage.setItem('totalCost', productCost.price);
    }
}

const display = () => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.cart-content');
    let checkoutContainer = document.querySelector('.total-table');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-box">
                <img src="${item.image}" alt="">
                <div class="cart-product-details">
                    <div class="product-title">${item.title}</div>
                    <div class="product-price">${item.price}.000 VND</div>
                    <input type="number" value="${item.inCart}" class="quantity">
                </div>

                <i class="fa-solid fa-trash product-remove"></i>

            </div>
            `;
        })
        checkoutContainer.innerHTML = `
        <tr>
            <td>Cart Subtotals</td>
            <td class="subtotal">${nf.format(cartCost)},000 VND</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>Free</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td class="total-price"><strong>${nf.format(cartCost)},000 VND</strong></td>
        </tr>
        `;
    }
}

display();

window.onbeforeunload = function (e) {

    window.localStorage.unloadTime = JSON.stringify(new Date());
    
};

window.onload = function () {
    let loadTime = new Date();
    let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
    let refreshTime = loadTime.getTime() - unloadTime.getTime();

    if(refreshTime > 10000)//3000 milliseconds
    {
        window.localStorage.clear();
    }
}