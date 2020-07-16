import { elements } from "./baseview";

export function displayMeals(imgUrl, category) {
  const html = `
  <div class="section-categories__content__categories" data-categorie="${category.strCategory}">
    <a href="#recipes/${category.strCategory}" data="${category.strCategory}" class="link_categories">
      <img alt="${category.strCategory}" src="${imgUrl}">
      <span class="text-category">${category.strCategory}</span>
    </a>
  </div>
    `;
  elements.categories.insertAdjacentHTML("afterbegin", html);
}
