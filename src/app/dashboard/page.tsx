"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { data, isLoading, error } from "../db/dm";
import Link from "next/link";

const fetchMeals = async (ingredients: string) => {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
  console.log("url", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching meal plan");
  return res.json();
};

export default function DashboardPage() {
  const [diet, setDiet] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(false);

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["mealplan",  ingredients],
  //   queryFn: () => fetchMeals(ingredients),
  //   enabled: false,
  // });
  // console.log('mumble',data,isLoading,error,refetch)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    setQueryEnabled(true);
    // refetch();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Meal Prep</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Search for delicious and healthy meals tailored to your preferences.
        Click on a recipe to see full details and start planning your meals
        effortlessly!
      </p>
      <p>
        You can also{" "}
        <Link
          className="text-green-700 text-bold text-underline"
          href="/meal-plan"
        >
          Generate a Meal Plan
        </Link>
      </p>
      <form
        className="bg-white shadow-md p-6 rounded-md max-w-lg mx-auto"
        onSubmit={handleGenerate}
      >
        <label className="block mb-2">Available Ingredients</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List your ingredients here..."
          className="border p-2 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer hover:bg-green-700 transition duration-200"
        >
          Generate Random Meals
        </button>
      </form>

      {isLoading && <p className="mt-4 text-blue-500">Loading meal plan...</p>}
      {/* {error && <p className="mt-4 text-red-500">Error: {error.message}</p>} */}

      {/* Meal Plan Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {data?.map((meal: any) => (
          <div
            key={meal.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {meal.title}
              </h2>

              <button className="mt-4 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg w-full hover:bg-green-600 transition">
                <Link href={`/recipe/${meal.id}`}>View Recipe</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
