"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


type MealPlan = {
  diet: string;
  exclude: string;
  targetCalories: string;
};
type Meal = {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
}

const getMealPlan = async (pref: MealPlan) => {
  let { diet, exclude, targetCalories } = pref;
  diet = !diet ? (diet = "") : diet;
  exclude = !exclude ? (exclude = "") : exclude;
  targetCalories = !targetCalories ? (targetCalories = "2000") : targetCalories;
  const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&diet=${diet}&exclude=${exclude}&targetCalories=${targetCalories}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) return null; // Handle errors gracefully
  return res.json();
};
export default function MealPlanPage() {
  const [preferences, setPreferences] = useState({
    diet: "",
    exclude: "",
    targetCalories: "",
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["mealPlan", preferences],
    queryFn: () => getMealPlan(preferences),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };
 
console.log('data',data)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Meal Plan</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Generate a weekly meal plan based on your schedule and needs
      </p>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 mx-auto max-w-xl">
        <div>
          <label className="block font-semibold">Diet Preference:</label>
          <select
            name="diet"
            value={preferences.diet}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">
            Exclude Ingredients (comma-separated):
          </label>
          <input
            type="text"
            name="exclude"
            value={preferences.exclude}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            placeholder="e.g. peanuts, dairy"
          />
        </div>

        <div>
          <label className="block font-semibold">Target Calories:</label>
          <input
            type="number"
            name="targetCalories"
            value={preferences.targetCalories}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            placeholder="e.g. 2000"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Generate Meal Plan
        </button>
      </form>

      {isLoading && <p>Loading meal plan...</p>}
      {error && <p>Error loading meal plan</p>}

      {data?.week && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Object.keys(data.week).map((day) => (
            <div key={day} className="p-4 border rounded-md">
              <h2 className="font-semibold">{day.toUpperCase()}</h2>
              {data.week[day].meals.map((meal: Meal) => (
                <div key={meal.id} className="mt-2">
                  <p>{meal.title}</p>
                  <a
                    href={meal.sourceUrl}
                    target="_blank"
                    className="text-green-800 underline cursor-pointer"
                  >
                    View Recipe
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
