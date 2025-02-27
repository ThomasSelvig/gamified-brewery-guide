import React, { useState, useEffect, useRef } from "react";
import { Share2, ChefHat } from "lucide-react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeForm from "./components/recipe/RecipeForm";
import BrewingSteps from "./components/brewing/BrewingSteps";
import BrewingSidebar from "./components/brewing/BrewingSidebar";
import BrewingTips from "./components/brewing/BrewingTips";
import ImportRecipeModal from "./components/modals/ImportRecipeModal";
import SavedRecipesModal from "./components/modals/SavedRecipesModal";
import ShareRecipeModal from "./components/modals/ShareRecipeModal";

// Utils and types
import { generateBrewSteps } from "./utils/brewingSteps";
import { 
  RecipeInput, 
  BrewStep, 
  CategoryFilter, 
  ActiveTimer,
  MaltItem,
  HopItem
} from "./types";


const App: React.FC = () => {
  // Timer ref for cleanup
  const timerIntervalRef = useRef<number | null>(null);

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
    initialWaterAmount: 25,
    notes: "",
  });

  // State for UI
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showRecipeForm, setShowRecipeForm] = useState<boolean>(true);
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [achievements, setAchievements] = useState<Array<string>>([]);
  const [brewingProgress, setBrewingProgress] = useState<number>(0);
  const [experience, setExperience] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [showTips, setShowTips] = useState<boolean>(true);
  const [brewSteps, setBrewSteps] = useState<BrewStep[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [savedRecipes, setSavedRecipes] = useState<RecipeInput[]>([]);
  const [showSavedRecipes, setShowSavedRecipes] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [showShareLink, setShowShareLink] = useState<boolean>(false);
  const [importInput, setImportInput] = useState<string>("");
  const [showImportForm, setShowImportForm] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Load saved recipes from localStorage on component mount
  useEffect(() => {
    const loadedRecipes = localStorage.getItem("brewMasterRecipes");
    if (loadedRecipes) {
      setSavedRecipes(JSON.parse(loadedRecipes));
    }
  }, []);

  // Initialize brewing steps based on the recipe input
  useEffect(() => {
    setBrewSteps(generateBrewSteps(recipeInput));
  }, [recipeInput]);

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

  // Timer function
  const startTimer = (stepId: number, substepId: number, duration: number) => {
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    setActiveTimer({ stepId, substepId, timeLeft: duration });

    timerIntervalRef.current = window.setInterval(() => {
      setActiveTimer((prev) => {
        if (!prev) return null;

        const timeLeft = prev.timeLeft - 1;

        if (timeLeft <= 0) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
          }
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

  // Cleanup for the timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

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
            setExperience((prev) => prev + 25); // Increased from 20 to 25 to reach full XP

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
    if (currentStep < getFilteredSteps().length - 1) {
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

  // Function to filter steps by category
  const getFilteredSteps = () => {
    if (categoryFilter === "all") return brewSteps;
    return brewSteps.filter((step) => step.category === categoryFilter);
  };

  // Function to set category filter and reset current step
  const setFilterAndResetStep = (filter: CategoryFilter) => {
    setCategoryFilter(filter);
    setCurrentStep(0); // Reset to first step when filter changes
  };

  // Function to save the current recipe
  const saveRecipe = () => {
    // Check if the recipe already exists
    const existingIndex = savedRecipes.findIndex(
      (r) => r.name === recipeInput.name
    );

    let updatedRecipes: RecipeInput[];

    if (existingIndex !== -1) {
      // Update existing recipe
      updatedRecipes = [...savedRecipes];
      updatedRecipes[existingIndex] = { ...recipeInput };
    } else {
      // Add new recipe
      updatedRecipes = [...savedRecipes, { ...recipeInput }];
    }

    setSavedRecipes(updatedRecipes);
    localStorage.setItem("brewMasterRecipes", JSON.stringify(updatedRecipes));

    // Add achievement if it's their first saved recipe
    if (savedRecipes.length === 0) {
      setAchievements((prev) => [
        ...prev,
        "Recipe Keeper: First Recipe Saved!",
      ]);
      setExperience((prev) => prev + 10);
    }
  };

  // Function to load a saved recipe
  const loadRecipe = (recipe: RecipeInput) => {
    setRecipeInput(recipe);
    setShowSavedRecipes(false);
  };

  // Function to delete a saved recipe
  const deleteRecipe = (recipeName: string) => {
    const updatedRecipes = savedRecipes.filter((r) => r.name !== recipeName);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("brewMasterRecipes", JSON.stringify(updatedRecipes));
  };

  // Function to generate a shareable base64 string
  const generateShareableLink = () => {
    const recipeData = JSON.stringify(recipeInput);
    const base64Recipe = btoa(encodeURIComponent(recipeData));
    setShareLink(base64Recipe);
    setShowShareLink(true);
    navigator.clipboard.writeText(base64Recipe);
  };

  // Function to import a recipe from base64
  const importRecipe = () => {
    try {
      const decodedData = decodeURIComponent(atob(importInput));
      const importedRecipe = JSON.parse(decodedData) as RecipeInput;
      setRecipeInput(importedRecipe);
      setShowImportForm(false);
      setImportInput("");
      setAchievements((prev) => [
        ...prev,
        "Recipe Explorer: Imported a Recipe!",
      ]);
      setExperience((prev) => prev + 15);
    } catch (error) {
      alert("Invalid recipe format. Please check your input and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <Header 
        showRecipeForm={showRecipeForm}
        level={level}
        experience={experience}
        showTips={showTips}
        setShowTips={setShowTips}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <main className="container mx-auto py-6 px-4">
        {showRecipeForm ? (
          <RecipeForm 
            recipeInput={recipeInput}
            updateRecipeInput={updateRecipeInput}
            addMalt={addMalt}
            updateMalt={updateMalt}
            removeMalt={removeMalt}
            addHop={addHop}
            updateHop={updateHop}
            removeHop={removeHop}
            startBrewing={startBrewing}
            saveRecipe={saveRecipe}
            generateShareableLink={generateShareableLink}
            showImportForm={showImportForm}
            setShowImportForm={setShowImportForm}
            savedRecipes={savedRecipes}
            setShowSavedRecipes={setShowSavedRecipes}
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content area */}
            <div className="md:w-3/4 order-2 md:order-1 max-w-3xl md:mx-auto">
              <BrewingSteps 
                currentStep={currentStep}
                brewSteps={brewSteps}
                categoryFilter={categoryFilter}
                activeTimer={activeTimer}
                markSubstepComplete={markSubstepComplete}
                startTimer={startTimer}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
                setFilterAndResetStep={setFilterAndResetStep}
              />
              
              <BrewingTips 
                showTips={showTips} 
                setShowTips={setShowTips} 
              />
            </div>

            {/* Sidebar with progress */}
            <BrewingSidebar 
              recipeInput={recipeInput}
              brewingProgress={brewingProgress}
              level={level}
              experience={experience}
              achievements={achievements}
              brewStepCount={brewSteps.length}
              completedStepCount={brewSteps.filter(step => step.completed).length}
              showSidebar={showSidebar}
              setShowRecipeForm={setShowRecipeForm}
            />
          </div>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <SavedRecipesModal 
        showSavedRecipes={showSavedRecipes}
        setShowSavedRecipes={setShowSavedRecipes}
        savedRecipes={savedRecipes}
        loadRecipe={loadRecipe}
        deleteRecipe={deleteRecipe}
      />

      <ShareRecipeModal 
        showShareLink={showShareLink}
        setShowShareLink={setShowShareLink}
        shareLink={shareLink}
      />

      <ImportRecipeModal
        showImportForm={showImportForm}
        setShowImportForm={setShowImportForm}
        importInput={importInput}
        setImportInput={setImportInput}
        importRecipe={importRecipe}
      />
    </div>
  );
};

export default App;