document.addEventListener("DOMContentLoaded", () => {

    const showCart = document.querySelector(".show_cart");
    const totalPrice = document.querySelector(".total_price span");
    const addToCart = document.querySelectorAll(".addToCart");

    let cartTotalPrice = 0;
    let Products = JSON.parse(localStorage.getItem("Products")) || [];
    Products.forEach((Product) => displayDataFromLocalStorage(Product));

    function productDetails() {

        addToCart.forEach((btn) => {
            btn.addEventListener("click", () => {
                const price = btn.previousElementSibling.textContent;
                const li = btn.parentElement.innerText;

                const NameOfProduct = li.substring(0, 10);

                const Product = {
                    "product_name": NameOfProduct,
                    "price": price
                }

                Products.push(Product);
                displayDataFromLocalStorage(Product)
                addInLocalStorage();
                // displayCart(price, NameOfProduct);
            })
        })

    }

    productDetails()

    // Only display the data but after reload the data will removed so, i store data in local storage
    // function displayCart(price, NameOfProduct) {
    //     let priceInNumber = Number.parseInt(price)

    //     cartTotalPrice += priceInNumber;

    //     const li = document.createElement("li")

    //     li.innerHTML = `
    //             <li>${NameOfProduct} - $${price}</li>
    //     `
    //     showCart.appendChild(li)

    //     showTotalPrice(cartTotalPrice)

    // };

    function showTotalPrice(cartTotalPrice) {
        totalPrice.textContent = `Total : $${cartTotalPrice}`;
    }

    function addInLocalStorage() {
        localStorage.setItem("Products", JSON.stringify(Products));
    }


    function displayDataFromLocalStorage(Product) {

        const li = document.createElement("li")

        li.innerHTML = `
                <li>${Product.product_name} - $${Product.price}</li>
        `
        showCart.appendChild(li)

        cartTotalPrice += Number.parseInt(Product.price);

        showTotalPrice(cartTotalPrice);
    }

})
