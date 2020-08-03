import { displayMeals } from "../views/categoryview";
import { blob, loading, clearLoad, displayDivMore, getMeal } from "./base";
import { elements } from "../views/baseview";

export const objCurrent = {
  currentPage: 1,
  numberPerPage: 15
};

export async function urlSubCategory(url) {
  const urls = location.hash.split('/')
  const [recipe, category] = urls
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories)
    const search = await getMeal(endPoint)
    urlSubCategory.arr = search.meals;
    displayDivMore(search.meals)
    const arrSlice = loadList(search.meals)
    arrSlice.map(async (meal) => {
      const imgBlob = await blob(meal, "strMealThumb")
      const obj = {
        img: imgBlob,
        food: meal,
      }
      displayMeals(obj, category, "/")
    })
    clearLoad();
  } catch (error) {
    console.error(error)
  }
}

export function loadList(arr) {
  let start = (objCurrent.currentPage - 1) * objCurrent.numberPerPage;
  let end = start + objCurrent.numberPerPage;
  let arrSlice = arr.slice(start, end);
  return arrSlice
}

export async function showMore(arr) {
  const urls = location.hash.split('/')
  const [recipe, category] = urls
  objCurrent.currentPage += 1;
  const array = loadList(arr);
  array.map(async (meal) => {
    const imgBlob = await blob(meal, "strMealThumb")
    const obj = {
      img: imgBlob,
      food: meal,
    }
    displayMeals(obj, category, "/")
  })
}
