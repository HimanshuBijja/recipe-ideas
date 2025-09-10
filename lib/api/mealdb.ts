const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export interface Meal {
  idMeal: string
  strMeal: string
  strDrinkAlternate?: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags?: string
  strYoutube?: string
  [key: string]: string | undefined
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface Area {
  strArea: string
}

export interface Ingredient {
  idIngredient: string
  strIngredient: string
  strDescription?: string
  strType?: string
}

export const mealDbApi = {
  // Search meals by name
  searchByName: async (name: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`)
    const data = await response.json()
    return data.meals || []
  },

  // Get meal details by ID
  getMealById: async (id: string): Promise<Meal | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
    const data = await response.json()
    return data.meals?.[0] || null
  },

  // Get random meals
  getRandomMeals: async (count = 8): Promise<Meal[]> => {
    const promises = Array.from({ length: count }, () => fetch(`${BASE_URL}/random.php`).then((res) => res.json()))
    const results = await Promise.all(promises)
    return results.map((result) => result.meals[0]).filter(Boolean)
  },

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/categories.php`)
    const data = await response.json()
    return data.categories || []
  },

  // Get all areas
  getAreas: async (): Promise<Area[]> => {
    const response = await fetch(`${BASE_URL}/list.php?a=list`)
    const data = await response.json()
    return data.meals || []
  },

  // Get all ingredients
  getIngredients: async (): Promise<Ingredient[]> => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`)
    const data = await response.json()
    return data.meals || []
  },

  // Filter by category
  filterByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
    const data = await response.json()
    return data.meals || []
  },

  // Filter by area
  filterByArea: async (area: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`)
    const data = await response.json()
    return data.meals || []
  },

  // Filter by ingredient
  filterByIngredient: async (ingredient: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
    const data = await response.json()
    return data.meals || []
  },
}
