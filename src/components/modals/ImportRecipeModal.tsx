import React from "react";
import { Download } from "lucide-react";

interface ImportRecipeModalProps {
  showImportForm: boolean;
  setShowImportForm: (show: boolean) => void;
  importInput: string;
  setImportInput: (input: string) => void;
  importRecipe: () => void;
}

const ImportRecipeModal: React.FC<ImportRecipeModalProps> = ({
  showImportForm,
  setShowImportForm,
  importInput,
  setImportInput,
  importRecipe,
}) => {
  if (!showImportForm) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-amber-700">
            Import Recipe
          </h3>
          <button
            onClick={() => {
              setShowImportForm(false);
              setImportInput("");
            }}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close import modal"
          >
            &times;
          </button>
        </div>

        <p className="mb-2 text-gray-600">
          Paste the recipe code here:
        </p>

        <textarea
          value={importInput}
          onChange={(e) => setImportInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste recipe code here..."
          rows={6}
        />

        <div className="flex gap-2">
          <button
            onClick={importRecipe}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-700"
            disabled={!importInput.trim()}
          >
            <Download className="mr-2 h-4 w-4" />
            Import Recipe
          </button>
          <button
            onClick={() => {
              setShowImportForm(false);
              setImportInput("");
            }}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportRecipeModal;