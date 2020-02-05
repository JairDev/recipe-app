import { elements } from '../views/baseview'

export function displayTrend(imgUrl, meal) {
  const html = `<div class="section-trend__content" data-meal="${meal.strMeal}">
                  <img src="${imgUrl}" alt="">
                  <div class="section-trend__content-text">
                    <h2>${meal.strCategory}</h2>
                    <p class="section-trend__content-text-p">${meal.strMeal} - <a href="#0" class="link-trend">Ver receta</p>
                  </div>
                </div>`;
  elements.sectionTrend.innerHTML = html;
}