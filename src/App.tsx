import React, { useState, useEffect } from "react";
import {
  Beer,
  Thermometer,
  Timer,
  Droplets,
  FlaskRound as Flask,
  Shield,
  ArrowDown,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

interface Recipe {
  name: string;
  style: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  specs: {
    originalGravity: string;
    finalGravity: string;
    abv: string;
    ibu: string;
    color: string;
  };
  ingredients: {
    malts: { name: string; amount: string }[];
    hops: { name: string; amount: string; timing: string }[];
    yeast: string;
  };
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  tasks: {
    id: number;
    task: string;
    completed: boolean;
  }[];
  temperature?: number;
  duration?: number;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const recipe: Recipe = {
    name: "Classic Amber Ale",
    style: "American Amber Ale",
    difficulty: "Intermediate",
    specs: {
      originalGravity: "1.052",
      finalGravity: "1.012",
      abv: "5.2%",
      ibu: "25",
      color: "12 SRM",
    },
    ingredients: {
      malts: [
        { name: "Pale Malt", amount: "4.5 kg" },
        { name: "Crystal 60L", amount: "0.45 kg" },
        { name: "Munich Malt", amount: "0.45 kg" },
      ],
      hops: [
        { name: "Cascade", amount: "28g", timing: "60 min" },
        { name: "Centennial", amount: "14g", timing: "15 min" },
      ],
      yeast: "Safale US-05 American Ale",
    },
  };

  const steps: Step[] = [
    {
      id: 1,
      title: "Preparation & Cleaning",
      description:
        "First things first - let's make sure everything is spotless! A clean brewery is a happy brewery.",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      image:
        "https://images.unsplash.com/photo-1585936369668-9e37fbe4a359?auto=format&fit=crop&w=800&q=80",
      tasks: [
        { id: 1, task: "Check pump for malt residue", completed: false },
        { id: 2, task: "Flush pump holes thoroughly", completed: false },
        { id: 3, task: "Clean heating elements", completed: false },
        { id: 4, task: "Run Star-san through system", completed: false },
      ],
    },
    {
      id: 2,
      title: "Water Setup",
      description:
        "Time to get the perfect amount of water ready for our brew!",
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      image:
        "https://images.unsplash.com/photo-1548865166-bf52b56e0771?auto=format&fit=crop&w=800&q=80",
      temperature: 65,
      tasks: [
        { id: 1, task: "Add 22L initial water", completed: false },
        { id: 2, task: "Reserve 5L for mashing", completed: false },
        { id: 3, task: "Note: Total target is 27L", completed: false },
      ],
    },
    {
      id: 3,
      title: "Mashing",
      description:
        "The crucial step where we extract those sweet, sweet sugars from the malt.",
      icon: <Flask className="w-8 h-8 text-amber-500" />,
      image:
        "https://images.unsplash.com/photo-1558642891-54be180ea339?auto=format&fit=crop&w=800&q=80",
      temperature: 67,
      duration: 60,
      tasks: [
        { id: 1, task: "Mount red rubber in kettle", completed: false },
        { id: 2, task: "Place filter bottom with filter", completed: false },
        { id: 3, task: "Add malt (max 7-8kg)", completed: false },
        {
          id: 4,
          task: "Mount top system with filter and wheel",
          completed: false,
        },
        {
          id: 5,
          task: "Pump every 20 minutes (1 min pause)",
          completed: false,
        },
      ],
    },
    {
      id: 4,
      title: "Boiling",
      description: "Watch the magic happen as we boil and add hops!",
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      image:
        "https://images.unsplash.com/photo-1615332579037-3c44b3660b53?auto=format&fit=crop&w=800&q=80",
      temperature: 102,
      duration: 60,
      tasks: [
        { id: 1, task: "Reach boiling temperature (102°C)", completed: false },
        { id: 2, task: "Add hops according to recipe", completed: false },
        { id: 3, task: "Maintain rolling boil", completed: false },
      ],
    },
    {
      id: 5,
      title: "Cooling & Fermentation",
      description: "Cool it down and let the yeast do its thing!",
      icon: <Timer className="w-8 h-8 text-green-500" />,
      image:
        "https://images.unsplash.com/photo-1562529024-9e7f8b99d5a4?auto=format&fit=crop&w=800&q=80",
      temperature: 20,
      tasks: [
        { id: 1, task: "Cool to 20°C", completed: false },
        {
          id: 2,
          task: "Clean fermentation bucket with Star-san",
          completed: false,
        },
        { id: 3, task: "Add yeast", completed: false },
        { id: 4, task: "Mount airlock with Star-san", completed: false },
      ],
    },
  ];

  const toggleTask = (stepIndex: number, taskId: number) => {
    const newSteps = [...steps];
    const taskIndex = newSteps[stepIndex].tasks.findIndex(
      (t) => t.id === taskId
    );
    newSteps[stepIndex].tasks[taskIndex].completed =
      !newSteps[stepIndex].tasks[taskIndex].completed;

    // Calculate progress
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedTasks = steps.reduce(
      (acc, step) => acc + step.tasks.filter((t) => t.completed).length,
      0
    );
    setProgress((completedTasks / totalTasks) * 100);
  };

  const getStepProgress = (step: Step) => {
    const completedTasks = step.tasks.filter((t) => t.completed).length;
    return (completedTasks / step.tasks.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-amber-600 text-white py-6 px-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Beer className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl font-bold">{recipe.name}</h1>
          </div>
          <div className="text-lg">Progress: {Math.round(progress)}%</div>
        </div>
      </header>

      {/* Recipe Information */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">
              Recipe Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  Specifications
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Style:</span> {recipe.style}
                  </p>
                  <p>
                    <span className="font-medium">Difficulty:</span>{" "}
                    {recipe.difficulty}
                  </p>
                  <p>
                    <span className="font-medium">Original Gravity:</span>{" "}
                    {recipe.specs.originalGravity}
                  </p>
                  <p>
                    <span className="font-medium">Final Gravity:</span>{" "}
                    {recipe.specs.finalGravity}
                  </p>
                  <p>
                    <span className="font-medium">ABV:</span> {recipe.specs.abv}
                  </p>
                  <p>
                    <span className="font-medium">IBU:</span> {recipe.specs.ibu}
                  </p>
                  <p>
                    <span className="font-medium">Color:</span>{" "}
                    {recipe.specs.color}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  Ingredients
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Malts</h4>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.malts.map((malt, index) => (
                        <li key={index}>
                          {malt.name} ({malt.amount})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Hops</h4>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.hops.map((hop, index) => (
                        <li key={index}>
                          {hop.name} ({hop.amount}) @ {hop.timing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Yeast</h4>
                    <p>{recipe.ingredients.yeast}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative transform transition-all duration-500 ${
                index === currentStep ? "scale-100" : "scale-95 opacity-90"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Step Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {step.icon}
                      <h2 className="text-xl font-semibold text-gray-800">
                        {step.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 mb-6">{step.description}</p>

                    {(step.temperature || step.duration) && (
                      <div className="flex gap-6 mb-6">
                        {step.temperature && (
                          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-md">
                            <Thermometer className="w-5 h-5 text-blue-500" />
                            <span className="text-blue-700">
                              {step.temperature}°C
                            </span>
                          </div>
                        )}
                        {step.duration && (
                          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-md">
                            <Timer className="w-5 h-5 text-green-500" />
                            <span className="text-green-700">
                              {step.duration} minutes
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-3">
                      {step.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                            task.completed
                              ? "bg-green-50 border-l-4 border-green-500"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => toggleTask(index, task.id)}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span
                            className={
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-700"
                            }
                          >
                            {task.task}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${getStepProgress(step)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step Image */}
                  <div className="md:w-1/3 relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => setSelectedImage(step.image)}
                    />
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowDown className="w-6 h-6 text-amber-500 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>Happy brewing! Remember to take notes and have fun! 🍺</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
