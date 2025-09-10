import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { SavedRecipe } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const savedRecipes = client.db("recipe-app").collection<SavedRecipe>("savedRecipes")

    const userSavedRecipes = await savedRecipes
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ savedAt: -1 })
      .toArray()

    return NextResponse.json(userSavedRecipes)
  } catch (error) {
    console.error("Error fetching saved recipes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mealId, mealName, mealThumb, category, area } = await request.json()

    if (!mealId || !mealName || !mealThumb) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const savedRecipes = client.db("recipe-app").collection<SavedRecipe>("savedRecipes")

    // Check if already saved
    const existing = await savedRecipes.findOne({
      userId: new ObjectId(session.user.id),
      mealId,
    })

    if (existing) {
      return NextResponse.json({ error: "Recipe already saved" }, { status: 400 })
    }

    const savedRecipe: Omit<SavedRecipe, "_id"> = {
      userId: new ObjectId(session.user.id),
      mealId,
      mealName,
      mealThumb,
      category,
      area,
      savedAt: new Date(),
    }

    const result = await savedRecipes.insertOne(savedRecipe)

    return NextResponse.json({ message: "Recipe saved", id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error saving recipe:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const mealId = searchParams.get("mealId")

    if (!mealId) {
      return NextResponse.json({ error: "Missing mealId" }, { status: 400 })
    }

    const client = await clientPromise
    const savedRecipes = client.db("recipe-app").collection<SavedRecipe>("savedRecipes")

    const result = await savedRecipes.deleteOne({
      userId: new ObjectId(session.user.id),
      mealId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Saved recipe not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Saved recipe removed" })
  } catch (error) {
    console.error("Error removing saved recipe:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
