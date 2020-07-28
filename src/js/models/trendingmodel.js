import { loading, blob, clearLoad, getMeal } from './base'
import { elements } from '../views/baseview'
import { displayTrend } from '../views/trendingview'

export async function trendingMeal() {
  try {
    const get = "https://www.themealdb.com/api/json/v1/1/random.php";
    const search = await getMeal(get)
    const imgBlob = await blob(...search.meals, 'strMealThumb')
    displayTrend(imgBlob, ...search.meals)
  } catch (error) {
    console.error(error)
  }
};
