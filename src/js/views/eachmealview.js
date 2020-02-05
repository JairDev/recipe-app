import { elements } from './baseview'

export function displayEachMeal(imgMeal, meal) {
  displayEachMeal.obj = meal
  let ingredients = ``;
  let measure = ``;
  for (let key in meal) {
    if (key.includes("strIngredient") && meal[key]) {
      ingredients += `<li>${meal[key]}</li>`;
    }
    if (key.includes("strMeasure") && meal[key]) {
      measure += `<span>${meal[key]}</span>`;
    }
  }
  const but = `<div id="savebut" class="save_recipe" data-id="${meal.idMeal}">
                <span class="span-save">Save recipe</span>
                </div>`;
  const html = `
      <div class="section-categories__content__eachmeal ">
        <div class="name_eachmeal">
          <h2>${meal.strMeal}</h2>
          ${but}
        </div>
        <div class="img_eachmeal">
          <img src="${imgMeal}">
        </div>

        <div class="ingredients_eachmeal">
          <h2>Ingredients:</h2>
          <div class="list_ingredients">
            <ul>
              ${ingredients}
            </ul>
            <div class="list_measure">
            ${measure}
          </div>
          </div>

        </div>

        <div class="instructions_eachmeal">
          <h2>Instructions:</h2>
          <p>${meal.strInstructions}
        </div>
    </div>
    `;
  elements.categories.insertAdjacentHTML("afterbegin", html);
}