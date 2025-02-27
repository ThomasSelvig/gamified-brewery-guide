import React from "react";
import { ArrowRight, ArrowLeft, ChefHat, Droplets, Hourglass } from "lucide-react";
import { BrewStep, CategoryFilter, ActiveTimer } from "../../types";
import BrewingStepView from "./BrewingStepView";

interface BrewingStepsProps {
  currentStep: number;
  brewSteps: BrewStep[];
  categoryFilter: CategoryFilter;
  activeTimer: ActiveTimer | null;
  markSubstepComplete: (stepId: number, substepId: number) => void;
  startTimer: (stepId: number, substepId: number, duration: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setFilterAndResetStep: (filter: CategoryFilter) => void;
}

const BrewingSteps: React.FC<BrewingStepsProps> = ({
  currentStep,
  brewSteps,
  categoryFilter,
  activeTimer,
  markSubstepComplete,
  startTimer,
  goToNextStep,
  goToPrevStep,
  setFilterAndResetStep,
}) => {
  const getFilteredSteps = () => {
    if (categoryFilter === "all") return brewSteps;
    return brewSteps.filter((step) => step.category === categoryFilter);
  };

  const filteredSteps = getFilteredSteps();
  const currentBrewStep = filteredSteps[currentStep];

  return (
    <>
      {/* Category filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterAndResetStep("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === "all"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All Steps
          </button>
          <button
            onClick={() => setFilterAndResetStep("cleaning")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === "cleaning"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <Droplets className="inline-block mr-1 h-4 w-4" />
            Cleaning
          </button>
          <button
            onClick={() => setFilterAndResetStep("brewing")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === "brewing"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <ChefHat className="inline-block mr-1 h-4 w-4" />
            Brewing
          </button>
          <button
            onClick={() => setFilterAndResetStep("fermentation")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === "fermentation"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <Hourglass className="inline-block mr-1 h-4 w-4" />
            Fermentation
          </button>
        </div>
      </div>

      {/* Step navigation */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
        <button
          onClick={goToPrevStep}
          disabled={currentStep === 0}
          className={`flex items-center ${
            currentStep === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-amber-700 hover:text-amber-900"
          }`}
        >
          <ArrowLeft className="mr-1" />
          Previous Step
        </button>

        <div className="text-sm font-medium">
          Step {currentStep + 1} of {filteredSteps.length}
        </div>

        <button
          onClick={goToNextStep}
          disabled={currentStep === filteredSteps.length - 1}
          className={`flex items-center ${
            currentStep === filteredSteps.length - 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-amber-700 hover:text-amber-900"
          }`}
        >
          Next Step
          <ArrowRight className="ml-1" />
        </button>
      </div>

      {/* Current step details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {currentBrewStep && (
          <BrewingStepView
            step={currentBrewStep}
            activeTimer={activeTimer}
            markSubstepComplete={markSubstepComplete}
            startTimer={startTimer}
          />
        )}
      </div>
    </>
  );
};

export default BrewingSteps;