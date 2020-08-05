import { arrSaveMeal, objAddMeal, saveLocal } from "./base";

export function addMyRecipe(name, instructions, ingredients) {
  const img = document.querySelector(".modal-recipe__preview-img");
  const selectCategories = document.querySelector(".select-categories");
  const strCategory = selectCategories.value;
  const strMealThumb = img.dataset.url;
  let count = 1;
  let key = "strIngredient";
  const arr = ingredients.split(",");
  const ramId = Math.floor(Math.random() * 1000);
  const objMeal = Object.assign(Object.create(objAddMeal), {
    idMeal: `${ramId}-default`,
    strMeal: name,
    strInstructions: instructions,
    strMealThumb: strMealThumb,
    strCategory: strCategory,
  });
  arr.forEach((ingredient) => {
    objMeal[key + count++] = ingredient;
  });
  console.log(objMeal);
  return objMeal;
}
