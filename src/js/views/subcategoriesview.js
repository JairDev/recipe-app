import { elements } from './baseview'
import { title } from "../models/base";

export function displayMeals(imgUrl, meal) {
  const html = `
  <div class="section-categories__content__meals" data-meal="${meal.strMeal}">
    <a href="#recipes/${category}/${meal.strMeal}" class="link_categories">
      <img class="lazy" alt="${meal.strMeal}" src="${imgUrl}" data-src="${imgUrl}">
      <span class="text-subcategory">${meal.strMeal}</span>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("beforeend", html);
}






