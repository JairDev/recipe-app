import { blob, clearSearch } from "./base";
import { displaySearchMeals } from "../views/searchview";

let controller = null;
//manage the search and know the status of the request
//if the user types very fast and there is a pending request
//pending request is canceled, before making a new request
//to avoid replacing new requests with old requests
// and avoid mistakes in the UI
export async function getSearchMeal(query) {
  if (controller) controller.abort(); //cancel pending request if any
  controller = new AbortController(); //controller to be able to cancel the request
  const signal = controller.signal; //associates the signal and controller with the request
  const response = await fetch(query, { signal });
  const data = await response.json();
  return data;
}

export async function searchMealController(e) {
  try {
    if (!this.value) {
      clearSearch();
    } else {
      clearSearch();
      const get = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`;
      const search = await getSearchMeal(get);
      const filterMeal = filterMealSearch(this.value, search.meals);
      filterMeal.map(async (meal) => {
        const imgBlob = await blob(meal, "strMealThumb");
        displaySearchMeals(imgBlob, meal);
      });
    }
  } catch (error) {
    console.error(error);
  }
  e.preventDefault();
}

export function filterMealSearch(words, arrMeal) {
  return arrMeal.filter((meal) => {
    const regex = new RegExp(words, "gi");
    return meal.strMeal.match(regex);
  });
}
