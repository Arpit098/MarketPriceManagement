import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register components for chart.js
ChartJS.register(
  LineElement,
  PointElement, // Register PointElement
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  // Dummy chart data
  const chartDataHL = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4"],
    datasets: [
      {
        label: "Product Highest Rate",
        data: [100, 200, 150, 175],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Product Lowest Rate",
        data: [50, 100, 75, 125],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const chartDataMinMax = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4"],
    datasets: [
      {
        label: "Product Maximum Rate",
        data: [150, 220, 180, 200],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Product Minimum Rate",
        data: [80, 140, 120, 160],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const chartDataInProduct = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4"],
    datasets: [
      {
        label: "In Stock Products",
        data: [50, 75, 30, 60],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Dummy user data (for subscriber and consultant counts)
  const totalSubscribers = 100;
  const totalConsultants = 50;
  const totalUsers = 200;

  const subscriberDataPoints = [0, totalSubscribers];
  const consultantDataPoints = [0, totalConsultants];
  const userDataPoints = [0, totalUsers];

  const chartSubscriberUser = {
    labels: ["Start", "Total Subscribers", "Total Consultants", "Total Users"],
    datasets: [
      {
        label: "Subscriber Growth",
        data: [...subscriberDataPoints, totalSubscribers],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Consultant Growth",
        data: [...consultantDataPoints, totalConsultants],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Total Users",
        data: [...userDataPoints, totalUsers],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: false,
          text: "Rates",
        },
      },
      x: {
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Dummy table data
  const tableData = [
    {
      name: "Product 1",
      date: "2024-11-01",
      category: "Finance",
      subject: "Q3 Report",
      inStock: 50,
    },
    {
      name: "Product 2",
      date: "2024-11-02",
      category: "Marketing",
      subject: "Campaign Results",
      inStock: 75,
    },
    {
      name: "Product 3",
      date: "2024-11-03",
      category: "Operations",
      subject: "Product Overview",
      inStock: 30,
    },
  ];

  return (
    <div className="px-5 py-5">
      <p className="py-2 text-[25px] text-bold border-b border-[#4880FF] text-[#4880FF]">
        Reports & Graphs
      </p>
      <div className="mt-5">
        {/* Subscriber Growth Chart */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="border px-5 py-5 box-shadow rounded-xl">
            <h3 className="text-center">Subscriber Growth</h3>
            <Line data={chartSubscriberUser} options={options} />
          </div>
        </div>

        {/* Product Overview */}
        <h2 className="py-2 text-[25px] text-bold">Product Overview</h2>
        <hr className="mb-3 hr" />
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="border px-5 py-5 box-shadow rounded-xl">
            <h3 className="text-center">Highest and Lowest Rates & In Stock</h3>
            <Line data={chartDataHL} options={options} />
          </div>
          <div className="border px-5 py-5 box-shadow rounded-xl">
            <h3 className="text-center">Maximum and Minimum Rates</h3>
            <Line data={chartDataMinMax} options={options} />
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="grid gap-6 mb-6">
            <div className="border px-5 py-5 box-shadow rounded-xl">
              <h3 className="text-center">In Stock Products</h3>
              <Bar data={chartDataInProduct} options={options} />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table with Dummy Data */}
      <div className="mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#05375c] text-white">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Subject</th>
              <th className="px-4 py-2 text-center">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.date}</td>
                <td className="px-4 py-2 text-center">{item.category}</td>
                <td className="px-4 py-2 text-center">{item.subject}</td>
                <td className="px-4 py-2 text-center">{item.inStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
