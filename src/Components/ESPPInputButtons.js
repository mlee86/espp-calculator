import React from "react";
import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";
import InputButton from "./InputButton";

const ESPPInputButtons = () => {
  const { isSalary, setIsSalary } = useESPPCalculatorContext();

  return (
    <div className="flex justify-center mb-6">
  <InputButton label="Annual Salary" value={true} />
  <InputButton label="Hourly Rate" value={false} />
    </div>
  );
};
export default ESPPInputButtons;
