import { elements } from '../views/baseview'
import { blob } from './base'
import { displaySearchMeals } from '../views/searchview'

export async function getMealSearch(query) {
  try {
    const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await fetch(get);
    const data = await response.json();
    
    if (elements.search.value === "") {
      clearSearch();
    } else {
      clearSearch();
      console.log(data)
      const arrMealSearch = [];
      arrMealSearch.push(...data.meals);
      console.log(arrMealSearch)
      const matchArr = filterMealSearch(query, arrMealSearch);
      matchArr.map(meal => {
        blob(meal, displaySearchMeals);
      });
    }
  } catch (error) {
    console.log(error);
    const err = `<p class="error_match">Sorry, no food matches...</p>`;
    elements.searchResult.innerHTML = err;
  }

}

function filterMealSearch(words, arrMeal) {
  return arrMeal.filter(meal => {
    const regex = new RegExp(words, "gi");
    return meal.strMeal.match(regex);
  });
}

function clearSearch() {
  elements.searchResult.innerHTML = "";
}