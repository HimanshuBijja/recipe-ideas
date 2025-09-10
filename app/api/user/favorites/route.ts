import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Favorite } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const favorites = client.db("recipe-app").collection<Favorite>("favorites")

    const userFavorites = await favorites
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ favoritedAt: -1 })
      .toArray()

    return NextResponse.json(userFavorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mealId, mealName, mealThumb } = await request.json()

    if (!mealId || !mealName || !mealThumb) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const favorites = client.db("recipe-app").collection<Favorite>("favorites")

    // Check if already favorited
    const existing = await favorites.findOne({
      userId: new ObjectId(session.user.id),
      mealId,
    })

    if (existing) {
      return NextResponse.json({ error: "Recipe already favorited" }, { status: 400 })
    }

    const favorite: Omit<Favorite, "_id"> = {
      userId: new ObjectId(session.user.id),
      mealId,
      mealName,
      mealThumb,
      favoritedAt: new Date(),
    }

    const result = await favorites.insertOne(favorite)

    return NextResponse.json({ message: "Recipe favorited", id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error adding favorite:", error)
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
    const favorites = client.db("recipe-app").collection<Favorite>("favorites")

    const result = await favorites.deleteOne({
      userId: new ObjectId(session.user.id),
      mealId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Favorite removed" })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
