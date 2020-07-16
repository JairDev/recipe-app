import { elements } from '../views/baseview'

export function displayTrend(url, imgUrl, meal) {
  console.log(meal)
  const html = `<div class="section-trend__content" data-meal="${meal.strMeal}">
                  <img src="${imgUrl}" alt="">
                  <div class="section-trend__content-text">
                    <h2>${meal.strCategory}</h2>
                    <span class="section-trend__content-text-p">${meal.strMeal} - <a href="#recipes/${meal.strCategory}/${meal.strMeal}" class="link-trend">Ver receta</a></span>
                  </div>
                </div>`;
  elements.sectionTrend.innerHTML = html;
}