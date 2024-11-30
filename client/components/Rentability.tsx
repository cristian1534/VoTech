"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { TSubscription } from "../types/typeSubscriptions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface RentabilityProps {
  userSubscriptions: TSubscription[];
}
export const Rentability = ({ userSubscriptions }: RentabilityProps) => {
  console.log(userSubscriptions)
  const monthlyData = userSubscriptions.reduce((acc: Record<string, { new: number; canceled: number }>, sub) => {
    const startDate = new Date(sub.start_date);
    const monthKey = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;
  
    if (!acc[monthKey]) {
      acc[monthKey] = { new: 0, canceled: 0 };
    }
  
    acc[monthKey].new += 1;
  
    const isCanceled = sub.active === false;
    if (isCanceled) acc[monthKey].canceled += 1;
  
    return acc;
  }, {});
  


  const months = Object.keys(monthlyData).sort();
  const newUsers = months.map((month) => monthlyData[month].new);
  const canceledUsers = months.map((month) => monthlyData[month].canceled);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: newUsers,
        borderColor: "rgba(0, 200, 83, 1)", // Green
        backgroundColor: "rgba(0, 200, 83, 0.2)",
        fill: true,
      },
      {
        label: "Canceled Users",
        data: canceledUsers,
        borderColor: "rgba(255, 82, 82, 1)", // Red
        backgroundColor: "rgba(255, 82, 82, 0.2)",
        fill: true,
      },
    ],
  };


  const totalPayments = userSubscriptions.reduce((total, sub) => total + parseFloat(sub.price), 0);

  return (
    <div className="container bg-gray-100 mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-6 text-gray-800 font-bold text-center">Subscriptions Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Payments</h2>
          <p className="text-2xl font-bold text-green-500">${totalPayments.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600">New Users (This Month)</h2>
          <p className="text-2xl font-bold text-blue-500">{newUsers[0]}</p> 
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600">Canceled Users (This Month)</h2>
          <p className="text-2xl font-bold text-red-500">{canceledUsers[0]}</p> 
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly New and Canceled Users</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
};
