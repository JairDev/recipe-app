import { elements } from './baseview'

export function displayMeals(imgUrl, meal, hash) {
  // console.log('hash>>', hash)
  // console.log('meal>>', meal)
  const html = `
  <div class="section-categories__content__meals" data-meal="${meal.strMeal}">
    <a href="#${hash}/${meal.strMeal}" class="link_categories">
      <img alt="${meal.strMeal}" src="${imgUrl}">
      <h2 >${meal.strMeal}</h2>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("beforeend", html);
}
