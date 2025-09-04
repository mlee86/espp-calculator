import React from "react";
import ESPPInputButtons from "./ESPPInputButtons";
import ESPPInputTable from "./ESPPInputTable";

const ESPPInput = () => {
  return (
    <div className="flex flex-col mb-8">
      <ESPPInputButtons />
      <ESPPInputTable />
    </div>
  );
};

export default ESPPInput;
