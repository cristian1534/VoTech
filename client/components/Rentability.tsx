"use client";
import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../lib/api";
import { TSubscription } from "../types/typeSubscriptions";


export const Rentability = () => {
  const [subscriptions, setSubscriptions] = useState<TSubscription[]>([]);
  const [payments, setPayments] = useState<number>(0);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await getSubscriptions();
      setSubscriptions(data);

      const total = data.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
      setPayments(total);
    };

    fetchSubscriptions();
  });

  return (
    <div className="container bg-white mx-auto p-4 text-center font-sans">
      <h1 className="text-2xl mb-4 text-orange-400">Subscriptions</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-orange-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                Subscription ID
              </th>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                Plan
              </th>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                Price
              </th>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                Start Date
              </th>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                User Name
              </th>
              <th className="px-4 py-2 border border-orange-300 text-gray-400">
                User Email
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.subscription_id}>
                <td className="px-4 py-2 border border-orange-300 text-gray-400">
                  {subscription.subscription_id}
                </td>
                <td className="px-4 py-2 border border-orange-300 text-gray-400">
                  {subscription.plan}
                </td>
                <td className="px-4 py-2 border border-orange-300 text-green-500">
                  ${parseFloat(subscription.price).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-orange-300 text-gray-400">
                  {new Date(subscription.start_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-orange-300 text-gray-400">
                  {subscription.user_name}
                </td>
                <td className="px-4 py-2 border border-orange-300 text-gray-400">
                  {subscription.user_email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-lg font-semibold bg-green-500 text-white w-full sm:max-w-md mx-auto">
        Total Payment: ${payments.toFixed(2)}
      </p>
    </div>
  );
};
