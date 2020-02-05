import { elements } from './baseview'

// export function displaySubcategorie(imgUrl, meal) {
//   const html = `
//     <div class="section-categories__content__meals" data-meal="${meal.strMeal}">
//       <a class="linkaa">
//       <img src="${imgUrl}">
//       </a>
//       <h2>${meal.strMeal}</h2>
//     </div>
//     `;
//   elements.categories.insertAdjacentHTML("afterbegin", html);
// }
export function displayMeals(imgUrl, meal) {
  const html = `
  <div class="section-categories__content__meals" data-meal="${meal.strMeal}">
    <a href="#0" class="link_categories">
      <img alt="${meal.strMeal}" src="${imgUrl}">
      <h2 >${meal.strMeal}</h2>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("beforeend", html);
}
