import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { DailyIncomeCard } from "../../components/DailyIncomeCard";
import { MonthlyTotalIncomeChart } from "../../components/MonthlyTotalIncomeChart";
import { LowQuantityItemsTable } from "../../components/LowQuantityItemsTable";
import { TodayInvoicesTable } from "../../components/TodayInvoicesTable";

export function Home() {
  const [invoices, setInvoices] = useState([]);
  const [items, setItems] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8880/api/v1/invoices")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });

    axios
      .get("http://localhost:8880/api/v1/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning!");
    } else if (hour < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  const calculateDailyIncome = () => {
    const today = new Date().toISOString().split("T")[0];
    return invoices.reduce((total, invoice) => {
      if (invoice.CreatedAt.split("T")[0] === today) {
        return total + invoice.TotalAmount;
      }
      return total;
    }, 0);
  };

  const calculateMonthlyTotalIncomeData = () => {
    const monthlyIncomeData = {
      series: [
        {
          name: "Income",
          data: new Array(12).fill(0),
        },
      ],
      options: {
        chart: {
          toolbar: { show: false },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
    };

    invoices.forEach((invoice) => {
      const month = new Date(invoice.CreatedAt).getMonth();
      monthlyIncomeData.series[0].data[month] += invoice.TotalAmount;
    });

    return monthlyIncomeData;
  };

  const getLowQuantityItems = () => {
    return items.filter((item) => item.Quantity < 20);
  };

  const getTodaysInvoices = () => {
    const today = new Date().toISOString().split("T")[0];
    return invoices.filter((invoice) => {
      const invoiceDate = invoice.CreatedAt.split("T")[0];
      return invoiceDate === today;
    });
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {greeting}
      </Typography>

      <Grid container spacing={4} style={{ marginBottom: "24px" }}>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "24px" }}>
            <Typography variant="h5" gutterBottom>
              Daily Income
            </Typography>
            <DailyIncomeCard income={calculateDailyIncome()} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "24px" }}>
            <MonthlyTotalIncomeChart
              data={calculateMonthlyTotalIncomeData()}
            />
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "24px" }}>
            <LowQuantityItemsTable items={getLowQuantityItems()} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "24px" }}>
            <TodayInvoicesTable invoices={getTodaysInvoices()} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
