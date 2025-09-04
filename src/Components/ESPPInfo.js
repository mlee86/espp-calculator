// Component for informational text
const ESPPInfo = () => {
  return (
    <div className="mt-8 p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        What is an ESPP?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        An Employee Stock Purchase Plan (ESPP) is a company-run program that
        allows employees to buy company stock at a discount. The most common
        discount is 15% off the stock's market price. This is a powerful benefit
        that can generate significant returns with minimal risk.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        The IRS imposes a limit on the total value of stock that can be
        purchased through an ESPP. The fair market value (FMV) of the stock you
        purchase, before the discount, cannot exceed $25,000 in any single
        calendar year. Your contribution percentage will be capped to ensure you
        do not exceed this limit.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        The profit from an ESPP is the difference between the stock's market
        price and your discounted purchase price. By contributing a portion of
        your salary, you automatically receive this bonus in the form of shares,
        which can then be sold for a profit.
      </p>
    </div>
  );
};
export default ESPPInfo;
