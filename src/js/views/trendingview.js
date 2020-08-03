import { elements } from "../views/baseview";

export function displayTrend(imgUrl, meal) {
  const html = `<div class="section-trend__content" data-meal="${meal.strMeal}">
                  <img src="${imgUrl}" alt="">
                  <div class="section-trend__content-text">
                    <span class="text-category-trend">${meal.strCategory}</span>
                    <span class="section-trend__content-text-name-meal">${meal.strMeal} - 
                    <a href="#recipes/${meal.strCategory}/${meal.strMeal}/${meal.idMeal}" class="link-trend">Ver receta</a></span>
                  </div>
                </div>`;
  elements.sectionTrend.innerHTML = html;
}
