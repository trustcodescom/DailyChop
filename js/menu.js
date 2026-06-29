import { updateCartCount, getCart } from "./carts-utils.js";
import { meals } from "./menu-data.js";

const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".menu-categories button");
const searchInput = document.getElementById("searchInput");

let selectedCategory = "all";

function displayMeals(mealsToDisplay) {

    let cards = "";

    mealsToDisplay.forEach(meal => {
        cards += `
            <article class="menu-card">
                <div class="menu-image">
                    <img src="${meal.image}" alt="${meal.name}">
                </div>

                <div class="menu-content">
                    <h3>${meal.name}</h3>
                    <p>${meal.description}</p>

                    <div class="menu-footer">
                        <span class="price">₦${meal.price.toLocaleString()}</span>

                        <button class="cart-btn" data-id="${meal.id}">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </article>
        `;
    });

    menuGrid.innerHTML = cards;

    attachCartEvents();
}

function filterMeals() {

    const searchText = searchInput.value.toLowerCase();

    let filteredMeals = meals;

    // Filter by category
    if (selectedCategory !== "all") {
        filteredMeals = filteredMeals.filter(meal =>
            meal.category.toLowerCase() === selectedCategory
        );
    }

    // Filter by search
    filteredMeals = filteredMeals.filter(meal =>
        meal.name.toLowerCase().includes(searchText)
    );

    displayMeals(filteredMeals);
}

function attachCartEvents() {

    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const mealId = Number(button.dataset.id);

            addToCart(mealId);

        });

    });

}

// Category buttons
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterMeals();
    });
});

// Search
searchInput.addEventListener("input", filterMeals);

// Initial display
displayMeals(meals);


function addToCart(id) {

    const meal = meals.find(meal => meal.id === id);
    if (!meal) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingMeal = cart.find(item => item.id === id);

    if (existingMeal) {
        existingMeal.quantity++;
    } else {
        cart.push({
            id: meal.id,
            name: meal.name,
            description: meal.description,
            price: meal.price,
            image: meal.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // Floating cart animation
    const floatingCart = document.querySelector(".floating-cart");

    if (floatingCart) {
        floatingCart.classList.remove("bump");
        void floatingCart.offsetWidth;
        floatingCart.classList.add("bump");

        floatingCart.addEventListener("animationend", () => {
            floatingCart.classList.remove("bump");
        }, { once: true });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});