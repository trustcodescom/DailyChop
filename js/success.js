import { updateCartCount } from "./carts-utils.js";

// Clear the cart
localStorage.removeItem("cart");

// Update floating cart badge
updateCartCount();

// Home button
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {

    window.location.href = "index.html";

});