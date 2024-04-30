// DailyIncomeCard.jsx
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

export function DailyIncomeCard({ income }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" color="blue" className="px-4 text-center" floated={false} shadow={false}>
        <Typography variant="h6" color="white">Daily Income</Typography>
      </CardHeader>
      <CardBody className="p-4 text-center">
        <Typography variant="h4" color="blue-gray">{income}</Typography>
      </CardBody>
    </Card>
  );
}

// MonthlyTotalIncomeChart.jsx

export function MonthlyTotalIncomeChart({ data }) {
  return (
    <Chart
      type="line"
      height={220}
      series={data.series}
      options={data.options}
    />
  );
}



export function LowQuantityItemsTable({ items }) {
  return (
    <div>
      {items.map((item) => (
        <Card key={item.ID} className="border border-blue-gray-100 shadow-sm mb-4">
          <CardHeader variant="gradient" color="orange" floated={false} shadow={false}>
            <Typography variant="h6" color="white" className="px-4 text-center">Low Quantity</Typography>
          </CardHeader>
          <CardBody className="p-4">
            <Typography variant="body" className="text-blue-gray-700 mb-2">
              Name: {item.Name}
            </Typography>
            <Typography variant="body" className="text-blue-gray-700 mb-2">
              Quantity: {item.Quantity}
            </Typography>
            <Typography variant="body" className="text-blue-gray-700 mb-2">
              Category: {item.Category.Name}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

LowQuantityItemsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LowQuantityItemsTable;


export function TodayInvoicesTable({ invoices }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" color="blue" className="px-4 text-center" floated={false} shadow={false}>
        <Typography variant="h6" color="white">Today's Invoices</Typography>
      </CardHeader>
      <CardBody className="p-4">
        {invoices.map(invoice => (
          <div key={invoice.ID} className="mb-4">
            <Typography className="mb-2" variant="h6">{invoice.Name}</Typography>
            <div className="flex justify-between">
            </div>
            <Typography className="mt-2" variant="subtitle2">Total Amount: {invoice.TotalAmount}</Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}


