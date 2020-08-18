import { blob } from "./base";
import { displayTrend } from "../views/trendingview";

export async function trendingMeal(res) {
  try {
    const imgBlob = await blob(...res.meals, "strMealThumb");
    displayTrend(imgBlob, ...res.meals);
  } catch (error) {
    console.error(error);
  }
}
