import PropTypes from "prop-types";

export function TodayInvoicesTable({ invoices }) {
  return (
    <div className="border border-blue-gray-100 shadow-sm">
      <div className="bg-blue-500 text-white px-4 py-2 text-center">
        <h6 className="text-lg">Today's Invoices</h6>
      </div>
      <div className="p-4">
        {invoices.map(invoice => (
          <div key={invoice.ID} className="mb-4">
            <h6 className="mb-2">{invoice.Name}</h6>
            <div className="flex justify-between">
            </div>
            <p className="mt-2">Total Amount: {invoice.TotalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

TodayInvoicesTable.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
};