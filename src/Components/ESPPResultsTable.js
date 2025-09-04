import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";
import Icons from "../Constants/SvgContants";
import Constants from "../Constants/Constants";
import ResultsTableItem from "./ESPPResultsTableItem";

const ESPPResultsTable = () => {
  const { investment, purchasePrice, sharesPurchased, profit, effectiveBonus } =
    useESPPCalculatorContext();
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ResultsTableItem
        icon={Icons.bankNotes}
        label={Constants.TOTAL_INVESTMENT}
        value={`$${numberWithCommas(investment.toFixed(2))}`}
      />
      <ResultsTableItem
        icon={Icons.currencyDollar}
        label={Constants.PURCHASE_PRICE}
        value={numberWithCommas(purchasePrice.toFixed(2))}
      />
      <ResultsTableItem
        icon={Icons.rectangleStock}
        label={Constants.SHARES_PURCHASED}
        value={numberWithCommas(sharesPurchased.toFixed(2))}
      />
      <ResultsTableItem
        icon={Icons.wallet}
        label={Constants.TOTAL_PROFIT}
        value={`$${numberWithCommas(profit.toFixed(2))}`}
      />
      <ResultsTableItem
        icon={Icons.plusCircle}
        label={Constants.EFFECTIVE_BONUS}
        value={`${effectiveBonus.toFixed(2)}%`}
      />
      <ResultsTableItem
        icon={Icons.arrowTrendingUp}
        label={Constants.PROFIT_PERCENTAGE}
        value={`${((profit / investment) * 100).toFixed(2)}%`}
      />
    </div>
  );
};

export default ESPPResultsTable;
