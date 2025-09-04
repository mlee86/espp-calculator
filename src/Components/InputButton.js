import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";

const InputButton = ({ label, value }) => {
  const { isSalary, setIsSalary } = useESPPCalculatorContext();
  const selected = isSalary === value;
  const buttonSyle = value ? "rounded-l-full" : "rounded-r-full";
  return (
    <button
      onClick={() => setIsSalary(value)}
      className={`px-6 py-2 ${buttonSyle} font-semibold transition-colors duration-200 ${
        selected
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }`}
    >
      {label}
    </button>
  );
};

export default InputButton;
