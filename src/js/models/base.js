import { elements } from "../views/baseview";
import { displayMeals } from "../views/categoryview";
import { displayEachMeal, mealObj, mealArr } from "../views/eachmealview";

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

export function title(insert = 'Categories') {
  const div =  document.querySelector('.section-categories-title')
  const title = `<span class="title">${insert}</span>`
  div.innerHTML = title
}

export async function blob(hash, meal, displayfunc) {
  try {
    const url = meal.strMealThumb;
    const response = await fetch(url);
    const data = await response.blob();
    const objUrl = URL.createObjectURL(data);
    return displayfunc(hash, objUrl, meal);
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
 
}

export function displayDivMore(arr) {
  const divMore = document.querySelector(".more");
  if (arr.length >= 16) {
    divMore.style = "display: flex";
  } else {
    divMore.style = "display: none";
  }
}
