import { useState, useEffect } from "react";
import Constants from "../Constants/Constants";

const useESPPCalculator = () => {
  const [isSalary, setIsSalary] = useState(true);
  const [salary, setSalary] = useState(100000);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [sharePrice, setSharePrice] = useState(400);
  const [investmentPercent, setInvestmentPercent] = useState(20);
  const [discount, setDiscount] = useState(15);
  const [selectedPeriod, setSelectedPeriod] = useState(Constants.FULLYEAR);
  const [investment, setInvestment] = useState(0);
  const [annualInvestment, setAnnualInvestment] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sharesPurchased, setSharesPurchased] = useState(0);
  const [profit, setProfit] = useState(0);
  const [effectiveBonus, setEffectiveBonus] = useState(0);

  useEffect(() => {
    calculateEspp();
  }, [
    salary,
    hourlyRate,
    sharePrice,
    investmentPercent,
    discount,
    selectedPeriod,
    isSalary,
  ]);

  const calculateEspp = () => {
    const maxAnnualContribution = 25000;
    const payPeriodsPerYear = 26;
    let annualIncome = 0;

    if (isSalary) {
      annualIncome = salary;
    } else {
      annualIncome = hourlyRate * 40 * 52;
    }

    let finalInvestmentPercent = investmentPercent;

    if (annualIncome > 0) {
      const maxInvestmentPercentage =
        ((maxAnnualContribution * (1 - discount / 100)) / annualIncome) * 100;
      finalInvestmentPercent = Math.min(
        investmentPercent,
        maxInvestmentPercentage,
        20
      );
    }
    setInvestmentPercent(finalInvestmentPercent);

    let baseInvestment = 0;
    if (isSalary) {
      baseInvestment =
        (salary / payPeriodsPerYear) * (finalInvestmentPercent / 100);
    } else {
      baseInvestment = hourlyRate * 40 * 2 * (finalInvestmentPercent / 100);
    }

    const annual = baseInvestment * payPeriodsPerYear;
    setAnnualInvestment(annual);

    let periodInvestment = 0;
    let profitAmount = 0;
    let sharesAmount = 0;

    const priceAfterDiscount = sharePrice * (1 - discount / 100);
    setPurchasePrice(priceAfterDiscount);

    if (selectedPeriod === Constants.BIWEEKLY) {
      periodInvestment = baseInvestment;
    } else if (selectedPeriod === Constants.HALFYEAR) {
      periodInvestment = baseInvestment * (payPeriodsPerYear / 2);
    } else {
      periodInvestment = annual;
    }

    sharesAmount = periodInvestment / priceAfterDiscount;
    profitAmount = sharesAmount * (sharePrice - priceAfterDiscount);

    setInvestment(periodInvestment);
    setSharesPurchased(sharesAmount);
    setProfit(profitAmount);

    if (annualIncome > 0) {
      const bonus = (profitAmount / annualIncome) * 100;
      setEffectiveBonus(bonus);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const re = /^[0-9.]*$/;

    if (value === "" || re.test(value)) {
      switch (id) {
        case Constants.SALARY:
          setSalary(Number(value));
          break;
        case Constants.HOURLY_RATE:
          setHourlyRate(Number(value));
          break;
        case Constants.SHARE_PRICE:
          setSharePrice(Number(value));
          break;
        case Constants.INVESTMENT_PERCENT:
          setInvestmentPercent(Number(value));
          break;
        case Constants.DISCOUNT:
          if (value <= 20) {
            setDiscount(Number(value));
          }
          break;
        default:
          break;
      }
    }
  };

  return {
    isSalary,
    setIsSalary,
    salary,
    setSalary,
    hourlyRate,
    setHourlyRate,
    sharePrice,
    setSharePrice,
    investmentPercent,
    setInvestmentPercent,
    discount,
    setDiscount,
    selectedPeriod,
    setSelectedPeriod,
    investment,
    annualInvestment,
    purchasePrice,
    sharesPurchased,
    profit,
    effectiveBonus,
    handleInputChange,
    calculateEspp,
  };
};

export default useESPPCalculator;
