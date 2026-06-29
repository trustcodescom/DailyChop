export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function updateCartCount() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    const cart = getCart();

    const totalItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    badge.textContent = totalItems;
}