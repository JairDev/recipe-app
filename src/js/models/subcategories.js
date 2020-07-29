import { displayMeals } from "../views/categoryview";
import { blob, loading, clearLoad, displayDivMore, getMeal } from "./base";
import { elements } from "../views/baseview";

const urls = location.hash.split('/')
const [recipe, category] = urls

export const objCurrent = {
  currentPage: 1,
  numberPerPage: 15
};

export async function urlSubCategory(url) {
  const get = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  try {
    loading(elements.categories)
    const search = await getMeal(get)
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
    clearLoad(elements.categories);
  } catch (error) {
    console.error(error)
  }
}

export function loadList(arr) {
  let start = (objCurrent.currentPage - 1) * objCurrent.numberPerPage;
  console.log(objCurrent.currentPage - 1)
  let end = start + objCurrent.numberPerPage;
  let arrSlice = arr.slice(start, end);
  return arrSlice
}

export async function showMore(arr) {
  objCurrent.currentPage += 1;
  const array = loadList(arr);
  array.map(async (meal) => {
    const imgBlob = await blob(meal, "strMealThumb")
    console.log(imgBlob)
    const obj = {
      img: imgBlob,
      food: meal,
    }
    displayMeals(obj, category, "/")
  })
}
