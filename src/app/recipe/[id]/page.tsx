import { notFound } from "next/navigation";


const fetchRecipe = async (id: string) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!res.ok) return null; // Handle errors gracefully
  return res.json();
};

async function fetchRecipeInstructions(recipeId: string) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  
  if (!res.ok) throw new Error("Failed to fetch instructions");

  return res.json();
}

export default async function RecipePage({ params }: {params: Promise<{ id:string }>}) {
  const {id} = await params
  const recipe = await fetchRecipe(id);
 
  
  const instructions = await fetchRecipeInstructions(id);
  

  if (!recipe) return notFound(); // Show Next.js 404 page if recipe is missing

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full rounded-lg mt-4 shadow-lg" />

      {/* Ingredients List */}
      <h2 className="text-lg font-semibold mt-6">Ingredients:</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {recipe.extendedIngredients.map((ing: { id: number; original: string; [key: string]: any }) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-lg font-semibold mt-6">Instructions:</h2>
      {instructions.length > 0 ? (
        <ol className="list-decimal list-inside space-y-2">
          {instructions[0].steps.map((step: { number: number; step: string; [key: string]: any }) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      ) : (
        <p>No instructions available.</p>
      )}
    </div>
  );
}
