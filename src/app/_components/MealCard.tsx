import React from "react";

interface MealCardProps {
  meal: {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
  };
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 mb-4">
      <img
        src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
        alt={meal.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="font-semibold text-gray-700">{meal.title}</p>
        <p className="text-sm text-gray-500">
          {meal.readyInMinutes} min | {meal.servings} servings
        </p>
        <a
          href={meal.sourceUrl}
          target="_blank"
          className="mt-2 inline-block text-blue-600 font-medium hover:underline cursor-pointer"
          rel="noopener noreferrer"
        >
          View Recipe →
        </a>
      </div>
    </div>
  );
};

export default MealCard;
