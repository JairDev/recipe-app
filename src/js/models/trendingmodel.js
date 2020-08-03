import { blob } from "./base";
import { displayTrend } from "../views/trendingview";

export async function trendingMeal(res) {
  try {
    const imgBlob = await blob(...res.resTrend.meals, "strMealThumb");
    displayTrend(imgBlob, ...res.resTrend.meals);
  } catch (error) {
    console.error(error);
  }
}
