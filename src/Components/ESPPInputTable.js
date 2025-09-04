import React from 'react';
import { useESPPCalculatorContext } from '../hooks/ESPPCalculatorContext';

const ESPPInputTable = () => {
  const {
    isSalary, salary, hourlyRate, sharePrice, investmentPercent, discount, handleInputChange
  } = useESPPCalculatorContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label htmlFor="income" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {isSalary ? 'Annual Salary' : 'Hourly Rate'}
      </label>
      <input
        id={isSalary ? 'salary' : 'hourlyRate'}
        type="text"
        value={isSalary ? salary : hourlyRate}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="sharePrice" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Share Price
      </label>
      <input
        id="sharePrice"
        type="text"
        value={sharePrice}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="investmentPercent" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Investment (%)
      </label>
      <input
        id="investmentPercent"
        type="number"
        min="0"
        max="20"
        step="0.5"
        value={investmentPercent}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="discount" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Discount (%)
      </label>
      <input
        id="discount"
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