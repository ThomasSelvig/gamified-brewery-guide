import React from "react";
import { 
  List, 
  Award, 
  Trophy, 
  CheckCircle2, 
  PanelTop, 
  Edit 
} from "lucide-react";
import { RecipeInput } from "../../types";
import { calculateEstimatedABV } from "../../utils/timerUtils";

interface BrewingSidebarProps {
  recipeInput: RecipeInput;
  brewingProgress: number;
  level: number;
  experience: number;
  achievements: string[];
  brewStepCount: number;
  completedStepCount: number;
  showSidebar: boolean;
  setShowRecipeForm: (value: boolean) => void;
}

const BrewingSidebar: React.FC<BrewingSidebarProps> = ({
  recipeInput,
  brewingProgress,
  level,
  experience,
  achievements,
  brewStepCount,
  completedStepCount,
  showSidebar,
  setShowRecipeForm,
}) => {
  // Calculate estimated ABV
  const estimatedABV = calculateEstimatedABV(
    recipeInput.targetOriginalGravity, 
    recipeInput.targetFinalGravity
  );

  return (
    <div className={`md:w-1/4 ${showSidebar ? "block" : "hidden"} md:block`}>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-bold text-lg mb-2 text-amber-700 flex items-center">
          <List className="mr-2" />
          Brewing Progress
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-amber-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${brewingProgress}%` }}
            role="progressbar"
            aria-valuenow={brewingProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <div className="text-sm text-gray-600">
          {brewingProgress}% Complete
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-bold text-lg mb-2 text-amber-700 flex items-center">
          <Award className="mr-2" />
          Brewing Stats
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Level:</span>
            <span className="font-medium">{level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Experience:</span>
            <span className="font-medium">
              {experience}/{level * 100} XP
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Steps Completed:</span>
            <span className="font-medium">
              {completedStepCount}/{brewStepCount}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-bold text-lg mb-2 text-amber-700 flex items-center">
          <Trophy className="mr-2" />
          Achievements
        </h3>
        {achievements.length > 0 ? (
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-center text-sm bg-amber-50 p-2 rounded"
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-amber-600" />
                {achievement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No achievements yet. Keep brewing!
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-bold text-lg mb-2 text-amber-700 flex items-center">
          <PanelTop className="mr-2" />
          Brew Details
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <span className="font-medium block mb-1">Recipe Name:</span>
            <div className="bg-amber-50 p-2 rounded text-amber-800">
              {recipeInput.name}
            </div>
          </div>

          {/* Malt Bill */}
          <div>
            <span className="font-medium block mb-1">Malt Bill:</span>
            {recipeInput.malts.filter((m) => m.name.trim() !== "")
              .length > 0 ? (
              <ul className="pl-5 list-disc">
                {recipeInput.malts
                  .filter((malt) => malt.name.trim() !== "")
                  .map((malt, idx) => (
                    <li key={idx}>
                      {malt.name}: {malt.amount} {malt.unit}
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-gray-500 italic">
                No malts specified
              </div>
            )}
          </div>

          {/* Hop Schedule */}
          <div>
            <span className="font-medium block mb-1">
              Hop Schedule:
            </span>
            {recipeInput.hops.filter((h) => h.name.trim() !== "")
              .length > 0 ? (
              <ul className="pl-5 list-disc">
                {recipeInput.hops
                  .filter((hop) => hop.name.trim() !== "")
                  .map((hop, idx) => (
                    <li key={idx}>
                      {hop.name}: {hop.amount} {hop.unit} at{" "}
                      {hop.timing}
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-gray-500 italic">
                No hops specified
              </div>
            )}
          </div>

          {/* Other brewing details */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="col-span-2">
              <span className="font-medium">Yeast:</span>{" "}
              {recipeInput.yeast || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Water:</span>{" "}
              {recipeInput.initialWaterAmount}L
            </div>
            <div>
              <span className="font-medium">Actual:</span>{" "}
              {Math.max(recipeInput.initialWaterAmount - 3, 15)}L
            </div>
            <div>
              <span className="font-medium">Mash:</span>{" "}
              {recipeInput.mashTemp}°C
            </div>
            <div>
              <span className="font-medium">Boil:</span>{" "}
              {recipeInput.boilTemp}°C
            </div>
            <div>
              <span className="font-medium">Boil Time:</span>{" "}
              {recipeInput.boilTime} min
            </div>
            <div>
              <span className="font-medium">Est. ABV:</span>{" "}
              {estimatedABV}%
            </div>
            <div>
              <span className="font-medium">OG:</span>{" "}
              {recipeInput.targetOriginalGravity}
            </div>
            <div>
              <span className="font-medium">FG:</span>{" "}
              {recipeInput.targetFinalGravity}
            </div>
          </div>

          {recipeInput.notes && (
            <div>
              <span className="font-medium block mb-1">Notes:</span>
              <div className="bg-gray-50 p-2 rounded text-gray-700 text-xs">
                {recipeInput.notes}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowRecipeForm(true)}
            className="w-full bg-amber-100 text-amber-700 py-2 px-3 rounded text-sm hover:bg-amber-200 transition-colors mt-2 flex items-center justify-center"
          >
            <Edit className="mr-1 h-4 w-4" />
            Edit Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrewingSidebar;