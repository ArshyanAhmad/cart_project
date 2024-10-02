const productsPrice = document.querySelectorAll(".product-list li span");
const showCart = document.querySelector(".show_cart");
const totalPrice = document.querySelector(".total_price span");
const addToCart = document.querySelectorAll(".addToCart");
const Checkout = document.getElementById("checkout");

let cartTotalPrice = 0;

function productDetails() {

    addToCart.forEach((btn) => {
        btn.addEventListener("click", () => {
            const price = btn.previousElementSibling.textContent;
            const li = btn.parentElement.innerText;

            const NameOfProduct = li.substring(0, 10);

            displayCart(price, NameOfProduct);
        })
    })

}

productDetails()

function displayCart(price, NameOfProduct) {
    let priceInNumber = Number.parseInt(price)

    cartTotalPrice += priceInNumber;

    const li = document.createElement("li")

    li.innerHTML = `
            <li>${NameOfProduct} - $${price}</li>
    `
    showCart.appendChild(li)

    showTotalPrice(cartTotalPrice)

};

function showTotalPrice(cartTotalPrice){
    totalPrice.textContent = `Total : $${cartTotalPrice}`;
}


