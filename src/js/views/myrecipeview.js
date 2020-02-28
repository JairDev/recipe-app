import { elements } from './baseview'
import { clear, createButtonBack } from '../models/base'
import { displayEachMeal } from './eachmealview'

export function displayMyRecipes(imgUrl, meal) {
  const html = `
              <div class="section-categories__content__myrecipes" data-meal="${meal.strMeal}">
                <a href="#0" class="link_myrecipe">
                  <img src="${imgUrl}">
                  <h2>${meal.strMeal}</h2>
                </a>
              </div>`;
  elements.categories.insertAdjacentHTML("afterbegin", html);
  const linkMyRecipe = document.querySelector(".section-categories__content__myrecipes")
  linkMyRecipe.addEventListener('click', () => {
    const divAll = document.querySelector(".more");
    divAll.style = "display: none";
    clear();
    createButtonBack();
    displayEachMeal(imgUrl, meal);
    document.getElementById("savebut").remove();
    const deleteMeal = `<div class="button_delete" data-idfood="${meal.idMeal}">Delete</div>`
    elements.categories.insertAdjacentHTML("afterbegin", deleteMeal);
  })

}