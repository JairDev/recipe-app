import { elements } from "./baseview";

export function displayMeals(obj, category, hash) {
  const html = `
  <div class="section-categories__content__categories">
    <a href="#recipes/${obj.food.strCategory || category}${hash || ""}${
    obj.food.strMeal || ""
  }${hash || ""}${obj.food.idMeal || ""}" class="link_categories">
      <img alt="" src="${obj.img}">
      <span class="text-category">${
        obj.food.strCategory || obj.food.strMeal
      }</span>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("beforeend", html);
}
