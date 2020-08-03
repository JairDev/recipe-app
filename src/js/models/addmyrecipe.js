import { arrSaveMeal, objAddMeal, saveLocal } from './base'

export function addMyRecipe(name, instructions, ingredients) {
  const img = document.querySelector('.modal-recipe__preview-img')
  const strMealThumb = img.dataset.url
  let count = 1;
  let key = "strIngredient";
  const arr = ingredients.split(",");
  const ramId = Math.floor(Math.random() * 1000)
  const objMeal = Object.assign(Object.create(objAddMeal), {
    "idMeal": ramId,
    "strMeal":  name,
    "strInstructions": instructions,
    "strMealThumb": strMealThumb
  })
  arr.forEach(ingredient => {
    objMeal[key + count++] = ingredient;
  });
  // arrSaveMeal.push(objAddMeal)
  // saveLocal(arrSaveMeal)
  // const o = Object.assign(objAddMeal, objMeal)
  // console.log(objMeal)
  return objMeal
}