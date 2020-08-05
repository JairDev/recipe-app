import { clearLoad, blob, displayDivMore } from "./base";
import { displayMeals } from "../views/categoryview";

export async function categories(res) {
  try {
    res.resCategories.categories.map(async (meal) => {
      const imgBlob = await blob(meal, "strCategoryThumb");
      const obj = {
        img: imgBlob,
        food: meal,
      };
      displayMeals(obj);
    });
    displayDivMore(res.resCategories.categories);
    clearLoad();
  } catch (error) {
    console.error(error);
  }
}
