import React from "react";
import { ChefHat, Trophy, Award, Settings, List } from "lucide-react";

interface HeaderProps {
  showRecipeForm: boolean;
  level: number;
  experience: number;
  showTips: boolean;
  setShowTips: (show: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  showRecipeForm,
  level,
  experience,
  showTips,
  setShowTips,
  showSidebar,
  setShowSidebar,
}) => {
  return (
    <header className="bg-amber-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <ChefHat className="mr-2" />
          BrewMaster
        </h1>

        {!showRecipeForm && (
          <div className="flex flex-wrap items-center space-x-3 mt-2 md:mt-0">
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
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="bg-amber-800 p-2 rounded-full md:hidden"
              aria-label="Toggle sidebar"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;