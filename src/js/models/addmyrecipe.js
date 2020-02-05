import { arrSaveMeal, objAddMeal, saveLocal } from './base'

export function addMyRecipe(name, instructions, ingredients) {
  let count = 1;
  let key = "strIngredient";
  const arr = ingredients.split(" ");
  const ramId = Math.floor(Math.random() * 1000)
  objAddMeal.idMeal = ramId.toString()
  objAddMeal.strMeal = name;
  objAddMeal.strInstructions = instructions;
  arr.forEach(ingredient => {
    objAddMeal[key + count++] = ingredient;
  });
  arrSaveMeal.push(objAddMeal)
  saveLocal(arrSaveMeal)
}