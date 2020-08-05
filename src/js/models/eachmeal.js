import { blob, loading, clearLoad, displayDivMore, getMeal, arrSaveMeal } from "./base";
import { elements } from "../views/baseview";
import { displayEachMeal } from "../views/eachmealview";

export async function getEachMeal(mealId) {
  const findMeal = arrSaveMeal.find( meal => meal.idMeal.includes('default'))
  const checkUrl = mealId.includes('default')
  try {
    if(checkUrl) {
      displayEachMeal(findMeal.strMealThumb, findMeal);
    }else {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    loading(elements.categories);
    const search = await getMeal(endPoint);
    const imgBlob = await blob(...search.meals, "strMealThumb");
    displayEachMeal(imgBlob, ...search.meals);
    displayDivMore(search.meals);
    clearLoad();
    }
    
  } catch (error) {
    
  }
  // try {
  //   loading(elements.categories);
  //   const search = await getMeal(endPoint);
  //   const imgBlob = await blob(...search.meals, "strMealThumb");
  //   displayEachMeal(imgBlob, ...search.meals);
  //   displayDivMore(search.meals);
  //   clearLoad();
  // } catch (error) {
  //   console.log(error);
  // }
}
