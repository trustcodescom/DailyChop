import { updateCartCount, getCart } from "./carts-utils.js";

const orderItems = document.getElementById("orderItems");

function renderOrderSummary() {

    const cart = getCart();

    let subtotal = 0;
    let html = "";

    cart.forEach(item => {

        const total = item.price * item.quantity;
        subtotal += total;

        html += `
            <div class="summary-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="summary-details">

                    <h4>${item.name}</h4>

                    <p>₦${item.price.toLocaleString()} × ${item.quantity}</p>

                </div>

                <span>₦${total.toLocaleString()}</span>

            </div>
        `;

    });

    orderItems.innerHTML = html;

    const delivery = 1000;
    const grandTotal = subtotal + delivery;

    document.getElementById("subtotal").textContent =
        `₦${subtotal.toLocaleString()}`;

    document.getElementById("deliveryFee").textContent =
        `₦${delivery.toLocaleString()}`;

    document.getElementById("grandTotal").textContent =
        `₦${grandTotal.toLocaleString()}`;

    return {
        cart,
        subtotal,
        delivery,
        grandTotal
    };
}
// =========================
// ORDER NOTE
// =========================

function setupOrderNote() {

    const addNote = document.getElementById("addNote");
    const note = document.getElementById("note");

    addNote.addEventListener("change", () => {

        if (addNote.checked) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }

    });

}
// =========================
// setupCheckoutForm
// =========================
function setupCheckoutForm() {

    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const phone = document.getElementById("phone").value;
        const note = document.getElementById("note").value.trim();
        
        const { cart, subtotal, delivery, grandTotal } = renderOrderSummary();

        let message = `*NEW DAILYCHOP ORDER*%0A%0A`;

        message += `*Customer Information*%0A`;
        message += `Name: ${firstName} ${lastName}%0A`;
        message += `Email: ${email}%0A`;
        message += `Phone: ${phone || "Not Provided"}%0A`;
        message += `Address: ${address}%0A`;
        message += `City: ${city}%0A`;
        message += `State: ${state}%0A%0A`;

        if (note) {
            message += `*Order Note*%0A`;
            message += `${note}%0A%0A`;
        }

        message += `*Order Items*%0A`;

        cart.forEach(item => {

            const total = item.price * item.quantity;

            message += `${item.quantity} × ${item.name} - ₦${total.toLocaleString()}%0A`;

        });

        message += `%0A`;
        message += `Subtotal: ₦${subtotal.toLocaleString()}%0A`;
        message += `Delivery: ₦${delivery.toLocaleString()}%0A`;
        message += `Total: ₦${grandTotal.toLocaleString()}`;

        const phoneNumber = "2349021040207"; // Replace with WhatsApp number

        window.open(
            `https://wa.me/${phoneNumber}?text=${message}`,
            "_blank"
        );

        // Go to success page
        window.location.href = "success.html";

        });

}

renderOrderSummary();
setupOrderNote();
setupCheckoutForm();
updateCartCount();