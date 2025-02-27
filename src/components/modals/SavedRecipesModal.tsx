import React from "react";
import { Download, Trash2 } from "lucide-react";
import { RecipeInput } from "../../types";
import { calculateEstimatedABV } from "../../utils/timerUtils";

interface SavedRecipesModalProps {
  showSavedRecipes: boolean;
  setShowSavedRecipes: (show: boolean) => void;
  savedRecipes: RecipeInput[];
  loadRecipe: (recipe: RecipeInput) => void;
  deleteRecipe: (recipeName: string) => void;
}

const SavedRecipesModal: React.FC<SavedRecipesModalProps> = ({
  showSavedRecipes,
  setShowSavedRecipes,
  savedRecipes,
  loadRecipe,
  deleteRecipe,
}) => {
  if (!showSavedRecipes) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-amber-700">
            Your Saved Recipes
          </h3>
          <button
            onClick={() => setShowSavedRecipes(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close saved recipes"
          >
            &times;
          </button>
        </div>

        {savedRecipes.length > 0 ? (
          <ul className="space-y-2">
            {savedRecipes.map((recipe, index) => (
              <li
                key={index}
                className="bg-gray-50 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{recipe.name}</p>
                  <p className="text-sm text-gray-600">
                    {recipe.malts.filter((m) => m.name).length} malts,
                    {recipe.hops.filter((h) => h.name).length} hops,
                    Est. ABV: {calculateEstimatedABV(recipe.targetOriginalGravity, recipe.targetFinalGravity)}%
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadRecipe(recipe)}
                    className="bg-amber-100 text-amber-700 p-2 rounded hover:bg-amber-200"
                    aria-label={`Load recipe ${recipe.name}`}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.name)}
                    className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200"
                    aria-label={`Delete recipe ${recipe.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No saved recipes found. Save a recipe to see it here.
          </p>
        )}

        <button
          onClick={() => setShowSavedRecipes(false)}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedRecipesModal;