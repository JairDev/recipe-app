import { blob, loading, clearLoad, displayDivMore} from './base'
import { elements } from '../views/baseview'
import { displayEachMeal } from '../views/eachmealview'
import { mealModule } from "../views/eachmealview"

export async function getEachMeal(url) {
  console.log(url)
  // try {
  //   const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${url}`;
  //   loading(elements.categories);
  //   const response = await fetch(get)
  //   const data = await response.json()
  //   displayDivMore(data.meals)
  //   blob(...data.meals, displayEachMeal)
  //   clearLoad(elements.categories);
  // } catch (error) {
  //     console.log(error)
  // }
}
