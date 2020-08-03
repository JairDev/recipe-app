import { elements } from "./baseview";
export const mealArr = [];

export function displayEachMeal(imgMeal, meal) {
  mealArr.push(meal);
  let contain = location.hash.substring(1).split("/");
  let [myrecipe] = contain;
  let back =
    myrecipe === "myrecipes" ? "#myrecipes" : `#recipes/${meal.strCategory}`;
  let idButton = myrecipe === "myrecipes" ? "deletebut" : "savebut";
  let spanButton = myrecipe === "myrecipes" ? "Delete recipe" : "Save recipe";
  const but = `<div id=${idButton} class="save_recipe" data-meal="${meal.strMeal}" data-id="${meal.idMeal}">
                <span class="span-save">${spanButton}</span>
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
          <span class="ingredients_eachmeal__sub-title">Ingredients:</span>
          <div class="list_ingredients">
            <table class="table-in">
              <tbody class="table-body"></tbody>
            </table>
          </div>
        </div>

        <div class="instructions_eachmeal">
          <span class="instructions_eachmeal-sub-title">Instructions:</span>
          <p>${meal.strInstructions}
        </div>
    </div>
    `;
  elements.categories.insertAdjacentHTML("afterbegin", html);
  objMeal(meal);
}

function objMeal(obj) {
  let objIngredient = [];
  let objMeasure = [];
  Object.keys(obj).map((key) => {
    let ingredients =
      key.includes("strIngredient") && obj[key] !== "" && obj[key] !== null;
    let measure =
      key.includes("strMeasure") && obj[key] !== " " && obj[key] !== null;
    if (ingredients) {
      objIngredient.push(obj[key]);
    }
    if (measure) {
      objMeasure.push(obj[key]);
    }
  });
  for (let i = 0; i < objIngredient.length; i++) {
    viewIngredient(objIngredient[i], objMeasure[i]);
  }
}

function viewIngredient(ingredient, measure) {
  const table = document.querySelector(".table-body");
  const html = `<tr>
                  <td class="table-td">${ingredient}</td>
                  <td class="table-td">${measure}</td>
                </tr>`;
  table.insertAdjacentHTML("beforeend", html);
}
