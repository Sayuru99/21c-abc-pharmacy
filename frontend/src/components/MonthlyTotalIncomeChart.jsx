import Chart from "react-apexcharts";
import PropTypes from "prop-types";

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

MonthlyTotalIncomeChart.propTypes = {
  data: PropTypes.shape({
    series: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
  }).isRequired,
};
