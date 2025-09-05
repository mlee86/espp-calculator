import React from "react";
import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";
import Constants from "../Constants/Constants";
const inputSpinnerStyle = {
  MozAppearance: "textfield",
  appearance: "textfield",
};

const ESPPInputTable = () => {
  const {
    isSalary,
    salary,
    hourlyRate,
    sharePrice,
    investmentPercent,
    discount,
    handleInputChange,
  } = useESPPCalculatorContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label
          htmlFor="income"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {isSalary ? Constants.ANNUAL_SALARY : Constants.HOURLY_RATE}
        </label>
        <input
          id={isSalary ? Constants.SALARY : Constants.HOURLY_RATE}
          type="number"
          min="0"
          step="0.01"
          value={isSalary ? salary : hourlyRate}
          onChange={handleInputChange}
          style={inputSpinnerStyle}
          className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={Constants.SHARE_PRICE}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Share Price
        </label>
        <input
          id={Constants.SHARE_PRICE}
          type="number"
          min="0"
          step="0.01"
          value={sharePrice}
          onChange={handleInputChange}
          style={inputSpinnerStyle}
          className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={Constants.INVESTMENT_PERCENT}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Investment (%)
        </label>
        <input
          id={Constants.INVESTMENT_PERCENT}
          type="number"
          min="0"
          max="20"
          step="0.5"
          value={investmentPercent}
          onChange={handleInputChange}
          className=" w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={Constants.DISCOUNT}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Discount (%)
        </label>
        <input
          id={Constants.DISCOUNT}
          type="number"
          min="0"
          max="20"
          step="1"
          value={discount}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
};
export default ESPPInputTable;
