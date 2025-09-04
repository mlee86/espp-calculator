import { useESPPCalculatorContext } from "../hooks/ESPPCalculatorContext";
import Icons from "../Constants/SvgContants";
import ResultsTableItem from "./ResultsTableItem";

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
        label="Total Investment"
        value={`$${numberWithCommas(investment.toFixed(2))}`}
      />
      <ResultsTableItem
        icon={Icons.currencyDollar}
        label="Purchase Price"
        value={numberWithCommas(purchasePrice.toFixed(2))}
      />
      <ResultsTableItem
        icon={Icons.rectangleStock}
        label="Shares Purchased"
        value={numberWithCommas(sharesPurchased.toFixed(2))}
      />
      <ResultsTableItem
        icon={Icons.wallet}
        label="Total Profit"
        value={`$${numberWithCommas(profit.toFixed(2))}`}
      />
      <ResultsTableItem
        icon={Icons.plusCircle}
        label="Effective Bonus"
        value={`${effectiveBonus.toFixed(2)}%`}
      />
      <ResultsTableItem
        icon={Icons.arrowTrendingUp}
        label="Profit"
        value={`${((profit / investment) * 100).toFixed(2)}%`}
      />
    </div>
  );
};

export default ESPPResultsTable;
