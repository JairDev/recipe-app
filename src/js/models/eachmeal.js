import { blob, loading, clearLoad, displayDivMore, getMeal} from './base'
import { elements } from '../views/baseview'
import { displayEachMeal } from '../views/eachmealview'

export async function getEachMeal(url) {
  const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${url}`;
  try {
    loading(elements.categories);
    const search = await getMeal(get)
    const imgBlob = await blob(...search.meals, "strMealThumb")
    displayEachMeal(imgBlob, ...search.meals)
    displayDivMore(search.meals)
    clearLoad();
  } catch (error) {
      console.log(error)
  }
}
