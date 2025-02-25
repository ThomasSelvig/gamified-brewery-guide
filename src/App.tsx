import React, { useState } from 'react';
import { Beer, Sparkles, Thermometer, Timer, CheckCircle2, XCircle, ChevronDown, ChevronUp, 
         Droplets, FlaskRound as Flask, Gauge, Scale, DollarSign, Building2, Package } from 'lucide-react';

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
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Prerequisites & Equipment",
      description: "Before we begin our brewing journey, let's ensure we have everything we need.",
      imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=1000",
      isExpanded: true,
      info: [
        {
          title: "Location",
          content: [
            "Kristiania Bryggeri",
            "Book your session at kristianiabrygg.no"
          ]
        },
        {
          title: "Required Equipment",
          content: [
            "20L Speidel brewing system",
            "Mash bucket with 2 filters",
            "Fermentation bucket",
            "Cornelius keg",
            "Temperature meter"
          ]
        },
        {
          title: "Costs",
          content: [
            "Guild Member: Malt (Free), Yeast (50kr), Hops (Free)",
            "Private: Malt (100kr), Yeast (50kr), Hops (Free)"
          ]
        }
      ],
      tasks: []
    },
    {
      id: 2,
      title: "Quest 1: The Sacred Cleansing Ritual",
      description: "A clean brewery is essential for great beer. Let's prepare our equipment.",
      imageUrl: "https://images.unsplash.com/photo-1585936369668-cb58d314c958?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Check pump for grain residue", completed: false },
        { id: 2, text: "Flush pump openings thoroughly", completed: false },
        { id: 3, text: "Clean heating elements", completed: false },
        { id: 4, text: "Run Star-san solution through the system", completed: false }
      ]
    },
    {
      id: 3,
      title: "Quest 2: The Water Ceremony",
      description: "Water is the foundation of our brew. Precise measurements are crucial.",
      imageUrl: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      info: [
        {
          title: "Water Measurements",
          content: [
            "Total required: 27 liters",
            "Initial amount: 22 liters",
            "Note: Reduce total by 3 liters due to less evaporation",
            "Reserve 5 liters for mashing"
          ]
        }
      ],
      tasks: []
    },
    {
      id: 4,
      title: "Quest 3: The Mashing Adventure",
      description: "Time to combine our ingredients and begin the transformation!",
      imageUrl: "https://images.unsplash.com/photo-1558642891-54be180ea339?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Mount red rubber in kettle", completed: false },
        { id: 2, text: "Install filter bottom with filter", completed: false },
        { id: 3, text: "Add malt (max 7-8kg)", completed: false },
        { id: 4, text: "Mount top system with filter and wheel", completed: false }
      ],
      info: [
        {
          title: "Pump Operation",
          content: [
            "Pump every 20 minutes",
            "Turn off pump for 1 minute during each interval",
            "Check mash temperature according to recipe"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Quest 4: The Sacred Boil",
      description: "Watch as our potion reaches its boiling point and transforms!",
      imageUrl: "https://images.unsplash.com/photo-1615332579037-3c44b3660b53?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Reach temperature of 102°C", completed: false },
        { id: 2, text: "Maintain boil for 60 minutes", completed: false },
        { id: 3, text: "Add hops according to recipe timing", completed: false }
      ]
    },
    {
      id: 6,
      title: "Quest 5: The Cooling Challenge",
      description: "Patience, young brewer! We must cool our potion to the perfect temperature.",
      imageUrl: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Cool to 20°C", completed: false },
        { id: 2, text: "Use external thermometer for accuracy", completed: false }
      ]
    },
    {
      id: 7,
      title: "Final Quest: The Fermentation Ritual",
      description: "The final transformation begins as we summon the power of yeast!",
      imageUrl: "https://images.unsplash.com/photo-1562529024-9e7f8b99d5a4?auto=format&fit=crop&q=80&w=1000",
      isExpanded: false,
      tasks: [
        { id: 1, text: "Clean fermentation bucket with Star-san", completed: false },
        { id: 2, text: "Add yeast", completed: false },
        { id: 3, text: "Mount airlock with Star-san", completed: false }
      ],
      info: [
        {
          title: "Monitoring",
          content: [
            "Check for bubbling after 7 days",
            "Monitor Star-san level in airlock",
            "Ensure airlock remains properly sealed"
          ]
        }
      ]
    }
  ]);

  const toggleStep = (stepId: number) => {
    setSteps(steps.map(step => ({
      ...step,
      isExpanded: step.id === stepId ? !step.isExpanded : step.isExpanded
    })));
  };

  const toggleTask = (stepId: number, taskId: number) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          tasks: step.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return step;
    }));
  };

  const calculateProgress = (step: Step) => {
    if (step.tasks.length === 0) return 100;
    const completed = step.tasks.filter(task => task.completed).length;
    return (completed / step.tasks.length) * 100;
  };

  const totalProgress = () => {
    const stepsWithTasks = steps.filter(step => step.tasks.length > 0);
    if (stepsWithTasks.length === 0) return 100;
    
    const totalTasks = stepsWithTasks.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedTasks = stepsWithTasks.reduce((acc, step) => 
      acc + step.tasks.filter(task => task.completed).length, 0
    );
    return (completedTasks / totalTasks) * 100;
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
            Your journey to crafting the perfect Amber Ale begins here!
          </p>
          <div className="mt-4">
            <div className="bg-white rounded-full h-4 w-full max-w-md mx-auto overflow-hidden shadow-inner">
              <div 
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${totalProgress()}%` }}
              />
            </div>
            <p className="text-amber-800 mt-2">
              Overall Progress: {totalProgress().toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map(step => (
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
                            <div key={idx} className="bg-amber-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-amber-900 mb-2">{info.title}</h3>
                              <ul className="space-y-1">
                                {info.content.map((item, i) => (
                                  <li key={i} className="text-amber-800 text-sm">{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.tasks.length > 0 && (
                        <div className="space-y-3">
                          {step.tasks.map(task => (
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
                                <span className={task.completed ? "text-gray-500 line-through" : "text-gray-700"}>
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
                <h3 className="font-semibold text-amber-800">Temperature Control</h3>
                <p className="text-amber-700 text-sm">Hold MANU + adjust temp (H=heat, P=pump)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Timer className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Pump Operation</h3>
                <p className="text-amber-700 text-sm">Multiple activations needed for optimal function</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Flask className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Cornelius Keg</h3>
                <p className="text-amber-700 text-sm">Gas: TOP, Liquid: BOTTOM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Gauge className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Gas Regulation</h3>
                <p className="text-amber-700 text-sm">Clockwise = more, Counter-clockwise = less</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;