import { displayMeals } from "../views/subcategoriesview";
import { blob, loading, clearLoad, displayDivMore, title } from "./base";
import { elements } from "../views/baseview";

export const objCurrent = {
  currentPage: 1,
  numberPerPage: 15
};

export async function urlSubCategory(url) {
  urlSubCategory.arr = [];
  // objCurrent.currentPage = 1;
  const getSubcategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories);
    const response = await fetch(getSubcategorie);
    const data = await response.json();
    urlSubCategory.arr.push(...data.meals);
    const arr = loadList(urlSubCategory.arr)
    displayDivMore(arr);
    arr.map(meal => {
      blob(meal, displayMeals);
    });
    clearLoad(elements.categories);
  } catch (error) {
    console.log(error);
  }
}

export function loadList(arr) {
  let start = (objCurrent.currentPage - 1) * objCurrent.numberPerPage;
  console.log(objCurrent.currentPage - 1)
  let end = start + objCurrent.numberPerPage;
  let arrSlice = arr.slice(start, end);
  return arrSlice
}

export function showMore(arr, display) {
  objCurrent.currentPage += 1;
  const array = loadList(arr);
  // console.log(array)
  array.map(meal => {
    blob(meal, display);
  });

}
