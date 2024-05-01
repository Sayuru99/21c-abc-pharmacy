import PropTypes from "prop-types";

export function LowQuantityItemsTable({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.ID} className="border border-blue-gray-100 shadow-sm mb-4">
          <div className="bg-orange-500 text-white px-4 py-2 text-center">
            <h6 className="text-lg">Low Quantity</h6>
          </div>
          <div className="p-4">
            <p className="text-blue-gray-700 mb-2">
              Name: {item.Name}
            </p>
            <p className="text-blue-gray-700 mb-2">
              Quantity: {item.Quantity}
            </p>
            <p className="text-blue-gray-700 mb-2">
              Category: {item.Category.Name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

LowQuantityItemsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};