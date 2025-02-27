import React from "react";
import { Edit, Plus, AlertCircle, Download, BookOpen } from "lucide-react";
import { RecipeInput } from "../../types";

interface RecipeFormProps {
  recipeInput: RecipeInput;
  updateRecipeInput: (field: string, value: any) => void;
  addMalt: () => void;
  updateMalt: (index: number, field: string, value: any) => void;
  removeMalt: (index: number) => void;
  addHop: () => void;
  updateHop: (index: number, field: string, value: any) => void;
  removeHop: (index: number) => void;
  startBrewing: () => void;
  saveRecipe: () => void;
  generateShareableLink: () => void;
  showImportForm: boolean;
  setShowImportForm: (value: boolean) => void;
  savedRecipes: RecipeInput[];
  setShowSavedRecipes: (value: boolean) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeInput,
  updateRecipeInput,
  addMalt,
  updateMalt,
  removeMalt,
  addHop,
  updateHop,
  removeHop,
  startBrewing,
  saveRecipe,
  generateShareableLink,
  showImportForm,
  setShowImportForm,
  savedRecipes,
  setShowSavedRecipes,
}) => {
  // Calculate total malt weight
  const totalMaltWeight = recipeInput.malts.reduce((sum, malt) => {
    if (malt.unit === "kg") {
      return sum + malt.amount;
    } else if (malt.unit === "g") {
      return sum + malt.amount / 1000;
    }
    return sum;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-700 flex items-center">
          <Edit className="mr-2" />
          Create Your Brew Recipe
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowImportForm(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
            aria-label="Import recipe"
          >
            <Download className="mr-1 h-4 w-4" />
            Import
          </button>
          {savedRecipes.length > 0 && (
            <button
              onClick={() => setShowSavedRecipes(true)}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center"
              aria-label="Load recipe"
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Load ({savedRecipes.length})
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="brewName"
        >
          Brew Name
        </label>
        <input
          id="brewName"
          type="text"
          value={recipeInput.name}
          onChange={(e) => updateRecipeInput("name", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="e.g., Hoppy IPA"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Malts
          </label>
          <button
            onClick={addMalt}
            className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm hover:bg-amber-200 transition-colors flex items-center"
            aria-label="Add malt"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Malt
          </button>
        </div>

        {recipeInput.malts.map((malt, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row mb-2 space-y-2 md:space-y-0 md:space-x-2"
          >
            <input
              type="text"
              value={malt.name}
              onChange={(e) => updateMalt(index, "name", e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Malt name"
              aria-label={`Malt ${index + 1} name`}
            />
            <input
              type="number"
              value={malt.amount}
              onChange={(e) =>
                updateMalt(index, "amount", parseFloat(e.target.value))
              }
              className="w-full md:w-20 p-2 border border-gray-300 rounded"
              placeholder="Amount"
              min="0"
              step="0.1"
              aria-label={`Malt ${index + 1} amount`}
            />
            <select
              value={malt.unit}
              onChange={(e) => updateMalt(index, "unit", e.target.value)}
              className="w-full md:w-20 p-2 border border-gray-300 rounded"
              aria-label={`Malt ${index + 1} unit`}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
            </select>
            <button
              onClick={() => removeMalt(index)}
              className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition-colors"
              aria-label={`Remove malt ${index + 1}`}
            >
              &times;
            </button>
          </div>
        ))}
        {totalMaltWeight > 8 && (
          <div className="text-red-600 text-sm mt-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Warning: Total malt weight ({totalMaltWeight.toFixed(2)} kg)
            exceeds maximum capacity (8kg)
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Hops
          </label>
          <button
            onClick={addHop}
            className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm hover:bg-amber-200 transition-colors flex items-center"
            aria-label="Add hop"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Hop
          </button>
        </div>

        {recipeInput.hops.map((hop, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row mb-2 space-y-2 md:space-y-0 md:space-x-2"
          >
            <input
              type="text"
              value={hop.name}
              onChange={(e) => updateHop(index, "name", e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Hop name"
              aria-label={`Hop ${index + 1} name`}
            />
            <input
              type="number"
              value={hop.amount}
              onChange={(e) =>
                updateHop(index, "amount", parseFloat(e.target.value))
              }
              className="w-full md:w-16 p-2 border border-gray-300 rounded"
              placeholder="Amount"
              min="0"
              step="0.1"
              aria-label={`Hop ${index + 1} amount`}
            />
            <select
              value={hop.unit}
              onChange={(e) => updateHop(index, "unit", e.target.value)}
              className="w-full md:w-16 p-2 border border-gray-300 rounded"
              aria-label={`Hop ${index + 1} unit`}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="oz">oz</option>
            </select>
            <input
              type="text"
              value={hop.timing}
              onChange={(e) => updateHop(index, "timing", e.target.value)}
              className="w-full md:w-32 p-2 border border-gray-300 rounded"
              placeholder="e.g., 60 min"
              aria-label={`Hop ${index + 1} timing`}
            />
            <button
              onClick={() => removeHop(index)}
              className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition-colors"
              aria-label={`Remove hop ${index + 1}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="yeast"
          >
            Yeast
          </label>
          <input
            id="yeast"
            type="text"
            value={recipeInput.yeast}
            onChange={(e) => updateRecipeInput("yeast", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Yeast strain"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="initialWater"
          >
            Initial Water Amount (L)
          </label>
          <input
            id="initialWater"
            type="number"
            value={recipeInput.initialWaterAmount}
            onChange={(e) =>
              updateRecipeInput(
                "initialWaterAmount",
                parseInt(e.target.value)
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="15"
            max="30"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="mashTemp"
          >
            Mash Temperature (°C)
          </label>
          <input
            id="mashTemp"
            type="number"
            value={recipeInput.mashTemp}
            onChange={(e) =>
              updateRecipeInput("mashTemp", parseInt(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="50"
            max="80"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="boilTemp"
          >
            Boil Temperature (°C)
          </label>
          <input
            id="boilTemp"
            type="number"
            value={recipeInput.boilTemp}
            onChange={(e) =>
              updateRecipeInput("boilTemp", parseInt(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="95"
            max="105"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="boilTime"
          >
            Boil Time (minutes)
          </label>
          <input
            id="boilTime"
            type="number"
            value={recipeInput.boilTime}
            onChange={(e) =>
              updateRecipeInput("boilTime", parseInt(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="30"
            max="120"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="targetOG"
          >
            Target Original Gravity
          </label>
          <input
            id="targetOG"
            type="number"
            value={recipeInput.targetOriginalGravity}
            onChange={(e) =>
              updateRecipeInput(
                "targetOriginalGravity",
                parseFloat(e.target.value)
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="1.010"
            max="1.120"
            step="0.001"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="targetFG"
          >
            Target Final Gravity
          </label>
          <input
            id="targetFG"
            type="number"
            value={recipeInput.targetFinalGravity}
            onChange={(e) =>
              updateRecipeInput(
                "targetFinalGravity",
                parseFloat(e.target.value)
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            min="1.000"
            max="1.030"
            step="0.001"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="notes"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          value={recipeInput.notes || ""}
          onChange={(e) => updateRecipeInput("notes", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Any additional notes about this recipe"
          rows={3}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={startBrewing}
          className="flex-1 bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <Edit className="mr-2 h-5 w-5" />
          Start Brewing Adventure!
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={saveRecipe}
          className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <Download className="mr-2 h-5 w-5" />
          Save Recipe
        </button>
        <button
          onClick={generateShareableLink}
          className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <Download className="mr-2 h-5 w-5" />
          Share Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;