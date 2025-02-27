import { BrewStep, RecipeInput } from "../types";

export const generateBrewSteps = (recipeInput: RecipeInput): BrewStep[] => {
  const maltListText = recipeInput.malts
    .filter((malt) => malt.name.trim() !== "")
    .map((malt) => `${malt.amount}${malt.unit} of ${malt.name}`)
    .join(", ");

  const hopScheduleText = recipeInput.hops
    .filter((hop) => hop.name.trim() !== "")
    .map((hop) => `${hop.amount}${hop.unit} of ${hop.name} at ${hop.timing}`)
    .join(", ");

  const totalWaterNeeded = Math.max(recipeInput.initialWaterAmount - 3, 15); // Apply the 3L less water note

  return [
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
          text: `Prepare your recipe for ${recipeInput.name} and gather ingredients`,
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
          text: `Fill with ${totalWaterNeeded}L of water. The marks on the rod show 15L, 20L, 25L. Always ensure heating rods are submerged.`,
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
          text: maltListText
            ? `Grind the malts: ${maltListText} (note: 7-8kg is maximum malt capacity)`
            : "Grind the malt (note: 7-8kg is maximum malt capacity)",
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
          text: maltListText
            ? `Add the malts to the mash bucket: ${maltListText}`
            : "Add malt to the mash bucket",
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
          text: `When mashing is finished, check if gravity has reached target boil gravity of ${recipeInput.targetOriginalGravity}`,
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
          text: hopScheduleText
            ? `Boil for ${recipeInput.boilTime} minutes and add hops according to this schedule: ${hopScheduleText}`
            : `Boil for ${recipeInput.boilTime} minutes (ADD HOPS according to schedule)`,
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
        {
          id: 2,
          text: `Add ${recipeInput.yeast} yeast and beer to the bucket`,
          completed: false,
        },
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
  ];
};