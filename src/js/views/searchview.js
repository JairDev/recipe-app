import { elements } from '../views/baseview'

export function displaySearchMeals(imgURl, meal) {
  const html = `<div class="thumb_meal" data-meal="${meal.strMeal}">
                  <a class="link-search" href="#recipes/${meal.strCategory}/${meal.strMeal}">
                  <img src="${imgURl}">
                  <p class="search_p">${meal.strMeal}</p>
                  <a/>
                </div>`;
  elements.searchResult.insertAdjacentHTML("afterbegin", html);
}