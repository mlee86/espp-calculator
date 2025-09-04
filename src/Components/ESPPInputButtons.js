import React from "react";
import InputButton from "./InputButton";

const ESPPInputButtons = () => {
  return (
    <div className="flex justify-center mb-6">
      <InputButton label="Annual Salary" value={true} />
      <InputButton label="Hourly Rate" value={false} />
    </div>
  );
};
export default ESPPInputButtons;
