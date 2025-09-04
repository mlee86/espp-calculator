import React, { useState, useEffect } from 'react';

// Helper function to format numbers with commas
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const App = () => {
  const [isSalary, setIsSalary] = useState(true);
  const [salary, setSalary] = useState(100000);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [sharePrice, setSharePrice] = useState(300);
  const [investmentPercent, setInvestmentPercent] = useState(20);
  const [discount, setDiscount] = useState(15);
  const [selectedPeriod, setSelectedPeriod] = useState('fullYear');
  const [investment, setInvestment] = useState(0);
  const [annualInvestment, setAnnualInvestment] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sharesPurchased, setSharesPurchased] = useState(0);
  const [profit, setProfit] = useState(0);
  const [effectiveBonus, setEffectiveBonus] = useState(0);

  // Use useEffect hook to calculate ESPP values whenever a relevant state changes
  useEffect(() => {
    calculateEspp();
  }, [salary, hourlyRate, investmentPercent, discount, selectedPeriod, isSalary]);

  const calculateEspp = () => {
    const maxAnnualContribution = 25000;
    const payPeriodsPerYear = 26;
    let annualIncome = 0;

    if (isSalary) {
      annualIncome = salary;
    } else {
      // Assuming a standard 40-hour work week
      annualIncome = hourlyRate * 40 * 52;
    }

    let finalInvestmentPercent = investmentPercent;

    // Check if annual income is greater than 0 to avoid division by zero
    if (annualIncome > 0) {
      // Correct calculation for the maximum investment percentage based on the $25,000 FMV limit
      const maxInvestmentPercentage = ((maxAnnualContribution * (1 - discount / 100)) / annualIncome) * 100;
      
      // Cap the investment percentage at the legal max or 20%, whichever is lower
      finalInvestmentPercent = Math.min(investmentPercent, maxInvestmentPercentage, 20);
    }
    
    // Update the state with the clamped value
    setInvestmentPercent(finalInvestmentPercent);

    let baseInvestment = 0;
    if (isSalary) {
      baseInvestment = (salary / payPeriodsPerYear) * (finalInvestmentPercent / 100);
    } else {
      baseInvestment = (hourlyRate * 40 * 2) * (finalInvestmentPercent / 100);
    }

    const annual = baseInvestment * payPeriodsPerYear;
    setAnnualInvestment(annual);

    let periodInvestment = 0;
    let profitAmount = 0;
    let sharesAmount = 0;

    const priceAfterDiscount = sharePrice * (1 - discount / 100);
    setPurchasePrice(priceAfterDiscount);

    if (selectedPeriod === 'biWeekly') {
      periodInvestment = baseInvestment;
    } else if (selectedPeriod === 'halfYear') {
      periodInvestment = baseInvestment * (payPeriodsPerYear / 2);
    } else {
      periodInvestment = annual;
    }

    sharesAmount = periodInvestment / priceAfterDiscount;
    profitAmount = sharesAmount * (sharePrice - priceAfterDiscount);

    setInvestment(periodInvestment);
    setSharesPurchased(sharesAmount);
    setProfit(profitAmount);
    
    // Calculate the effective bonus based on annual income
    if (annualIncome > 0) {
      const bonus = (profitAmount / annualIncome) * 100;
      setEffectiveBonus(bonus);
    }
  };

  // Generic handler for input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const re = /^[0-9.]*$/;

    // Only update state if the value is a valid number or empty
    if (value === '' || re.test(value)) {
      switch (id) {
        case 'salary':
          setSalary(Number(value));
          break;
        case 'hourlyRate':
          setHourlyRate(Number(value));
          break;
        case 'sharePrice':
          setSharePrice(Number(value));
          break;
        case 'investmentPercent':
          setInvestmentPercent(Number(value));
          break;
        case 'discount':
          if (value <= 20) {
            setDiscount(Number(value));
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
            ESPP Calculator
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Calculate your potential profit from your Employee Stock Purchase Plan.
          </p>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsSalary(true)}
              className={`px-6 py-2 rounded-l-full font-semibold transition-colors duration-200 ${isSalary
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              Annual Salary
            </button>
            <button
              onClick={() => setIsSalary(false)}
              className={`px-6 py-2 rounded-r-full font-semibold transition-colors duration-200 ${!isSalary
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              Hourly Rate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">Results</h2>
            <div className="flex justify-around bg-blue-100 dark:bg-blue-900 rounded-full p-1 mb-6">
              <button
                onClick={() => setSelectedPeriod('biWeekly')}
                className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedPeriod === 'biWeekly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-800 dark:text-gray-300'
                  }`}
              >
                Bi-weekly
              </button>
              <button
                onClick={() => setSelectedPeriod('halfYear')}
                className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedPeriod === 'halfYear'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-800 dark:text-gray-300'
                  }`}
              >
                Half-year
              </button>
              <button
                onClick={() => setSelectedPeriod('fullYear')}
                className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedPeriod === 'fullYear'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-800 dark:text-gray-300'
                  }`}
              >
                Full Year
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 6v2m0 6v2M12 12c-1.657 0-3-1.493-3-2s1.343-2 3-2 3 1.493 3 2 1.343 2 3 2" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Total Investment:</p>
                <p className="font-bold text-gray-900 dark:text-white">${numberWithCommas(investment.toFixed(2))}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2zM13 14V6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Purchase Price:</p>
                <p className="font-bold text-gray-900 dark:text-white">${numberWithCommas(purchasePrice.toFixed(2))}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l4.5-4.5M12 19.5l-4.5-4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Shares Purchased:</p>
                <p className="font-bold text-gray-900 dark:text-white">{numberWithCommas(sharesPurchased.toFixed(2))}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 20.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Total Profit:</p>
                <p className="font-bold text-gray-900 dark:text-white">${numberWithCommas(profit.toFixed(2))}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 6v2m0 6v2M12 12c-1.657 0-3-1.493-3-2s1.343-2 3-2 3 1.493 3 2 1.343 2 3 2" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Effective Bonus:</p>
                <p className="font-bold text-gray-900 dark:text-white">{effectiveBonus.toFixed(2)}%</p>
              </div>
                            <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 6v2m0 6v2M12 12c-1.657 0-3-1.493-3-2s1.343-2 3-2 3 1.493 3 2 1.343 2 3 2" />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">Profit:</p>
                <p className="font-bold text-gray-900 dark:text-white">{(profit/investment * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">What is an ESPP?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              An Employee Stock Purchase Plan (ESPP) is a company-run program that allows employees to buy company stock at a discount. The most common discount is 15% off the stock's market price. This is a powerful benefit that can generate significant returns with minimal risk.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The IRS imposes a limit on the total value of stock that can be purchased through an ESPP. The fair market value (FMV) of the stock you purchase, before the discount, cannot exceed $25,000 in any single calendar year. Your contribution percentage will be capped to ensure you do not exceed this limit.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              The profit from an ESPP is the difference between the stock's market price and your discounted purchase price. By contributing a portion of your salary, you automatically receive this bonus in the form of shares, which can then be sold for a profit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
