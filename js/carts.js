import { updateCartCount, getCart } from "./carts-utils.js";


const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const emptyCart = document.getElementById("emptyCart");
const cartSection = document.querySelector(".cart-page");

// ==========================
// Display Cart
// ==========================

function displayCart() {

    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    // Empty cart
    if (cart.length === 0) {

        cartSection.style.display = "none";
        emptyCart.style.display = "flex";

        return;
    }

    cartSection.style.display = "grid";
    emptyCart.style.display = "none";

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        cartItemsContainer.innerHTML += `
            <article class="cart-item">

    <div class="item-info">

        <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="item-details">

            <div class="item-top">

                <div>
                    <h3>${item.name}</h3>
                    <div class="item-description">
                        <p>${item.description}</p>
                        <button class="read-more-btn">
                            Read more
                        </button>
                    </div>
                </div>

                <button class="remove-btn" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                    Remove
                </button>

            </div>

        </div>

    </div>

    <div class="item-meta">

        <div class="item-price">
            <span>Price</span>
            <strong>₦${item.price.toLocaleString()}</strong>
        </div>

        <div class="quantity">

            <span>Quantity</span>

            <div class="quantity-controls">
                <button class="minus" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="plus" data-id="${item.id}">+</button>
            </div>

        </div>

        <div class="item-total">
            <span>Total</span>
            <strong>₦${(item.price * item.quantity).toLocaleString()}</strong>
        </div>

    </div>

</article>
`;

    });

    updateSummary(cart);
    // ==========================
    // Read More
    // ==========================

    document.querySelectorAll(".item-description").forEach(description => {

        const paragraph = description.querySelector("p");
        const button = description.querySelector(".read-more-btn");

        // Hide button if description fits within 2 lines
        if (paragraph.scrollHeight <= paragraph.clientHeight) {
            button.style.display = "none";
        }

        button.addEventListener("click", () => {

            description.classList.toggle("expanded");

            if (description.classList.contains("expanded")) {
                button.textContent = "Show less";
            } else {
                button.textContent = "Read more";
            }

        });

    });

}
// ==========================
// Update Summary
// ==========================

function updateSummary(cart) {

    const subtotal = cart.reduce((total, item) => {

        return total + (item.price * item.quantity);

    }, 0);

    subtotalElement.textContent = `₦${subtotal.toLocaleString()}`;

    // For now Total = Subtotal
    totalElement.textContent = `₦${subtotal.toLocaleString()}`;

}
function increaseQuantity(id) {

    const cart = getCart();

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

displayCart();

}
function decreaseQuantity(id) {

    const cart = getCart();

    const item = cart.find(item => item.id === id);

    if (item && item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

displayCart();

}
function removeItem(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}

// ==========================
// Cart Events
// ==========================

cartItemsContainer.addEventListener("click", (e) => {

    if (e.target.closest(".plus")) {

        increaseQuantity(
            Number(e.target.closest(".plus").dataset.id)
        );

    }

    if (e.target.closest(".minus")) {

        decreaseQuantity(
            Number(e.target.closest(".minus").dataset.id)
        );

    }

    if (e.target.closest(".remove-btn")) {

        removeItem(
            Number(e.target.closest(".remove-btn").dataset.id)
        );

    }

});
// ==========================
// Initial Load
// ==========================

displayCart();

updateCartCount();