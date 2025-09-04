import React from "react";
import ESPPResultsButtons from "./ESPPResultsButtons";
import ESPPResultsTable from "./ESPPResultsTable";

const ESPPResults = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        Results
      </h2>
      <ESPPResultsButtons />
      <ESPPResultsTable />
    </div>
  );
};

export default ESPPResults;
