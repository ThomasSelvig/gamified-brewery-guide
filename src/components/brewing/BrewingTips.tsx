import React from "react";
import { AlertCircle } from "lucide-react";

interface BrewingTipsProps {
  showTips: boolean;
  setShowTips: (value: boolean) => void;
}

const BrewingTips: React.FC<BrewingTipsProps> = ({ showTips, setShowTips }) => {
  if (!showTips) return null;
  
  return (
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
  );
};

export default BrewingTips;