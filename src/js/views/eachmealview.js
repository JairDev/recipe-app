import { elements } from './baseview'
export const mealArr = []

export function displayEachMeal(hash, imgMeal, meal) {
  mealArr.push(meal)
  let contain = location.hash.substring(1).split('/')
  let [ myrecipe ] = contain
  let back = myrecipe === 'myrecipes' ? '#myrecipes' : `#recipes/${meal.strCategory}`
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
  const but = `<div id="savebut" class="save_recipe" data-meal="${meal.strMeal}" data-id="${meal.idMeal}">
                <span class="span-save">Save recipe</span>
                </div>`;
  const html = `
      
      <div class="section-categories__content__eachmeal">
      <a href="${back}"><div id="button_back" class="button_click">Back</div></a>
        <div class="name_eachmeal">
          <span class="text-eachmeal">${meal.strMeal}</span>
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





