import { blob, loading, clearLoad, displayDivMore, getMeal} from './base'
import { elements } from '../views/baseview'
import { displayEachMeal } from '../views/eachmealview'

export async function getEachMeal(url) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${url}`;
  try {
    loading(elements.categories);
    const search = await getMeal(endPoint)
    const imgBlob = await blob(...search.meals, "strMealThumb")
    displayEachMeal(imgBlob, ...search.meals)
    displayDivMore(search.meals)
    clearLoad();
  } catch (error) {
      console.log(error)
  }
}
