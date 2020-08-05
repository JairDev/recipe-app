// import "core-js/stable";
import "regenerator-runtime/runtime";
import "./styles/main.scss";
import "./img/mediterranean-cuisine-2378758_1280.jpg";
import {
  clearSearch,
  clear,
  saveMeal,
  blob,
  arrSaveMeal,
  closeModal,
  showModal,
  deleteMeal,
  title,
  modelHome,
  saveLocal,
} from "./js/models/base";
import { elements } from "./js/views/baseview";
import { searchMealController } from "./js/models/searchmodel";
import { urlSubCategory, showMore } from "./js/models/subcategories";
import { getEachMeal } from "./js/models/eachmeal";
import { displayMyRecipes } from "./js/views/myrecipeview";
import { addMyRecipe } from "./js/models/addmyrecipe";

function addMyRecipeController(name, instructions, ingredient) {
  const meal = addMyRecipe(name, instructions, ingredient);
  arrSaveMeal.push(meal);
  saveLocal(arrSaveMeal)
}

function myRecipesController() {
  arrSaveMeal.map(async (meal) => {
    const imgBlob = await blob(meal, "strMealThumb");
    displayMyRecipes(imgBlob, meal);
  });
  if (arrSaveMeal.length === 0) {
    const h2 = `<h2 class ="nothing">Nothing yet ...</h2>`;
    elements.categories.innerHTML = h2;
  }
}

function loadFunction(hash, property, callback) {
  const { state, category, meal, idMeal } = property;
  const urls = {
    home: function () {
      clear();
      elements.sectionTrend.classList.remove("not-display");
      elements.title.classList.add("not-display-title");
      modelHome();
    },
    [`${state}/${category}`]: function () {
      clear();
      elements.sectionTrend.classList.add("not-display");
      elements.title.classList.remove("not-display-title");
      elements.title.innerHTML = "";
      title(category);
      urlSubCategory(category);
    },
    [`${state}/${category}/${meal}/${idMeal}`]: function () {
      clear();
      elements.sectionTrend.classList.add("not-display");
      elements.title.classList.add("not-display-title");
      getEachMeal(idMeal);
    },
    myrecipes: function () {
      clear();
      elements.sectionTrend.classList.add("not-display");
      elements.title.classList.add("not-display-title");
      myRecipesController();
    },
  };
  callback(urls[hash]);
}

function getHash() {
  const hash = location.hash.substring(1);
  const url = hash.split("/");
  const [recipes, category, food, id] = url;
  const obj = {
    state: recipes,
    category: category,
    meal: food,
    idMeal: id,
  };
  if (!location.hash) {
    location.hash = "home";
  }
  loadFunction(hash, obj, (property) => property());
}

//events////////////////////////

elements.search.addEventListener("keyup", searchMealController);

window.addEventListener("hashchange", getHash);

document.addEventListener("DOMContentLoaded", function () {
  getHash();
});

elements.formMyRecipe.addEventListener("submit", (e) => {
  const name = elements.nameMyRecipe.value;
  const ingredient = elements.ingredients.value;
  const instructions = elements.instructions.value;
  elements.nameMyRecipe.value = "";
  elements.ingredients.value = "";
  elements.instructions.value = "";
  elements.previewImg.src = "";
  addMyRecipeController(name, instructions, ingredient);
  e.preventDefault();
});

elements.inputImg.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const url = URL.createObjectURL(file);
      elements.previewImg.src = url;
      elements.previewImg.setAttribute("data-url", url);
    });
    reader.readAsDataURL(file);
  } else {
    elements.previewImg.src = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.matches(".add__recipe")) {
    showModal();
  } else if (e.target.matches(".modal-recipe__close")) {
    closeModal();
  }
});

elements.iconSearch.addEventListener("click", () => {
  clearSearch();
  elements.search.value = "";
  elements.searchContent.style = "display: block";
});
elements.iconClose.addEventListener("click", () => {
  elements.searchContent.style = "display: none";
});

elements.searchContent.addEventListener("click", (e) => {
  const search = e.target.closest(".thumb_meal");
  if (search) {
    elements.searchContent.style = "display: none";
    const titleCategorie = document.querySelector(".title-categories");
    const titleSubCategorie = document.querySelector(".title-subcategorie");
    const buttonBack = document.getElementById("button_back");
    if (titleCategorie) titleCategorie.remove();
    if (titleSubCategorie) titleSubCategorie.remove();
    if (buttonBack) buttonBack.remove();
    eachMealController(search.dataset.meal);
  }
});

elements.sectionCategory.addEventListener("click", function (e) {
  const saveButton = e.target.closest("#savebut");
  const deleteButton = e.target.closest("#deletebut");
  if (saveButton) {
    saveMeal(arrSaveMeal, saveButton.dataset.id);
  }
  if (deleteButton) {
    deleteMeal(arrSaveMeal, deleteButton.dataset.id);
  }
});

const JD = {};

JD.debounce = function (func, wait, immediate) {
  var timeout;

  return function () {
    var context = this,
      args = arguments;

    var later = function () {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};

function scroll() {
  const element = document.querySelector(".section-categories");
  const iconTop = document.querySelector(".top");
  const show = window.scrollY + window.innerHeight - element.offsetHeight / 2;
  const isHalfShown = show > element.offsetTop;
  //progress bar
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / height) * 100;
  const progress = document.querySelector(".bar");
  progress.style = `width: ${scrolled}%`;

  if (isHalfShown && window.scrollY > 400) {
    iconTop.style = `position: fixed; 
      top: ${window.innerHeight - iconTop.offsetHeight}px; 
      right: 10px;
      opacity: 1;
      z-index: 1000`;
  } else {
    iconTop.style = `position: fixed; 
      top: ${window.innerHeight - iconTop.offsetHeight}px; 
      right: -50px;
      opacity: 0`;
  }
}

document.addEventListener("scroll", JD.debounce(scroll, 15, true));

document.querySelector(".top").addEventListener("click", function (e) {
  document.documentElement.style = "scroll-behavior: smooth;";
  document.documentElement.scrollTop = 0;
});

document.querySelector(".more").addEventListener("click", function () {
  showMore(urlSubCategory.arr);
});

const options = {
  root: null,
  rootMarin: 0,
  threshold: 0.4,
};
const callback = function (entries, observe) {
  const iconTopSvg = document.querySelector(".icon-top");
  entries.forEach((entrie) => {
    if (entrie.isIntersecting) {
      iconTopSvg.style = `
      stroke: black;
      fill: black;`;
    } else {
      iconTopSvg.style = `
      stroke: rgb(204, 204, 204);
      fill: rgb(204, 204, 204);`;
    }
  });
};
const observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector(".footer"));
