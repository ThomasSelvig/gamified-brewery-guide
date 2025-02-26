import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  Thermometer,
  List,
  Hourglass,
  AlertCircle,
  Edit,
  Check,
  PanelTop,
  ChefHat,
  Home,
  Droplets,
  Settings,
  Trophy,
} from "lucide-react";

// Define types and interfaces
interface RecipeInput {
  name: string;
  malts: Array<{ name: string; amount: number; unit: string; timing?: string }>;
  hops: Array<{ name: string; amount: number; unit: string; timing: string }>;
  yeast: string;
  mashTemp: number;
  boilTemp: number;
  boilTime: number;
  targetOriginalGravity: number;
  targetFinalGravity: number;
}

interface BrewStep {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  substeps: Array<{
    id: number;
    text: string;
    completed: boolean;
    hasTimer?: boolean;
    timerDuration?: number;
  }>;
  category: "cleaning" | "brewing" | "fermentation";
  completed: boolean;
}

const App: React.FC = () => {
  // State for recipe input
  const [recipeInput, setRecipeInput] = useState<RecipeInput>({
    name: "My Brew",
    malts: [{ name: "", amount: 0, unit: "kg" }],
    hops: [{ name: "", amount: 0, unit: "g", timing: "" }],
    yeast: "",
    mashTemp: 68,
    boilTemp: 102,
    boilTime: 60,
    targetOriginalGravity: 1.05,
    targetFinalGravity: 1.01,
  });

  // State for UI
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showRecipeForm, setShowRecipeForm] = useState<boolean>(true);
  const [activeTimer, setActiveTimer] = useState<{
    stepId: number;
    substepId: number;
    timeLeft: number;
  } | null>(null);
  const [achievements, setAchievements] = useState<Array<string>>([]);
  const [brewingProgress, setBrewingProgress] = useState<number>(0);
  const [experience, setExperience] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [showTips, setShowTips] = useState<boolean>(true);
  const [brewSteps, setBrewSteps] = useState<BrewStep[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "cleaning" | "brewing" | "fermentation"
  >("all");

  // Initialize brewing steps based on the provided notes
  useEffect(() => {
    setBrewSteps([
      {
        id: 1,
        title: "Preparation",
        description: "Book a room and prepare your equipment",
        category: "cleaning",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Book a room at kristianiabrygg.no",
            completed: false,
          },
          {
            id: 2,
            text: "Prepare your recipe details and gather ingredients",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Cleaning",
        description: "Ensure all equipment is clean before brewing",
        category: "cleaning",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Check the pump for malt residue underneath",
            completed: false,
          },
          {
            id: 2,
            text: "Flush the pump hole for malt residue",
            completed: false,
          },
          {
            id: 3,
            text: "Brush the heating rods (can be done with fingers)",
            completed: false,
          },
          {
            id: 4,
            text: "Run Star-San solution (mixed with water) through the outlet",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Water Preparation",
        description: "Fill the brewing vessel with the right amount of water",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Fill with water. The marks on the rod show 15L, 20L, 25L. Always ensure heating rods are submerged.",
            completed: false,
          },
          {
            id: 2,
            text: "Remove about 5L for mashing, to be added back during sparging.",
            completed: false,
          },
        ],
      },
      {
        id: 4,
        title: "Malt Preparation",
        description: "Prepare the malts for brewing",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Grind the malt (note: 7-8kg is maximum malt capacity)",
            completed: false,
          },
        ],
      },
      {
        id: 5,
        title: "Temperature Setting",
        description: "Set and wait for the correct mashing temperature",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: `Set temperature to ${recipeInput.mashTemp}°C. Hold MANU (manual) and set temperature. H(eat), P(ump).`,
            completed: false,
          },
          {
            id: 2,
            text: "Wait until temperature gauge shows set temperature. Temperature is accurate when pump is on. There's also a temperature gauge by the door.",
            completed: false,
            hasTimer: true,
            timerDuration: 600, // 10 minutes as example
          },
          {
            id: 3,
            text: "Note: P(ump) must be turned off and on a couple of times before you hear it's working properly.",
            completed: false,
          },
        ],
      },
      {
        id: 6,
        title: "Mash Bucket Assembly - Part 1",
        description: "Prepare the mash bucket for mashing",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Put red rubber gasket in the kettle",
            completed: false,
          },
          {
            id: 2,
            text: "Insert filter bottom with filter on top",
            completed: false,
          },
          {
            id: 3,
            text: "Push down the bottom with a metal spoon",
            completed: false,
          },
        ],
      },
      {
        id: 7,
        title: "Add Malt",
        description: "Add your malts to the mash bucket",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Add malt to the mash bucket",
            completed: false,
          },
          {
            id: 2,
            text: "Note: Some malts (darker/more burnt) are added later in the process to avoid burning",
            completed: false,
          },
        ],
      },
      {
        id: 8,
        title: "Mash Bucket Assembly - Part 2",
        description: "Complete the mash bucket assembly",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Put on the (slightly larger) filter and the 'wheel'",
            completed: false,
          },
          { id: 2, text: "Screw on the side length pin", completed: false },
        ],
      },
      {
        id: 9,
        title: "Mashing Process",
        description: "Monitor and manage the mashing process",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Every 20 minutes, turn off the pump (for 1 minute) and then turn it back on, so that the malt settles differently",
            completed: false,
            hasTimer: true,
            timerDuration: 1200, // 20 minutes
          },
          {
            id: 2,
            text: "When mashing is finished, check if gravity has reached boil gravity",
            completed: false,
          },
          {
            id: 3,
            text: `Set temperature to ${recipeInput.boilTemp}°C for the boiling process`,
            completed: false,
          },
        ],
      },
      {
        id: 10,
        title: "Prepare for Sparging",
        description: "Prepare the mash bucket for the sparging process",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Remove top parts and rinse them as soon as possible",
            completed: false,
          },
          {
            id: 2,
            text: "Lift the bucket with metal rod (hook-like) onto metal rod 2 (square-like)",
            completed: false,
          },
        ],
      },
      {
        id: 11,
        title: "Sparging",
        description: "Rinse the grains to extract remaining sugars",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Sparge (rinse) over the malt until the bucket is approximately full",
            completed: false,
          },
        ],
      },
      {
        id: 12,
        title: "Cleaning During Boil Preparation",
        description: "Clean equipment while water is heating up",
        category: "cleaning",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Clean the fermentation bucket and Cornelius keg",
            completed: false,
          },
          {
            id: 2,
            text: "Take malt bucket over another white bucket to drain it, then use white spade to throw all malt into food waste bags",
            completed: false,
          },
        ],
      },
      {
        id: 13,
        title: "Boiling",
        description: "Boil the wort and add hops according to schedule",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: `Boil for ${recipeInput.boilTime} minutes (ADD HOPS according to schedule)`,
            completed: false,
            hasTimer: true,
            timerDuration: recipeInput.boilTime * 60,
          },
          {
            id: 2,
            text: "Note: The longer you boil hops, the more bitterness you get. The shorter, more aroma.",
            completed: false,
          },
          {
            id: 3,
            text: "Note: Our machines are not as efficient as recipes assume. The water boils off less, so add about 3L less water in total.",
            completed: false,
          },
        ],
      },
      {
        id: 14,
        title: "Cooling",
        description: "Cool the wort to pitching temperature",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Cool to 20°C (use temperature gauge, not the Speidel's)",
            completed: false,
          },
        ],
      },
      {
        id: 15,
        title: "Transfer to Fermentation Vessel",
        description: "Transfer the cooled wort to the fermentation vessel",
        category: "brewing",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Transfer to Star-San sanitized fermentation bucket",
            completed: false,
          },
          { id: 2, text: "Add YEAST and beer to the bucket", completed: false },
          {
            id: 3,
            text: "Attach lid, airlock (with Star-San) and red airlock lid",
            completed: false,
          },
          {
            id: 4,
            text: "Note: You should not ferment directly in Cornelius kegs because of sediment",
            completed: false,
          },
        ],
      },
      {
        id: 16,
        title: "Cleaning Equipment",
        description: "Clean all equipment after brewing",
        category: "cleaning",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "Clean equipment: Scrub gunk off all equipment with hot water",
            completed: false,
          },
          {
            id: 2,
            text: "Before draining sediment from the Speidel into the drain, dilute it so it doesn't clog the drain",
            completed: false,
          },
          {
            id: 3,
            text: "Clean Speidel: Brush off gunk, spray steel through the pump, turn upside down",
            completed: false,
          },
          {
            id: 4,
            text: "Note on cleaning products: Powder (PBW) = strong, liquid = Star-San. Craftsan is the brand. Star-San needs to be diluted.",
            completed: false,
          },
        ],
      },
      {
        id: 17,
        title: "Fermentation Monitoring",
        description: "Monitor the fermentation process",
        category: "fermentation",
        completed: false,
        substeps: [
          {
            id: 1,
            text: "After one week, check that it's fermenting (bubbles in airlock)",
            completed: false,
          },
          {
            id: 2,
            text: "Check that there's still Star-San in the airlock (not evaporated), if so add more",
            completed: false,
          },
          {
            id: 3,
            text: "Note: Cornelius keg connections: IN=TOP(gas), OUT=BOTTOM(liquid)",
            completed: false,
          },
          {
            id: 4,
            text: "Note: Gas regulator valve: CLOCKWISE = more gas, COUNTER-CLOCKWISE = less gas",
            completed: false,
          },
        ],
      },
    ]);
  }, [recipeInput.mashTemp, recipeInput.boilTemp, recipeInput.boilTime]);

  // Function to update recipe input
  const updateRecipeInput = (field: string, value: any) => {
    setRecipeInput((prev) => ({ ...prev, [field]: value }));
  };

  // Function to add malt to recipe
  const addMalt = () => {
    setRecipeInput((prev) => ({
      ...prev,
      malts: [...prev.malts, { name: "", amount: 0, unit: "kg" }],
    }));
  };

  // Function to update malt
  const updateMalt = (index: number, field: string, value: any) => {
    setRecipeInput((prev) => {
      const updatedMalts = [...prev.malts];
      updatedMalts[index] = { ...updatedMalts[index], [field]: value };
      return { ...prev, malts: updatedMalts };
    });
  };

  // Function to remove malt
  const removeMalt = (index: number) => {
    setRecipeInput((prev) => {
      const updatedMalts = [...prev.malts];
      updatedMalts.splice(index, 1);
      return { ...prev, malts: updatedMalts };
    });
  };

  // Function to add hop to recipe
  const addHop = () => {
    setRecipeInput((prev) => ({
      ...prev,
      hops: [...prev.hops, { name: "", amount: 0, unit: "g", timing: "" }],
    }));
  };

  // Function to update hop
  const updateHop = (index: number, field: string, value: any) => {
    setRecipeInput((prev) => {
      const updatedHops = [...prev.hops];
      updatedHops[index] = { ...updatedHops[index], [field]: value };
      return { ...prev, hops: updatedHops };
    });
  };

  // Function to remove hop
  const removeHop = (index: number) => {
    setRecipeInput((prev) => {
      const updatedHops = [...prev.hops];
      updatedHops.splice(index, 1);
      return { ...prev, hops: updatedHops };
    });
  };

  // Function to start a timer
  const startTimer = (stepId: number, substepId: number, duration: number) => {
    setActiveTimer({ stepId, substepId, timeLeft: duration });

    const timer = setInterval(() => {
      setActiveTimer((prev) => {
        if (!prev) return null;

        const timeLeft = prev.timeLeft - 1;

        if (timeLeft <= 0) {
          clearInterval(timer);
          // Play sound
          const audio = new Audio(
            "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-back-2575.mp3"
          );
          audio.play();
          // Award experience points when timer completes
          setExperience((prev) => prev + 10);
          return null;
        }

        return { ...prev, timeLeft };
      });
    }, 1000);
  };

  // Function to mark a step as completed
  const markSubstepComplete = (stepId: number, substepId: number) => {
    setBrewSteps((prev) => {
      const newSteps = [...prev];
      const stepIndex = newSteps.findIndex((s) => s.id === stepId);

      if (stepIndex !== -1) {
        const substepIndex = newSteps[stepIndex].substeps.findIndex(
          (ss) => ss.id === substepId
        );

        if (substepIndex !== -1) {
          newSteps[stepIndex].substeps[substepIndex].completed = true;

          // Check if all substeps are completed
          const allSubstepsCompleted = newSteps[stepIndex].substeps.every(
            (ss) => ss.completed
          );

          if (allSubstepsCompleted) {
            newSteps[stepIndex].completed = true;

            // Award experience points for completing a step
            setExperience((prev) => prev + 20);

            // Add achievement if it's a significant step
            if ([5, 9, 13, 17].includes(stepId)) {
              const achievementName = `Master of ${newSteps[stepIndex].title}`;
              if (!achievements.includes(achievementName)) {
                setAchievements((prev) => [...prev, achievementName]);
              }
            }
          }
        }
      }

      // Calculate overall progress
      const completedSteps = newSteps.filter((s) => s.completed).length;
      const totalSteps = newSteps.length;
      setBrewingProgress(Math.round((completedSteps / totalSteps) * 100));

      return newSteps;
    });
  };

  // Effect to level up when enough experience is gained
  useEffect(() => {
    const expThreshold = level * 100; // Simple level up formula
    if (experience >= expThreshold) {
      setLevel((prev) => prev + 1);
      setAchievements((prev) => [
        ...prev,
        `Reached Brewer Level ${level + 1}!`,
      ]);
    }
  }, [experience, level]);

  // Function to navigate to the next step
  const goToNextStep = () => {
    if (currentStep < brewSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Function to navigate to the previous step
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Function to start brewing (hide recipe form and show brewing steps)
  const startBrewing = () => {
    setShowRecipeForm(false);
    setAchievements((prev) => [...prev, "First Brew Started!"]);
    setExperience((prev) => prev + 5);
  };

  // Function to format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to filter steps by category
  const getFilteredSteps = () => {
    if (categoryFilter === "all") return brewSteps;
    return brewSteps.filter((step) => step.category === categoryFilter);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-amber-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <ChefHat className="mr-2" />
            BrewMaster Quest
          </h1>

          {!showRecipeForm && (
            <div className="flex items-center space-x-3">
              <div className="bg-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Trophy className="mr-1 h-4 w-4" />
                Level {level}
              </div>
              <div className="bg-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Award className="mr-1 h-4 w-4" />
                XP: {experience}/{level * 100}
              </div>
              <button
                onClick={() => setShowTips(!showTips)}
                className="bg-amber-800 p-2 rounded-full"
                aria-label="Toggle tips"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {showRecipeForm ? (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-amber-700 flex items-center">
              <Edit className="mr-2" />
              Create Your Brew Recipe
            </h2>

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
                  className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm hover:bg-amber-200 transition-colors"
                  aria-label="Add malt"
                >
                  + Add Malt
                </button>
              </div>

              {recipeInput.malts.map((malt, index) => (
                <div key={index} className="flex mb-2 space-x-2">
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
                    className="w-20 p-2 border border-gray-300 rounded"
                    placeholder="Amount"
                    min="0"
                    step="0.1"
                    aria-label={`Malt ${index + 1} amount`}
                  />
                  <select
                    value={malt.unit}
                    onChange={(e) => updateMalt(index, "unit", e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded"
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
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hops
                </label>
                <button
                  onClick={addHop}
                  className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm hover:bg-amber-200 transition-colors"
                  aria-label="Add hop"
                >
                  + Add Hop
                </button>
              </div>

              {recipeInput.hops.map((hop, index) => (
                <div key={index} className="flex mb-2 space-x-2">
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
                    className="w-16 p-2 border border-gray-300 rounded"
                    placeholder="Amount"
                    min="0"
                    step="0.1"
                    aria-label={`Hop ${index + 1} amount`}
                  />
                  <select
                    value={hop.unit}
                    onChange={(e) => updateHop(index, "unit", e.target.value)}
                    className="w-16 p-2 border border-gray-300 rounded"
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
                    className="w-32 p-2 border border-gray-300 rounded"
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

            <button
              onClick={startBrewing}
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Start Brewing Adventure!
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar with progress */}
            <div className="md:w-1/4">
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
                      {brewSteps.filter((step) => step.completed).length}/
                      {brewSteps.length}
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
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Recipe Name:</span>{" "}
                    {recipeInput.name}
                  </div>
                  <div>
                    <span className="font-medium">Mash Temp:</span>{" "}
                    {recipeInput.mashTemp}°C
                  </div>
                  <div>
                    <span className="font-medium">Boil Time:</span>{" "}
                    {recipeInput.boilTime} min
                  </div>
                  <div>
                    <span className="font-medium">Expected OG:</span>{" "}
                    {recipeInput.targetOriginalGravity}
                  </div>
                  <div>
                    <span className="font-medium">Expected FG:</span>{" "}
                    {recipeInput.targetFinalGravity}
                  </div>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="md:w-3/4">
              {/* Category filters */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      categoryFilter === "all"
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    All Steps
                  </button>
                  <button
                    onClick={() => setCategoryFilter("cleaning")}
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
                    onClick={() => setCategoryFilter("brewing")}
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
                    onClick={() => setCategoryFilter("fermentation")}
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
                  Step {currentStep + 1} of {getFilteredSteps().length}
                </div>

                <button
                  onClick={goToNextStep}
                  disabled={currentStep === getFilteredSteps().length - 1}
                  className={`flex items-center ${
                    currentStep === getFilteredSteps().length - 1
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
                <div className="mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        brewSteps[currentStep]?.category === "cleaning"
                          ? "bg-blue-100 text-blue-700"
                          : brewSteps[currentStep]?.category === "brewing"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {brewSteps[currentStep]?.category === "cleaning" ? (
                        <Droplets className="h-5 w-5" />
                      ) : brewSteps[currentStep]?.category === "brewing" ? (
                        <ChefHat className="h-5 w-5" />
                      ) : (
                        <Hourglass className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {brewSteps[currentStep]?.title}
                      </h2>
                      <p className="text-gray-600">
                        {brewSteps[currentStep]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="mb-6 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-gray-500 text-center p-4">
                    <Home className="mx-auto mb-2 h-10 w-10" />
                    <p>
                      Image for step {currentStep + 1} will be displayed here
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-3">Instructions:</h3>
                <ul className="space-y-4">
                  {brewSteps[currentStep]?.substeps.map((substep) => (
                    <li key={substep.id} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {substep.completed ? (
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              markSubstepComplete(
                                brewSteps[currentStep].id,
                                substep.id
                              )
                            }
                            className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            aria-label={`Mark substep ${substep.id} complete`}
                          ></button>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`${
                            substep.completed
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {substep.text}
                        </p>

                        {substep.hasTimer && !substep.completed && (
                          <div className="mt-2">
                            {activeTimer &&
                            activeTimer.stepId === brewSteps[currentStep].id &&
                            activeTimer.substepId === substep.id ? (
                              <div className="flex items-center bg-amber-50 text-amber-800 p-2 rounded">
                                <Clock className="mr-2 h-4 w-4" />
                                Time remaining:{" "}
                                {formatTime(activeTimer.timeLeft)}
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  startTimer(
                                    brewSteps[currentStep].id,
                                    substep.id,
                                    substep.timerDuration || 60
                                  )
                                }
                                className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-sm hover:bg-amber-200 flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                                aria-label={`Start timer for ${formatTime(
                                  substep.timerDuration || 60
                                )}`}
                              >
                                <Clock className="mr-1 h-4 w-4" />
                                Start Timer (
                                {formatTime(substep.timerDuration || 60)})
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips panel */}
              {showTips && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-amber-800 flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Brewing Tips & Notes
                    </h3>
                    <button
                      onClick={() => setShowTips(false)}
                      className="text-amber-800 hover:text-amber-600"
                      aria-label="Close tips panel"
                    >
                      &times;
                    </button>
                  </div>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        Our machines are not as efficient as recipes assume. The
                        water doesn't boil off as much, so add about 3L less
                        water in total.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        Machine UI: Hold MANU (manual) and set temperature.
                        H(eat), P(ump).
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        P(ump) must be turned off and on a couple of times
                        before you hear it's working properly.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        Cleaning products: Powder (PBW) = strong, liquid =
                        Star-San. Craftsan is the brand. Star-San needs to be
                        diluted.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        Some malts (darker/more burnt) are added later in the
                        process to avoid burning.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>7-8kg is the absolute maximum malt capacity.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        The longer you boil hops, the more bitterness you get.
                        Shorter boil times extract more aroma.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">•</div>
                      <p>
                        You should not ferment directly in Cornelius kegs
                        because of sediment.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>BrewMaster Quest - Learn brewing through gamified experience</p>
          <p className="mt-1 text-gray-400">
            Made with ❤️ for beer enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
