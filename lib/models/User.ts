import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  name?: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface SavedRecipe {
  _id?: ObjectId
  userId: ObjectId
  mealId: string
  mealName: string
  mealThumb: string
  category?: string
  area?: string
  savedAt: Date
}

export interface Favorite {
  _id?: ObjectId
  userId: ObjectId
  mealId: string
  mealName: string
  mealThumb: string
  favoritedAt: Date
}

export interface RecentSearch {
  _id?: ObjectId
  userId: ObjectId
  searchTerm: string
  searchedAt: Date
}
