import { blob, loading, clearLoad } from './base'
import { elements } from '../views/baseview'
import { displayEachMeal } from '../views/eachmealview'

export async function getEachMeal(url) {
  try {
    const urlFormat = url.split(" ").join("%20");
    const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${urlFormat}`;
    loading(elements.categories);
    const response = await fetch(get)
    const data = await response.json()
    blob(data.meals[0], displayEachMeal)
    clearLoad(elements.categories);
  } catch (error) {
      console.log(error)
  }
}