import { loading, blob, clearLoad } from './base'
import { elements } from '../views/baseview'
import { displayTrend } from '../views/trendingview'

export async function trendingMeal() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    loading(elements.sectionTrend);
    const response = await fetch(url);
    const data = await response.json();
    blob(data.meals[0], displayTrend)
    clearLoad(elements.sectionTrend);
  } catch (error) {
    console.log(error);
  }
};
