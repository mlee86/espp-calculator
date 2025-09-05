import React from "react";
import InputButton from "./InputButton";
import Constants from "../Constants/Constants";

const ESPPInputButtons = () => {
  return (
    <div className="flex justify-center mb-6">
      <InputButton label={Constants.ANNUAL_SALARY} value={true} />
      <InputButton label={Constants.HOURLY_RATE} value={false} />
    </div>
  );
};
export default ESPPInputButtons;
