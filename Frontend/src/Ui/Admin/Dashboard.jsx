import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchListing } from "../../store/API/ManageListing";
import { fetchUsers } from "../../store/API/Users";

// Register components
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

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListing());
    dispatch(fetchUsers());
  }, [dispatch]);

  const { data } = useSelector((state) => state.ManageListing);
  const { userData } = useSelector((state) => state.AllUsers);

  // Chart data for highest, lowest rates, and in stock
  const chartDataHL = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Product Highest Rate",
        data: data.map((item) => item.highest_rate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Product Lowest Rate",
        data: data.map((item) => item.lowest_rate),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // Chart data for max and min rates
  const chartDataMinMax = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Product Maximum Rate",
        data: data.map((item) => item.max_rate),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Product Minimum Rate",
        data: data.map((item) => item.min_rate),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const chartDataInProduct = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "In Stock Products",
        data: data.map((item) => item.in_stock),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const totalSubscribers = userData.filter(
    (item) => item.role === "subscriber"
  ).length;
  const totalConsultants = userData.filter(
    (item) => item.role === "consultant"
  ).length;
  const totalUsers = userData.length; // Total users count

  // Calculate data points for each dataset
  const subscriberDataPoints = [0, totalSubscribers];
  const consultantDataPoints = [0, totalConsultants];
  const userDataPoints = [0, totalUsers];

  const chartSubscriberUser = {
    labels: ["Start", "Total Subscribers", "Total Consultants", "Total Users"], // Labels for the start and total counts
    datasets: [
      {
        label: "Subscriber Growth",
        data: [...subscriberDataPoints, totalSubscribers], // Growth line for subscribers
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true, // Fill the area under the line
      },
      {
        label: "Consultant Growth",
        data: [...consultantDataPoints, totalConsultants], // Growth line for consultants
        borderColor: "rgba(255, 99, 132, 1)", // Different color for consultants
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color for consultants
        fill: true, // Fill the area under the line
      },
      {
        label: "Total Users",
        data: [...userDataPoints, totalUsers], // Growth line for total users
        borderColor: "rgba(54, 162, 235, 1)", // Different color for total users
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Fill color for total users
        fill: true, // Fill the area under the line
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

  return (
    <>
      <p className="py-2 text-[25px] text-bold border-b border-[#4880FF] text-[#4880FF]">
        Admin Dashboard
      </p>
      <div className="mt-5">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="border px-5 py-5 box-shadow rounded-xl">
            <h3 className="text-center">Subscriber Growth</h3>
            <Line data={chartSubscriberUser} options={options} />
          </div>
        </div>
      </div>
      <div>
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
              <h3 className="text-center">In Stock Product</h3>
              <Bar data={chartDataInProduct} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
