
document.addEventListener("DOMContentLoaded", () => {

    const showCart = document.querySelector(".show_cart");
    const totalPrice = document.querySelector(".total_price span");
    const addToCart = document.querySelectorAll(".addToCart");

    let Products = JSON.parse(localStorage.getItem("Products")) || [];
    // Products display 
    Products.forEach((Product) => displayDataFromLocalStorage(Product));

    function productDetails() {

        addToCart.forEach((btn) => {
            btn.addEventListener("click", () => {
                const price = btn.previousElementSibling.textContent;
                const li = btn.parentElement.innerText;

                const NameOfProduct = li.substring(0, 10);

                const Product = {
                    "id": Date.now(),
                    "product_name": NameOfProduct.trim(),
                    "price": price
                }

                if (Products) {
                    let productExists = Products.some(prod => prod.product_name === Product.product_name);

                    if (!productExists) {
                        Products.push(Product); // Add product only if it doesn't exist
                        addInLocalStorage();
                        displayDataFromLocalStorage(Product)
                        showTotalPrice();
                    }
                }


                // displayCart(price, NameOfProduct);
            })
        })


    }

    productDetails()

    // This function only display the products in web page if you reload the browser then the products will remove.
    // so, I stored the data in local storage
    
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
        li.setAttribute('data-id', Product.id)
        li.innerHTML = `
                <li >${Product.product_name} - $${Product.price}</li>
                <button class="remove">X</button>
        `

        document.querySelector(".cart-empty").classList.add("hidden");
        showCart.appendChild(li)

        const removeButton = li.querySelector(".remove"); removeButton.addEventListener("click", () => {
            removeDataFromLocalStorageAndUpdate(removeButton);
        })

    }

    function removeDataFromLocalStorageAndUpdate(btn) {

        const removeParentElement = btn.parentElement;

        let numberDataId = Number.parseInt(removeParentElement.getAttribute("data-id"));

        Products = Products.filter(Product => Product.id !== numberDataId);

        removeParentElement.remove();

        addInLocalStorage()

        const storedProduct = JSON.parse(localStorage.getItem("Products"));

        showTotalPrice()

        if (storedProduct.length === 0) {
            document.querySelector(".cart-empty").classList.remove("hidden");
        }
    }

})
