import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "chicken"; // Default search term

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch recipes");

    const data = await res.json();
    return NextResponse.json(data.results);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
