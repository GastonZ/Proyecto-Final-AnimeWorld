
document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready()


carritoPrecio = [0]
carritoTitulo = [0]



function ready() {

        loadCart();

        let removeCartItemButtons = document.getElementsByClassName('btn-danger');
        console.log(removeCartItemButtons)
        
        for (let i = 0; i < removeCartItemButtons.length; i++){
            let button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }

        let quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (let i = 0; i < quantityInputs.length; i++) {
            let input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        let addToCartButtons = document.getElementsByClassName('shop-item-button') 
        for (let i = 0; i < addToCartButtons.length; i++) {
            let button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
            
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function loadCart() {

    carritoPrecio = localStorage.getItem("precio")
    carritoTitulo = localStorage.getItem("titulo")

    if (carritoTitulo == null || carritoPrecio == null){
        carritoTitulo = []
        carritoPrecio = []
        return
    }
    carritoPrecio = JSON.parse(carritoPrecio)
    carritoTitulo = JSON.parse(carritoTitulo)

    for (let i = 0; i < carritoTitulo.lenght; i++) {
        addItemToCart(carritoTitulo[i], carritoPrecio[i])
    }
}

function purchaseClicked() {
    Swal.fire({
        title: 'Success!',
        text: 'Thank you for your purchase !',
        icon: 'success',
        confirmButtonText: 'Cool',
        confirmButtonColor: '#333',
      })
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

    localStorage.clear();
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerHTML
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()

    Toastify({

        text: "Item added to the cart",
        style: {
            background: "linear-gradient(45deg, #292929, #1a2f3f)",
          },
        duration: 1000
        
        }).showToast();

        carritoPrecio.push(price)
        carritoTitulo.push(title)

        localStorage.setItem("precio", JSON.stringify(carritoPrecio))
        localStorage.setItem("titulo", JSON.stringify(carritoTitulo))
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerHTML == title){
            Swal.fire({
                title: 'Error!',
                text: 'This item is already added to the cart',
                icon: 'error',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#333',
              })
            return
        }
    }
    let cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100" alt="Konata is cute">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
             </div> `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        let price = parseFloat(priceElement.innerHTML.replace('$',''))
        let quantity = quantityElement.value
        total = total + (price * quantity)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total

} 
