import { loading, clearLoad, getMeal, blob } from './base'
import { displayMeals} from '../views/categoryview'
import { elements } from '../views/baseview'

export async function categories() {
  try {
    loading(elements.categories)
    const get = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const search = await getMeal(get)
    search.categories.map(async (meal) => {
      const imgBlob = await blob(meal, 'strCategoryThumb')
      const obj = {
        img: imgBlob,
        food: meal,
      }
      displayMeals(obj)
    })
    clearLoad()
  } catch (error) {
    console.error(error)
  }
}




