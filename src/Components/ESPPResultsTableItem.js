const ResultsTableItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-blue-600 dark:text-blue-400">{icon}</span>
      <p className="text-gray-700 dark:text-gray-300">{label}:</p>
      <p className="font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};
export default ResultsTableItem;
