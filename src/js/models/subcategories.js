import { displayMeals } from "../views/subcategoriesview";
import { blob, loading, clearLoad, displayDivMore } from "./base";
import { elements } from "../views/baseview";

export let arrSubCategories = [];
export let elementsList = [];
let currentPage = 1;
let numberPerPage = 12;

export async function urlSubCategory(url) {
  urlSubCategory.arrSubCategories = [];
  console.log('url>>', url)
  currentPage = 1;
  const getSubcategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories);
    const response = await fetch(getSubcategorie);
    const data = await response.json();
    urlSubCategory.arrSubCategories.push(...data.meals);
    loadList(urlSubCategory.arrSubCategories);
    displayDivMore(elementsList);
    const food = elementsList.map(meal => {
      blob(meal, url, displayMeals);
    });
    clearLoad(elements.categories);
  } catch (error) {
    console.log(error);
  }
}

export function loadList(arr) {
  let start = (currentPage - 1) * numberPerPage;
  let end = start + numberPerPage;
  elementsList = arr.slice(start, end);
}

export function showMore() {
  currentPage += 1;
  loadList(urlSubCategory.arrSubCategories);
  elementsList.forEach(meal => {
    blob(meal, displayMeals);
  });
}
