import React from "react";
import { Copy } from "lucide-react";

interface ShareRecipeModalProps {
  showShareLink: boolean;
  setShowShareLink: (show: boolean) => void;
  shareLink: string;
}

const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({
  showShareLink,
  setShowShareLink,
  shareLink,
}) => {
  if (!showShareLink) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-amber-700">
            Share Your Recipe
          </h3>
          <button
            onClick={() => setShowShareLink(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close share modal"
          >
            &times;
          </button>
        </div>

        <p className="mb-2 text-gray-600">
          Your recipe has been copied to clipboard! Share this code:
        </p>

        <div className="bg-gray-100 p-3 rounded-lg mb-4 break-all overflow-auto max-h-32 text-sm">
          {shareLink}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              alert("Copied to clipboard!");
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-700"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Again
          </button>
          <button
            onClick={() => setShowShareLink(false)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareRecipeModal;