import { displayMeals } from "../views/subcategoriesview";
import { blob, loading, clearLoad, displayDivMore, title } from "./base";
import { elements } from "../views/baseview";

export const objCurrent = {
  currentPage: 1,
  numberPerPage: 12
};

export async function urlSubCategory(url) {
  urlSubCategory.arrSubCategories = [];
  objCurrent.currentPage = 1;
  const getSubcategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories);
    const response = await fetch(getSubcategorie);
    const data = await response.json();
    urlSubCategory.arrSubCategories.push(...data.meals);
    loadList(urlSubCategory.arrSubCategories);
    displayDivMore(loadList.elementsList);
    loadList.elementsList.map(meal => {
      blob(url, meal, displayMeals);
    });
    clearLoad(elements.categories);
  } catch (error) {
    console.log(error);
  }
}

export function loadList(arr) {
  loadList.elementsList = [];
  let start = (objCurrent.currentPage - 1) * objCurrent.numberPerPage;
  loadList.end = start + objCurrent.numberPerPage;
  loadList.elementsList = arr.slice(start, loadList.end);
}

export function showMore(arr, display) {
  objCurrent.currentPage += 1;
  loadList(arr);
  loadList.elementsList.forEach(meal => {
    blob(meal, display);
  });
}
