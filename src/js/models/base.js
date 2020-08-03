import { elements } from "../views/baseview";
import { categories } from "./categorymodel";
import { trendingMeal} from "./trendingmodel";
import { mealArr } from "../views/eachmealview";

export const arrSaveMeal = JSON.parse(localStorage.getItem("meals")) || [];
export let objAddMeal = {};
export let subcategorieLog = "";

export async function parallelFetch() {
  const endPointCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const endPointTrend = "https://www.themealdb.com/api/json/v1/1/random.php";
  const res1 = await fetch(endPointCategories)
  const res2 = await fetch(endPointTrend)
  const results =  await Promise.all([res1, res2])
  const resCategories = await results[0].json()
  const resTrend = await results[1].json()
  const resultsObj = {
    resCategories,
    resTrend
  }
  return resultsObj
}

export async function modelHome() {
  loading(elements.categories)
  loading(elements.sectionTrend)
  const resultFetch = await parallelFetch()
  trendingMeal(resultFetch)
  categories(resultFetch)
  clearLoad()
}

export async function getMeal(query) {
  const response = await fetch(query);
  const data = await response.json();
  return data
}

export function loading(place) {
  const load = `
    <div class="lds-dual-ring "></div>
  `;
  place.insertAdjacentHTML("afterbegin", load);

}

export function clearLoad() {
  const load = document.querySelector('.lds-dual-ring')
  if(load) load.remove();
}
export function clearSearch() {
  elements.searchResult.innerHTML = "";
}

export function title(insert) {
  const div =  document.querySelector('.section-categories-title')
  const title = `<span class="title">${insert}</span>`
  div.innerHTML = title
}

export async function blob(meal, thumb) {
  const url = meal[thumb];
  const response = await fetch(url);
  const data = await response.blob();
  const objUrl = URL.createObjectURL(data);
  return objUrl
}

export function saveLocal(item) {
  localStorage.setItem("meals", JSON.stringify(item));
}

export function saveMeal(arr, id) {
  const idx = arr.findIndex(index => index.idMeal === id);
  const findMeal = mealArr.find(meal => meal.idMeal === id)
  if (idx === -1) {
    arr.push(findMeal);
    saveLocal(arr);
    document.querySelector(".save_recipe").classList.add("display_success");
    setTimeout(() => {
      document
        .querySelector(".save_recipe")
        .classList.remove("display_success");
    }, 500);
  } else {
    console.log("Meal already exist");
    document.querySelector(".save_recipe").classList.add("display_warn");
    setTimeout(() => {
      document.querySelector(".save_recipe").classList.remove("display_warn");
    }, 500);
  }
}

export function deleteMeal(arr, id) {
  const idx = arr.findIndex(index => index.idMeal === id);
  if (idx > -1) {
    arr.splice(idx, 1);
  }
  document
    .querySelector(".button_delete")
    .classList.add("display_success_removed");
  setTimeout(() => {
    document
      .querySelector(".button_delete")
      .classList.remove("display_success_removed");
  }, 500);
  saveLocal(arr);
}

export function showModal() {
  elements.modal.classList.add("active");
  elements.main.style = "filter: blur(5px)";
  objAddMeal = {};
}
export function closeModal() {
  elements.modal.classList.remove("active");
  elements.main.style = "filter: blur(0px)";
}

export function clear() {
  elements.categories.innerHTML = "";
  elements.sectionTrend.innerHTML = ""
}

export function displayDivMore(arr) {
  const divMore = document.querySelector(".more");
  if (arr.length >= 15) {
    divMore.classList.add("flex")
  } else {
    divMore.classList.remove("flex")
  }
}
