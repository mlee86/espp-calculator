import React from "react";
import ESPPInfo from "./Components/ESPPInfo";
import ESPPInput from "./Components/ESPPInput";
import ESPPResults from "./Components/ESPPResults";
import { ESPPCalculatorProvider } from "./hooks/ESPPCalculatorContext";

const App = () => {
  return (
    <ESPPCalculatorProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
              ESPP Calculator
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
              Calculate your potential profit from your Employee Stock Purchase
              Plan.
            </p>
            <ESPPInput />
            <ESPPResults />
            <ESPPInfo />
          </div>
        </div>
      </div>
    </ESPPCalculatorProvider>
  );
};

export default App;
