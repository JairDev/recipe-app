import { displayMeals } from "../views/subcategoriesview";
import { blob, loading, clearLoad, displayDivMore } from "./base";
import { elements } from "../views/baseview";

export const objCurrent = {
  currentPage: 1,
  numberPerPage: 12
};

export async function urlSubCategory(url) {
  urlSubCategory.arrSubCategories = [];
<<<<<<< HEAD
  console.log('url>>', url)
  currentPage = 1;
=======
  objCurrent.currentPage = 1;
>>>>>>> 32b7e891db97dac209ac402adbd1ed48fea524ea
  const getSubcategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories);
    const response = await fetch(getSubcategorie);
    const data = await response.json();
    urlSubCategory.arrSubCategories.push(...data.meals);
    loadList(urlSubCategory.arrSubCategories);
<<<<<<< HEAD
    displayDivMore(elementsList);
    const food = elementsList.map(meal => {
      blob(meal, url, displayMeals);
=======
    displayDivMore(loadList.elementsList);
    loadList.elementsList.map(meal => {
      blob(meal, displayMeals);
>>>>>>> 32b7e891db97dac209ac402adbd1ed48fea524ea
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
