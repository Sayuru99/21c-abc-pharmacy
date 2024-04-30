import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography } from "@material-tailwind/react";
import { DailyIncomeCard, LowQuantityItemsTable, MonthlyTotalIncomeChart, TodayInvoicesTable } from "@/widgets/cards/DailyIncomeCard";

export function Home() {
  const [invoices, setInvoices] = useState([]);
  const [items, setItems] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    
    axios.get("http://localhost:8880/api/v1/invoices")
      .then(response => {
        // console.log("Invoices:", response.data);
        setInvoices(response.data);
      })
      .catch(error => {
        console.error("Error fetching invoices:", error);
      });

    
    axios.get("http://localhost:8880/api/v1/items")
      .then(response => {
        console.log("Items:", response.data);
        setItems(response.data);
      })
      .catch(error => {
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
            data: new Array(12).fill(0)
          }
        ],
        options: {
          chart: {
            toolbar: { show: false }
          },
          xaxis: {
            categories: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ]
          }
        }
      };
  
      invoices.forEach(invoice => {
        const month = new Date(invoice.CreatedAt).getMonth();
        monthlyIncomeData.series[0].data[month] += invoice.TotalAmount;
      });
  
      return monthlyIncomeData;
    };
  
    
    const getLowQuantityItems = () => {
      return items.filter(item => item.Quantity < 20);
    };
    // console.log("Low Quantity Items:", getLowQuantityItems());

  
    
    const getTodaysInvoices = () => {
      const today = new Date().toISOString().split("T")[0];
      // console.log(today);
      return invoices.filter(invoice => {
        const invoiceDate = invoice.CreatedAt.split("T")[0];
        return invoiceDate === today;
      });
    };
    

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <Typography type="h2" color="gray"> {greeting} </Typography>
      </div>

      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        
        <DailyIncomeCard income={calculateDailyIncome()} />

        
        <MonthlyTotalIncomeChart data={calculateMonthlyTotalIncomeData()} />
      </div>

      <div className="grid gap-6 mt-12 md:grid-cols-2">
        
        <LowQuantityItemsTable items={getLowQuantityItems()} />

        
        <TodayInvoicesTable invoices={getTodaysInvoices()} />
      </div>
    </div>
  );
}

export default Home;
