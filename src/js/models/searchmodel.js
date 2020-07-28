import { elements } from '../views/baseview'
import { blob, clearSearch, getMeal } from './base'
import { displaySearchMeals } from '../views/searchview'

export async function searchMealController(e) {
  try {
    if(!this.value) {
      clearSearch()
    }else {
      clearSearch()
      const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`;
      const search = await getMeal(get)
      const filterMeal = filterMealSearch(this.value, search.meals)
      filterMeal.map(async (meal) => {
        const imgBlob = await blob(meal, 'strMealThumb')
        displaySearchMeals(imgBlob, meal)
      })
    }
  } catch (error) {
    console.error(error)
  }
  e.preventDefault()
}

export function filterMealSearch(words, arrMeal) {
  return arrMeal.filter(meal => {
    const regex = new RegExp(words, "gi");
    return meal.strMeal.match(regex);
  });
}

