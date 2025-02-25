import React, { useState, useEffect } from "react";
import {
  Beer,
  FlaskConical,
  Wheat,
  Hop,
  XCircle,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Thermometer,
  Timer,
  Gauge,
  Save,
  Download,
  Trash2,
  Droplet,
} from "lucide-react";

interface Malt {
  type: string;
  amount: number;
}

interface Hop {
  type: string;
  amount: number;
  boilTime: number;
}

interface Recipe {
  name: string;
  mashTemp: number;
  expectedOG: number;
  expectedFG: number;
  waterAmount: number;
  malts: Malt[];
  hops: Hop[];
  yeastType: string;
  fermentationTemp: number;
  boilTime: number;
}

interface Step {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tasks: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  info?: {
    title: string;
    content: string[];
  }[];
  isExpanded: boolean;
}

function App() {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "Amber Ale",
    mashTemp: 67,
    expectedOG: 1.052,
    expectedFG: 1.012,
    waterAmount: 20,
    malts: [
      { type: "Pale Ale Malt", amount: 4.5 },
      { type: "Munich Malt", amount: 1.0 },
      { type: "Crystal 60L", amount: 0.5 },
    ],
    hops: [
      { type: "East Kent Goldings", amount: 30, boilTime: 60 },
      { type: "Fuggles", amount: 15, boilTime: 15 },
    ],
    yeastType: "American Ale Yeast",
    fermentationTemp: 20,
    boilTime: 60,
  });

  const [editingRecipe, setEditingRecipe] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Prerequisites & Equipment",
      description:
        "Before we begin our brewing journey, let's ensure we have everything we need.",
      imageUrl:
        "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=1000",
      isExpanded: true,
      info: [
        {
          title: "Location",
          content: [
            "Kristiania Bryggeri",
            "Book your session at kristianiabrygg.no",
          ],
        },
        {
          title: "Required Equipment",
          content: [
            "20L Speidel brewing system",
            "Mash bucket with 2 filters",
            "Fermentation bucket",
            "Cornelius keg",
            "Temperature meter",
          ],
        },
        {
          title: "Costs",
          content: [
            "Guild Member: Malt (Free), Yeast (50kr), Hops (Free)",
            "Private: Malt (100kr), Yeast (50kr), Hops (Free)",
          ],
        },
      ],
      tasks: [],
    },
    {
      id: 2,
      title: "Quest 1: The Sacred Cleansing Ritual",
      description:
        "A clean brewery is essential for great beer. Let's prepare our equipment.",
      imageUrl:
        "https://images.unsplash.com/photo-1585936369668-cb58d314c958?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Check pump for grain residue", completed: false },
        { id: 2, text: "Flush pump openings thoroughly", completed: false },
        { id: 3, text: "Clean heating elements", completed: false },
        {
          id: 4,
          text: "Run Star-san solution through the system",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Quest 2: The Water Ceremony",
      description:
        "Water is the foundation of our brew. Precise measurements are crucial.",
      imageUrl:
        "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      info: [
        {
          title: "Water Measurements",
          content: [
            `Total required: ${recipe.waterAmount} liters`,
            `Initial amount: ${(recipe.waterAmount * 0.8).toFixed(1)} liters`,
            "Note: Adjust based on recipe and system requirements",
            `Reserve ${(recipe.waterAmount * 0.2).toFixed(
              1
            )} liters for sparging`,
          ],
        },
      ],
      tasks: [],
    },
    {
      id: 4,
      title: "Quest 3: The Mashing Adventure",
      description:
        "Time to combine our ingredients and begin the transformation!",
      imageUrl:
        "https://images.unsplash.com/photo-1558642891-54be180ea339?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Mount red rubber in kettle", completed: false },
        { id: 2, text: "Install filter bottom with filter", completed: false },
        { id: 3, text: "Add malt (max 7-8kg)", completed: false },
        {
          id: 4,
          text: "Mount top system with filter and wheel",
          completed: false,
        },
      ],
      info: [
        {
          title: "Mashing Details",
          content: [
            `Target Temperature: ${recipe.mashTemp}°C`,
            "Pump every 20 minutes",
            "Turn off pump for 1 minute during each interval",
            `Expected Original Gravity: ${recipe.expectedOG}`,
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Quest 4: The Sacred Boil",
      description:
        "Watch as our potion reaches its boiling point and transforms!",
      imageUrl:
        "https://images.unsplash.com/photo-1615332579037-3c44b3660b53?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Reach temperature of 102°C", completed: false },
        {
          id: 2,
          text: `Maintain boil for ${recipe.boilTime} minutes`,
          completed: false,
        },
        {
          id: 3,
          text: "Add hops according to schedule below",
          completed: false,
        },
      ],
      info: [
        {
          title: "Hop Schedule",
          content: recipe.hops.map(
            (hop) =>
              `Add ${hop.amount}g of ${hop.type} at ${hop.boilTime} minutes remaining`
          ),
        },
      ],
    },
    {
      id: 6,
      title: "Quest 5: The Cooling Challenge",
      description:
        "Patience, young brewer! We must cool our potion to the perfect temperature.",
      imageUrl:
        "https://images.unsplash.com/photo-1583743089695-4b816a340f82?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        {
          id: 1,
          text: `Cool to ${recipe.fermentationTemp}°C`,
          completed: false,
        },
        {
          id: 2,
          text: "Use external thermometer for accuracy",
          completed: false,
        },
      ],
    },
    {
      id: 7,
      title: "Final Quest: The Fermentation Ritual",
      description:
        "The final transformation begins as we summon the power of yeast!",
      imageUrl:
        "https://images.unsplash.com/photo-1562529024-9e7f8b99d5a4?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        {
          id: 1,
          text: "Clean fermentation bucket with Star-san",
          completed: false,
        },
        { id: 2, text: `Add ${recipe.yeastType}`, completed: false },
        { id: 3, text: "Mount airlock with Star-san", completed: false },
      ],
      info: [
        {
          title: "Fermentation Details",
          content: [
            "Check for bubbling after 7 days",
            "Monitor Star-san level in airlock",
            "Ensure airlock remains properly sealed",
            `Target Final Gravity: ${recipe.expectedFG}`,
            `Maintain temperature at ${recipe.fermentationTemp}°C`,
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    setSavedRecipes(recipes);
  }, []);

  useEffect(() => {
    // Update steps when recipe changes
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === 3) {
          return {
            ...step,
            info: [
              {
                title: "Water Measurements",
                content: [
                  `Total required: ${recipe.waterAmount} liters`,
                  `Initial amount: ${(recipe.waterAmount * 0.8).toFixed(
                    1
                  )} liters`,
                  "Note: Adjust based on recipe and system requirements",
                  `Reserve ${(recipe.waterAmount * 0.2).toFixed(
                    1
                  )} liters for sparging`,
                ],
              },
            ],
          };
        }
        if (step.id === 4) {
          return {
            ...step,
            info: [
              {
                title: "Mashing Details",
                content: [
                  `Target Temperature: ${recipe.mashTemp}°C`,
                  "Pump every 20 minutes",
                  "Turn off pump for 1 minute during each interval",
                  `Expected Original Gravity: ${recipe.expectedOG}`,
                ],
              },
            ],
          };
        }
        if (step.id === 5) {
          return {
            ...step,
            tasks: [
              { id: 1, text: "Reach temperature of 102°C", completed: false },
              {
                id: 2,
                text: `Maintain boil for ${recipe.boilTime} minutes`,
                completed: false,
              },
              {
                id: 3,
                text: "Add hops according to schedule below",
                completed: false,
              },
            ],
            info: [
              {
                title: "Hop Schedule",
                content: recipe.hops.map(
                  (hop) =>
                    `Add ${hop.amount}g of ${hop.type} at ${hop.boilTime} minutes remaining`
                ),
              },
            ],
          };
        }
        if (step.id === 6) {
          return {
            ...step,
            tasks: [
              {
                id: 1,
                text: `Cool to ${recipe.fermentationTemp}°C`,
                completed: false,
              },
              {
                id: 2,
                text: "Use external thermometer for accuracy",
                completed: false,
              },
            ],
          };
        }
        if (step.id === 7) {
          return {
            ...step,
            tasks: [
              {
                id: 1,
                text: "Clean fermentation bucket with Star-san",
                completed: false,
              },
              { id: 2, text: `Add ${recipe.yeastType}`, completed: false },
              { id: 3, text: "Mount airlock with Star-san", completed: false },
            ],
            info: [
              {
                title: "Fermentation Details",
                content: [
                  "Check for bubbling after 7 days",
                  "Monitor Star-san level in airlock",
                  "Ensure airlock remains properly sealed",
                  `Target Final Gravity: ${recipe.expectedFG}`,
                  `Maintain temperature at ${recipe.fermentationTemp}°C`,
                ],
              },
            ],
          };
        }
        return step;
      })
    );
  }, [recipe]);

  const toggleStep = (stepId: number) => {
    setSteps(
      steps.map((step) => ({
        ...step,
        isExpanded: step.id === stepId ? !step.isExpanded : step.isExpanded,
      }))
    );
  };

  const toggleTask = (stepId: number, taskId: number) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            tasks: step.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          };
        }
        return step;
      })
    );
  };

  const calculateProgress = (step: Step) => {
    if (step.tasks.length === 0) return 100;
    const completed = step.tasks.filter((task) => task.completed).length;
    return (completed / step.tasks.length) * 100;
  };

  const totalProgress = () => {
    const stepsWithTasks = steps.filter((step) => step.tasks.length > 0);
    if (stepsWithTasks.length === 0) return 100;

    const totalTasks = stepsWithTasks.reduce(
      (acc, step) => acc + step.tasks.length,
      0
    );
    const completedTasks = stepsWithTasks.reduce(
      (acc, step) => acc + step.tasks.filter((task) => task.completed).length,
      0
    );
    return (completedTasks / totalTasks) * 100;
  };

  const addMalt = () => {
    setRecipe({
      ...recipe,
      malts: [...recipe.malts, { type: "", amount: 0 }],
    });
  };

  const addHop = () => {
    setRecipe({
      ...recipe,
      hops: [...recipe.hops, { type: "", amount: 0, boilTime: 60 }],
    });
  };

  const updateMalt = (
    index: number,
    field: keyof Malt,
    value: string | number
  ) => {
    const newMalts = [...recipe.malts];
    newMalts[index] = { ...newMalts[index], [field]: value };
    setRecipe({ ...recipe, malts: newMalts });
  };

  const updateHop = (
    index: number,
    field: keyof Hop,
    value: string | number
  ) => {
    const newHops = [...recipe.hops];
    newHops[index] = { ...newHops[index], [field]: value };
    setRecipe({ ...recipe, hops: newHops });
  };

  const removeMalt = (index: number) => {
    setRecipe({
      ...recipe,
      malts: recipe.malts.filter((_, i) => i !== index),
    });
  };

  const removeHop = (index: number) => {
    setRecipe({
      ...recipe,
      hops: recipe.hops.filter((_, i) => i !== index),
    });
  };

  const saveRecipe = () => {
    if (!savedRecipes.includes(recipe.name)) {
      const updatedRecipes = [...savedRecipes, recipe.name];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    }
    localStorage.setItem(`recipe_${recipe.name}`, JSON.stringify(recipe));
  };

  const loadRecipe = (recipeName: string) => {
    const loadedRecipe = JSON.parse(
      localStorage.getItem(`recipe_${recipeName}`) || "{}"
    );
    setRecipe(loadedRecipe);
  };

  const deleteRecipe = (recipeName: string) => {
    const updatedRecipes = savedRecipes.filter((name) => name !== recipeName);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    localStorage.removeItem(`recipe_${recipeName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Beer className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            The Brewmaster's Quest
          </h1>
          <p className="text-amber-700">
            Your journey to crafting the perfect {recipe.name} begins here!
          </p>
        </div>

        {/* Recipe Configuration Section */}
        <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FlaskConical className="w-6 h-6 mr-2" />
                Recipe Configuration
              </h2>
              <div className="space-x-2">
                <button
                  onClick={saveRecipe}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center shadow-md"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Recipe
                </button>
                <button
                  onClick={() => setEditingRecipe(!editingRecipe)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md"
                >
                  {editingRecipe ? "Save Changes" : "Edit Recipe"}
                </button>
              </div>
            </div>
          </div>

          {editingRecipe ? (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    value={recipe.name}
                    onChange={(e) =>
                      setRecipe({ ...recipe, name: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mash Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={recipe.mashTemp}
                    onChange={(e) =>
                      setRecipe({ ...recipe, mashTemp: Number(e.target.value) })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Original Gravity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={recipe.expectedOG}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        expectedOG: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Final Gravity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={recipe.expectedFG}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        expectedFG: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Amount (L)
                  </label>
                  <input
                    type="number"
                    value={recipe.waterAmount}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        waterAmount: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yeast Type
                  </label>
                  <input
                    type="text"
                    value={recipe.yeastType}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        yeastType: e.target.value,
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fermentation Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={recipe.fermentationTemp}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        fermentationTemp: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Boil Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={recipe.boilTime}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        boilTime: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-amber-900 flex items-center">
                    <Wheat className="w-5 h-5 mr-2" />
                    Malts
                  </h3>
                  <button
                    onClick={addMalt}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                  >
                    Add Malt
                  </button>
                </div>
                {recipe.malts.map((malt, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={malt.type}
                      onChange={(e) =>
                        updateMalt(index, "type", e.target.value)
                      }
                      placeholder="Malt type"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                    <input
                      type="number"
                      value={malt.amount}
                      onChange={(e) =>
                        updateMalt(index, "amount", Number(e.target.value))
                      }
                      placeholder="Amount (kg)"
                      className="w-32 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                    <button
                      onClick={() => removeMalt(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-amber-900 flex items-center">
                    <Hop className="w-5 h-5 mr-2" />
                    Hops
                  </h3>
                  <button
                    onClick={addHop}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                  >
                    Add Hop
                  </button>
                </div>
                {recipe.hops.map((hop, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={hop.type}
                      onChange={(e) => updateHop(index, "type", e.target.value)}
                      placeholder="Hop type"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                    <input
                      type="number"
                      value={hop.amount}
                      onChange={(e) =>
                        updateHop(index, "amount", Number(e.target.value))
                      }
                      placeholder="Amount (g)"
                      className="w-32 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                    <input
                      type="number"
                      value={hop.boilTime}
                      onChange={(e) =>
                        updateHop(index, "boilTime", Number(e.target.value))
                      }
                      placeholder="Boil time (min)"
                      className="w-32 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                    />
                    <button
                      onClick={() => removeHop(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                    <FlaskConical className="w-5 h-5 mr-2" />
                    Recipe Details
                  </h3>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-amber-800">
                      <strong>Name:</strong> {recipe.name}
                    </p>
                    <p className="text-amber-800">
                      <strong>Mash Temperature:</strong> {recipe.mashTemp}°C
                    </p>
                    <p className="text-amber-800">
                      <strong>Expected OG:</strong> {recipe.expectedOG}
                    </p>
                    <p className="text-amber-800">
                      <strong>Expected FG:</strong> {recipe.expectedFG}
                    </p>
                    <p className="text-amber-800">
                      <strong>Water Amount:</strong> {recipe.waterAmount}L
                    </p>
                    <p className="text-amber-800">
                      <strong>Yeast Type:</strong> {recipe.yeastType}
                    </p>
                    <p className="text-amber-800">
                      <strong>Fermentation Temp:</strong>{" "}
                      {recipe.fermentationTemp}°C
                    </p>
                    <p className="text-amber-800">
                      <strong>Boil Time:</strong> {recipe.boilTime} minutes
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                    <Wheat className="w-5 h-5 mr-2" />
                    Malt Bill
                  </h3>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    {recipe.malts.map((malt, index) => (
                      <p key={index} className="text-amber-800">
                        {malt.amount}kg {malt.type}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                  <Hop className="w-5 h-5 mr-2" />
                  Hop Schedule
                </h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  {recipe.hops.map((hop, index) => (
                    <p key={index} className="text-amber-800">
                      {hop.amount}g {hop.type} at {hop.boilTime} minutes
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Saved Recipes Section */}
        <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Download className="w-6 h-6 mr-2" />
              Saved Recipes
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedRecipes.map((recipeName, index) => (
              <div
                key={index}
                className="bg-amber-100 rounded-lg p-4 flex flex-col"
              >
                <span className="text-amber-800 font-semibold mb-2">
                  {recipeName}
                </span>
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => loadRecipe(recipeName)}
                    className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors text-sm"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipeName)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-500 to-amber-600 text-white"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-semibold">{step.title}</span>
                </div>
                {step.isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>

              {step.isExpanded && (
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img
                        src={step.imageUrl}
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <p className="text-amber-800 mb-4">{step.description}</p>

                      {step.info && (
                        <div className="mb-6 space-y-4">
                          {step.info.map((info, idx) => (
                            <div
                              key={idx}
                              className="bg-amber-50 p-4 rounded-lg"
                            >
                              <h3 className="font-semibold text-amber-900 mb-2">
                                {info.title}
                              </h3>
                              <ul className="space-y-1">
                                {info.content.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-amber-800 text-sm"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.tasks.length > 0 && (
                        <div className="space-y-3">
                          {step.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center space-x-3 p-2 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                            >
                              <button
                                onClick={() => toggleTask(step.id, task.id)}
                                className="flex-1 flex items-center space-x-3 text-left"
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-amber-300" />
                                )}
                                <span
                                  className={
                                    task.completed
                                      ? "text-gray-500 line-through"
                                      : "text-gray-700"
                                  }
                                >
                                  {task.text}
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {step.tasks.length > 0 && (
                    <div className="mt-4">
                      <div className="bg-amber-100 rounded-full h-2 w-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-500"
                          style={{ width: `${calculateProgress(step)}%` }}
                        />
                      </div>
                      <p className="text-sm text-amber-700 mt-2">
                        Quest Progress: {calculateProgress(step).toFixed(0)}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2" />
            Brewmaster's Pro Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Thermometer className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">
                  Temperature Control
                </h3>
                <p className="text-amber-700 text-sm">
                  Hold MANU + adjust temp (H=heat, P=pump)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Timer className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Pump Operation</h3>
                <p className="text-amber-700 text-sm">
                  Multiple activations needed for optimal function
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FlaskConical className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Cornelius Keg</h3>
                <p className="text-amber-700 text-sm">
                  Gas: TOP, Liquid: BOTTOM
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Gauge className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Gas Regulation</h3>
                <p className="text-amber-700 text-sm">
                  Clockwise = more, Counter-clockwise = less
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
