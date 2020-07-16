import { elements } from './baseview'
import { title } from "../models/base";

export function displayMeals(hash, imgUrl, meal) {
  title(hash)
  const html = `
  <div class="section-categories__content__meals" data-meal="${meal.strMeal}">
    <a href="#recipes/${hash}/${meal.strMeal}" class="link_categories">
      <img alt="${meal.strMeal}" src="${imgUrl}">
      <span class="text-subcategory">${meal.strMeal}</span>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("beforeend", html);
}


