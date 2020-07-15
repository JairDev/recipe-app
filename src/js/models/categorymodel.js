import { loading, clearLoad, blobImgCategory, displayDivMore, title } from './base'
import { elements } from '../views/baseview'

const byCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";

export async function categories() {
  const arrCategories = []
  try {
    loading(elements.categories);
    const response = await fetch(byCategories);
    const data = await response.json();
    arrCategories.push(...data.categories);
    displayDivMore(arrCategories)
    arrCategories.map(category => {
      blobImgCategory(category);
    });
    clearLoad(elements.categories);
  } catch (error) {
    console.log(error);
  }
}




