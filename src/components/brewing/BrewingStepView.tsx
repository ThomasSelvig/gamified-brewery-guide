import React from "react";
import { Clock, Home, Check, ChefHat, Droplets, Hourglass } from "lucide-react";
import { BrewStep, ActiveTimer } from "../../types";
import { formatTime } from "../../utils/timerUtils";

interface BrewingStepViewProps {
  step: BrewStep;
  activeTimer: ActiveTimer | null;
  markSubstepComplete: (stepId: number, substepId: number) => void;
  startTimer: (stepId: number, substepId: number, duration: number) => void;
}

const BrewingStepView: React.FC<BrewingStepViewProps> = ({
  step,
  activeTimer,
  markSubstepComplete,
  startTimer,
}) => {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              step.category === "cleaning"
                ? "bg-blue-100 text-blue-700"
                : step.category === "brewing"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {step.category === "cleaning" ? (
              <Droplets className="h-5 w-5" />
            ) : step.category === "brewing" ? (
              <ChefHat className="h-5 w-5" />
            ) : (
              <Hourglass className="h-5 w-5" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </div>
      </div>

      {/* Image placeholder */}
      <div className="mb-6 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <Home className="mx-auto mb-2 h-10 w-10" />
          <p>Image for this step will be displayed here</p>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-3">Instructions:</h3>
      <ul className="space-y-4">
        {step.substeps.map((substep) => (
          <li
            key={substep.id}
            className="flex items-start"
            onClick={() => {
              if (!substep.completed) {
                markSubstepComplete(step.id, substep.id);
              }
            }}
          >
            <div className="mr-3 mt-0.5">
              {substep.completed ? (
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              ) : (
                <div
                  className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-amber-500 cursor-pointer"
                  aria-label={`Mark substep ${substep.id} complete`}
                ></div>
              )}
            </div>
            <div className="flex-1 cursor-pointer">
              <p
                className={`${
                  substep.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {substep.text}
              </p>

              {substep.hasTimer && !substep.completed && (
                <div className="mt-2">
                  {activeTimer &&
                  activeTimer.stepId === step.id &&
                  activeTimer.substepId === substep.id ? (
                    <div className="flex items-center bg-amber-50 text-amber-800 p-2 rounded">
                      <Clock className="mr-2 h-4 w-4" />
                      Time remaining: {formatTime(activeTimer.timeLeft)}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startTimer(
                          step.id,
                          substep.id,
                          substep.timerDuration || 60
                        );
                      }}
                      className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-sm hover:bg-amber-200 flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                      aria-label={`Start timer for ${formatTime(
                        substep.timerDuration || 60
                      )}`}
                    >
                      <Clock className="mr-1 h-4 w-4" />
                      Start Timer ({formatTime(substep.timerDuration || 60)})
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BrewingStepView;