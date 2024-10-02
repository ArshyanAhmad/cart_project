
document.addEventListener("DOMContentLoaded", () => {

    const showCart = document.querySelector(".show_cart");
    const totalPrice = document.querySelector(".total_price span");
    const addToCart = document.querySelectorAll(".addToCart");

    let Products = JSON.parse(localStorage.getItem("Products")) || [];
    Products.forEach((Product) => displayDataFromLocalStorage(Product));

    function productDetails() {

        addToCart.forEach((btn) => {
            btn.addEventListener("click", () => {
                const price = btn.previousElementSibling.textContent;
                const li = btn.parentElement.innerText;

                const NameOfProduct = li.substring(0, 10);

                const Product = {
                    "product_name": NameOfProduct.trim(),
                    "price": price
                }

                
                Products.push(Product);

                displayDataFromLocalStorage(Product)
                showTotalPrice();
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

    function showTotalPrice() {
        let cartTotalPrice = 0;
        Products.forEach((Product) => {
            cartTotalPrice += Number.parseInt(Product.price);
        })
        totalPrice.textContent = `Total : $${cartTotalPrice}`;
        console.log("Total Price: ", cartTotalPrice);

    }

    function addInLocalStorage() {
        localStorage.setItem("Products", JSON.stringify(Products));
    }


    function displayDataFromLocalStorage(Product) {

        const li = document.createElement("li")
        li.innerHTML = `
                <li>${Product.product_name} - $${Product.price}</li>
                <button class="remove">X</button>
        `
        showCart.appendChild(li)

        const removeButton = li.querySelector(".remove"); removeButton.addEventListener("click", (e) => {
            removeDataFromLocalStorageAndUpdate(removeButton, e);
        })

    }

    function removeDataFromLocalStorageAndUpdate(btn, e) {
        console.log(e); // check target
        
        const removeParentElement = btn.parentElement;
        const liElemText = btn.parentElement.textContent.trim();
        const trimliElemText = liElemText.substring(0, 10).trim();

        Products = Products.filter(Product => Product.product_name !== trimliElemText);

        removeParentElement.remove();
        addInLocalStorage()
        showTotalPrice()
    }

})
