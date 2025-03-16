import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_KEY = process.env.SPOONACULAR_API_KEY;
  const { searchParams } = new URL(req.url);
  
  const diet = searchParams.get("diet") || "";
  const exclude = searchParams.get("exclude") || "";
  const targetCalories = searchParams.get("targetCalories") || "";

  const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&diet=${diet}&exclude=${exclude}&targetCalories=${targetCalories}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch meal plan");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
