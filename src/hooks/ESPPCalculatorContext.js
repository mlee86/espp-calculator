import React, { createContext, useContext } from "react";
import useESPPCalculator from "./useESPPCalculator";

const ESPPCalculatorContext = createContext();

export const ESPPCalculatorProvider = ({ children }) => {
  const value = useESPPCalculator();
  return (
    <ESPPCalculatorContext.Provider value={value}>
      {children}
    </ESPPCalculatorContext.Provider>
  );
};

export const useESPPCalculatorContext = () => useContext(ESPPCalculatorContext);
