import React, { useState, useEffect } from 'react';
import { Beer, Thermometer, Timer, Droplets, FlaskRound as Flask, Shield, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
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

  const steps: Step[] = [
    {
      id: 1,
      title: "Preparation & Cleaning",
      description: "First things first - let's make sure everything is spotless! A clean brewery is a happy brewery.",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      tasks: [
        { id: 1, task: "Check pump for malt residue", completed: false },
        { id: 2, task: "Flush pump holes thoroughly", completed: false },
        { id: 3, task: "Clean heating elements", completed: false },
        { id: 4, task: "Run Star-san through system", completed: false }
      ]
    },
    {
      id: 2,
      title: "Water Setup",
      description: "Time to get the perfect amount of water ready for our brew!",
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      temperature: 65,
      tasks: [
        { id: 1, task: "Add 22L initial water", completed: false },
        { id: 2, task: "Reserve 5L for mashing", completed: false },
        { id: 3, task: "Note: Total target is 27L", completed: false }
      ]
    },
    {
      id: 3,
      title: "Mashing",
      description: "The crucial step where we extract those sweet, sweet sugars from the malt.",
      icon: <Flask className="w-8 h-8 text-amber-500" />,
      temperature: 67,
      duration: 60,
      tasks: [
        { id: 1, task: "Mount red rubber in kettle", completed: false },
        { id: 2, task: "Place filter bottom with filter", completed: false },
        { id: 3, task: "Add malt (max 7-8kg)", completed: false },
        { id: 4, task: "Mount top system with filter and wheel", completed: false },
        { id: 5, task: "Pump every 20 minutes (1 min pause)", completed: false }
      ]
    },
    {
      id: 4,
      title: "Boiling",
      description: "Watch the magic happen as we boil and add hops!",
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      temperature: 102,
      duration: 60,
      tasks: [
        { id: 1, task: "Reach boiling temperature (102°C)", completed: false },
        { id: 2, task: "Add hops according to recipe", completed: false },
        { id: 3, task: "Maintain rolling boil", completed: false }
      ]
    },
    {
      id: 5,
      title: "Cooling & Fermentation",
      description: "Cool it down and let the yeast do its thing!",
      icon: <Timer className="w-8 h-8 text-green-500" />,
      temperature: 20,
      tasks: [
        { id: 1, task: "Cool to 20°C", completed: false },
        { id: 2, task: "Clean fermentation bucket with Star-san", completed: false },
        { id: 3, task: "Add yeast", completed: false },
        { id: 4, task: "Mount airlock with Star-san", completed: false }
      ]
    }
  ];

  const toggleTask = (stepIndex: number, taskId: number) => {
    const newSteps = [...steps];
    const taskIndex = newSteps[stepIndex].tasks.findIndex(t => t.id === taskId);
    newSteps[stepIndex].tasks[taskIndex].completed = !newSteps[stepIndex].tasks[taskIndex].completed;
    
    // Calculate progress
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedTasks = steps.reduce((acc, step) => 
      acc + step.tasks.filter(t => t.completed).length, 0);
    setProgress((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-amber-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Beer className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Amber Ale Brewing Guide</h1>
          </div>
          <div className="text-lg">
            Progress: {Math.round(progress)}%
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={step.id} className={`relative ${
              index === currentStep ? 'scale-100' : 'scale-95'
            } transform transition-all duration-300`}>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100">
                <div className="flex items-center gap-4 mb-4">
                  {step.icon}
                  <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
                </div>
                
                <p className="text-gray-600 mb-6">{step.description}</p>

                {(step.temperature || step.duration) && (
                  <div className="flex gap-6 mb-6">
                    {step.temperature && (
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-md">
                        <Thermometer className="w-5 h-5 text-blue-500" />
                        <span className="text-blue-700">{step.temperature}°C</span>
                      </div>
                    )}
                    {step.duration && (
                      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-md">
                        <Timer className="w-5 h-5 text-green-500" />
                        <span className="text-green-700">{step.duration} minutes</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {step.tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                        task.completed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleTask(index, task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                        {task.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowDown className="w-6 h-6 text-amber-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

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