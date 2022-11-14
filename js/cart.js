if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready(){
    var removeButton = document.getElementsByClassName('product-remove')
    console.log(removeButton)

    for (var i = 0; i < removeButton.length; i++){
        var button = removeButton[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('quantity');

    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // var addToCart = document.getElementsByClassName('cart');

    // for (var i = 0; i < addToCart.length; i++){
    //     var button = addToCart[i];
    //     button.addEventListener('click', addToCartClicked);
    // }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input = event.target

    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

// function addToCartClicked(event){
//     var button = event.target;
//     var shopItem = button.parentElement;
//     var title = shopItem.children[1].children[0].innerText;
//     var price = shopItem.children[1].children[2].innerText;
//     var image = shopItem.children[0].src;

//     addItemToCart(image, title, price);
//     updateTotal();
// }

// function addItemToCart(image, title, price){
//     var cartShop = document.createElement('div');
    
//     var cartItems = document.getElementsByClassName('in-container');
// }

function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('product-price')[0]
        var quantityElement = cartBox.getElementsByClassName('quantity')[0]

        var price = parseFloat(priceElement.innerHTML.replace('VND', ''))
        var quantity = quantityElement.value

        total = total + (price * quantity)

    }
    
    document.getElementsByClassName('total-price')[0].innerHTML = total + ".000 VND"
    document.getElementsByClassName('subtotal')[0].innerHTML = total  + ".000 VND"
}