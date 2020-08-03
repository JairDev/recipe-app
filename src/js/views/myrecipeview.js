import { elements } from "./baseview";

export function displayMyRecipes(imgUrl, meal) {
  const html = `
              <div class="section-categories__content__myrecipes" data-meal="${meal.strMeal}">
                <a href="#myrecipes/${meal.strCategory}/${meal.strMeal}/${meal.idMeal}" class="link_myrecipe">
                  <img src="${imgUrl}">
                  <h2>${meal.strMeal}</h2>
                </a>
              </div>`;
  elements.categories.insertAdjacentHTML("afterbegin", html);
}
