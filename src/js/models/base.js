import { elements } from "../views/baseview";
import { displayMeals } from "../views/categoryview";
import { displayEachMeal } from "../views/eachmealview";

export const state = {};
export const arrSaveMeal = JSON.parse(localStorage.getItem("meals")) || [];
export let objAddMeal = {};
export var subcategorieLog = "";

export function loading(place) {
  const load = `
    <div class="lds-dual-ring "></div>
  `;
  place.insertAdjacentHTML("afterbegin", load);
}

export function clearLoad(place) {
  place.firstElementChild.remove();
}
export function clearSearch() {
  elements.searchResult.innerHTML = "";
}

export async function blob(meal, hash, displayfunc) {
  // console.log(urlHash)
  try {
    const url = meal.strMealThumb;
    const response = await fetch(url);
    const data = await response.blob();
    const objUrl = URL.createObjectURL(data);
    return displayfunc(objUrl, meal, hash);
  } catch (error) {
    console.log(error);
  }
}

export async function blobImgCategory(category) {
  try {
    const url = category.strCategoryThumb;
    const response = await fetch(url);
    const data = await response.blob();
    const objUrl = URL.createObjectURL(data);
    displayMeals(objUrl, category);
  } catch (error) {
    console.log(error);
  }
}

export function saveLocal(item) {
  localStorage.setItem("meals", JSON.stringify(item));
}

export function saveMeal(arr, id) {
  const idx = arr.findIndex(index => index.idMeal === id);
  if (idx === -1) {
    arr.push(displayEachMeal.obj);
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

export const createButtonBack = function() {
  createButtonBack.called = true;
  const buttonBack = `<div id="button_back" class="button_click">Back</div>`;
  elements.sectionCategory.insertAdjacentHTML("afterbegin", buttonBack);
};
export function clear() {
  elements.categories.innerHTML = "";
 
}

export function displayDivMore(arr) {
  const divMore = document.querySelector(".more");
  if (arr.length >= 11) {
    divMore.style = "display: flex";
  } else {
    divMore.style = "display: none";
  }
}
