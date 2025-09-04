import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";

const ESPPResultsButtons = () => {
  const { selectedPeriod, setSelectedPeriod } = useESPPCalculatorContext();
  return (
    <div className="flex justify-around bg-blue-100 dark:bg-blue-900 rounded-full p-1 mb-6">
      <button
        onClick={() => setSelectedPeriod("biWeekly")}
        className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${
          selectedPeriod === "biWeekly"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-800 dark:text-gray-300"
        }`}
      >
        Bi-weekly
      </button>
      <button
        onClick={() => setSelectedPeriod("halfYear")}
        className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${
          selectedPeriod === "halfYear"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-800 dark:text-gray-300"
        }`}
      >
        Half-year
      </button>
      <button
        onClick={() => setSelectedPeriod("fullYear")}
        className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${
          selectedPeriod === "fullYear"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-800 dark:text-gray-300"
        }`}
      >
        Full Year
      </button>
    </div>
  );
};

export default ESPPResultsButtons;
