import ESPPResultsButton from "./ESPPResultsButton";
import Constants from "../Constants/Constants";

const ESPPResultsButtons = () => {
  return (
    <div className="flex justify-around bg-blue-100 dark:bg-blue-900 rounded-full p-1 mb-6">
      <ESPPResultsButton  text={Constants.BIWEEKLY} />
      <ESPPResultsButton  text={Constants.HALFYEAR} />
      <ESPPResultsButton  text={Constants.FULLYEAR} />
    </div>
  );
};

export default ESPPResultsButtons;
