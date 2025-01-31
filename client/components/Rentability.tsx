"use client";
import React, { useEffect, useState } from "react";
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
import { getSubscriptions } from "../lib/api";
import { BiTrendingUp, BiUserPlus, BiUserMinus } from "react-icons/bi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export const Rentability = () => {
  const [userSubscriptions, setUserSubscriptions] = useState<TSubscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptions = await getSubscriptions();
      setUserSubscriptions(subscriptions || []);
    };
    fetchSubscriptions();
  }, []);

  const monthlyData = userSubscriptions.reduce(
    (acc: Record<string, { new: number; canceled: number }>, sub) => {
      const startDate = new Date(sub.start_date);
      const monthKey = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { new: 0, canceled: 0 };
      }

      acc[monthKey].new += 1;

      if (!sub.user_active) {
        acc[monthKey].canceled += 1;
      }

      return acc;
    },
    {}
  );

  const months = Object.keys(monthlyData).sort();
  const newUsers = months.map((month) => monthlyData[month].new);
  const canceledUsers = months.map((month) => monthlyData[month].canceled);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: newUsers,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#F59E0B",
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#F59E0B",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Canceled Users",
        data: canceledUsers,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#EF4444",
        pointBorderColor: "#EF4444",
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#EF4444",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
          font: {
            family: 'system-ui',
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        padding: 12,
        borderColor: 'rgba(75, 85, 99, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          padding: 10,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          padding: 10,
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const totalPayments = userSubscriptions.reduce((total, sub) => {
    if (sub.user_active) {
      return total + parseFloat(sub.price);
    }
    return total;
  }, 0);

  return (
    <div className="font-sans bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-8 text-center">
        Revenue Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Revenue</h3>
            <BiTrendingUp className="text-orange-400 text-xl" />
          </div>
          <p className="text-3xl font-bold text-orange-400">
            ${totalPayments.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">New Users</h3>
            <BiUserPlus className="text-yellow-400 text-xl" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">
            {newUsers[newUsers.length - 1] || 0}
          </p>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Cancellations</h3>
            <BiUserMinus className="text-red-400 text-xl" />
          </div>
          <p className="text-3xl font-bold text-red-400">
            {canceledUsers[canceledUsers.length - 1] || 0}
          </p>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-300 mb-6">Growth Trends</h3>
        <div className="h-[400px]">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};
