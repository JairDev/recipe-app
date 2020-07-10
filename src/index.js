// import "core-js/stable";
import "regenerator-runtime/runtime";
import "./styles/main.scss";
import "./img/mediterranean-cuisine-2378758_1280.jpg";
import {
  clearSearch,
  state,
  clear,
  createButtonBack,
  saveMeal,
  blob,
  arrSaveMeal,
  objAddMeal,
  closeModal,
  showModal,
  deleteMeal,
  displayDivMore,
} from "./js/models/base";
import { elements } from "./js/views/baseview";
import { getMealSearch } from "./js/models/searchmodel";
import { trendingMeal } from "./js/models/trendingmodel";
import { categories } from "./js/models/categorymodel";
import {
  urlSubCategory,
  showMore,
  arrSubCategories,
} from "./js/models/subcategories";
import { getEachMeal } from "./js/models/eachmeal";
import { displayMyRecipes } from "./js/views/myrecipeview";
import { addMyRecipe } from "./js/models/addmyrecipe";
import { call } from "file-loader";

let subcategorieLog = "";

function addMyRecipeController(name, instructions, ingredient) {
  addMyRecipe(name, instructions, ingredient);
}

function searchMealController() {
  state.search = getMealSearch(this.value);
}

async function myRecipesController() {
  const trendingMeal = document.querySelector(".section-trend");
  const buttonBack = document.getElementById("button_back");
  const title = document.querySelector('.section-categories-title')
  title.innerHTML = ''
  if (trendingMeal) trendingMeal.style = "display: none";
  if (buttonBack) buttonBack.remove();
  clear();
  delete state.category;
  delete state.sub;
  delete state.each;
  state.myrecipe = await arrSaveMeal.map(meal => {
    blob(meal, displayMyRecipes);
  });
  if (arrSaveMeal.length === 0) {
    const h2 = `<h2 class ="nothing">Nothing yet ...</h2>`;
    elements.categories.innerHTML = h2;
  }
  displayDivMore(arrSaveMeal);
}

function loadFunction(property, callback) {
  const urlHash = property.split('/')
  const [category, meal] = urlHash
  // console.log('meal category>>', category)
  const urls = {
    [property]: function() {
      if(property === 'home') {
        elements.categories.innerHTML = ''
        categories()
      }else if(urlHash.length >= 2) {
        elements.categories.innerHTML = ''
        getEachMeal(meal)
      }else {
        elements.categories.innerHTML = ''
        urlSubCategory(property)
      }
    }
  }
  callback(urls[property])
  // console.log('property', property)
}

function getHash() {
  const hash = location.hash.substring(1)
  if(!location.hash) {
    location.hash = 'home'
  }
  loadFunction(hash, (property) => property())
  // console.log(hash)
}

//events////////////////////////

elements.search.addEventListener("change", searchMealController);
elements.search.addEventListener("keyup", searchMealController);

window.addEventListener('hashchange', getHash)
getHash()

window.addEventListener('load', function() {
  trendingMeal();
})

elements.iconHome.addEventListener("click", () => {
  const titleSubCategorie = document.querySelector(".title-subcategorie");
  const buttonBack = document.getElementById("button_back");
  if (createButtonBack.called) createButtonBack.called = false;
  if (titleSubCategorie) titleSubCategorie.remove();
  if (buttonBack) buttonBack.remove();
  delete state.myrecipe;
  delete state.sub;
  delete state.each;
  delete state.search;
  categoryController();
});

elements.formMyRecipe.addEventListener("submit", e => {
  elements.trend.style = "display: none";
  const buttonBack = document.getElementById("button_back");
  if (buttonBack) buttonBack.remove();
  const name = elements.nameMyRecipe.value;
  const ingredient = elements.ingredients.value;
  const instructions = elements.instructions.value;
  elements.nameMyRecipe.value = "";
  elements.ingredients.value = "";
  elements.instructions.value = "";
  elements.previewImg.src = "";
  addMyRecipeController(name, instructions, ingredient);
  closeModal();
  clear();
  myRecipesController();
  e.preventDefault();
});

elements.inputImg.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      elements.previewImg.src = reader.result;
      objAddMeal.strMealThumb = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    elements.previewImg.src = "";
  }
});

document.addEventListener("click", function(e) {
  if (e.target.matches(".add__recipe")) {
    showModal();
  } else if (e.target.matches(".modal-recipe__close")) {
    closeModal();
  }
});

elements.myRecipes.addEventListener("click", e => {
  myRecipesController();
});

elements.iconSearch.addEventListener("click", () => {
  clearSearch();
  elements.search.value = "";
  elements.searchContent.style = "display: block";
});
elements.iconClose.addEventListener("click", () => {
  elements.searchContent.style = "display: none";
});

elements.searchContent.addEventListener("click", e => {
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

elements.trend.addEventListener("click", function(e) {
  const trend = e.target.closest(".section-trend__content");
  if (trend) {
    eachMealController(trend.dataset.meal);
  }
});

elements.sectionCategory.addEventListener("click", function(e) {
  const sub = e.target.closest(".section-categories__content__categories");
  const each = e.target.closest(".section-categories__content__meals");
  const button = e.target.closest("#button_back");
  const saveButton = e.target.closest(".save_recipe");
  const deleteButton = e.target.closest(".button_delete");
  
  if (sub) {
    // console.log(sub)
    subCategoryController(sub.dataset.categorie);
    subcategorieLog = sub.dataset.categorie;
  }
  if (each) {
    eachMealController(each.dataset.meal);
  }
  if (saveButton) {
    saveMeal(arrSaveMeal, saveButton.dataset.id);
  }
  if (deleteButton) {
    deleteMeal(arrSaveMeal, deleteButton.dataset.idfood);
  }
  if (button && state.sub) {
    createButtonBack.called = false;
  } else if (button && state.each) {

  } else if (button && state.myrecipe) {
    myRecipesController();
  }
});

const JD = {};

JD.debounce = function(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this,
      args = arguments;

    var later = function() {
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

document.querySelector(".top").addEventListener("click", function(e) {
  document.documentElement.style = "scroll-behavior: smooth;";
  document.documentElement.scrollTop = 0;
});

document.querySelector(".more").addEventListener("click", function() {
  showMore();
});

const options = {
  root: null,
  rootMarin: 0,
  threshold: 0.4
};
const callback = function(entries, observe) {
  const iconTopSvg = document.querySelector(".icon-top");
  entries.forEach(entrie => {
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





