import { meals } from "./menu-data.js";

const menuGrid = document.getElementById("menuGrid");

function displayMeals() {

    let cards = "";

    meals.forEach(meal => {
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

                        <button class="cart-btn">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </article>
        `;
    });

    menuGrid.innerHTML = cards;
}

displayMeals();