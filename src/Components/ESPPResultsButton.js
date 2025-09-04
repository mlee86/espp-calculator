import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";

const ESPPResultsButton = ({ text }) => {
  const { selectedPeriod, setSelectedPeriod } = useESPPCalculatorContext();
  return (
    <button
      onClick={() => setSelectedPeriod(text)}
      className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${
        selectedPeriod === text
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-800 dark:text-gray-300"
      }`}
    >
      {text}
    </button>
  );
};
export default ESPPResultsButton;
