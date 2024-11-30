'use client'
import React, { useEffect, useState } from 'react';

interface Subscription {
    subscription_id: number;
    plan: string;
    price: string;
    start_date: string;
    user_id: number;
    user_uuid: string;
    user_name: string;
    user_email: string;
  }
  

export const Rentability = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Simulamos una llamada a la API
  useEffect(() => {
    const fetchData = async () => {
      // Esto simula los datos que proporcionaste
      const data = [
        {
          "subscription_id": 2,
          "plan": "Basic Plan",
          "price": "5.00",
          "start_date": "2024-11-30T00:00:00.000Z",
          "user_id": 38,
          "user_uuid": "cb110ab3-2065-4ef5-85ad-178b6fb0dc69",
          "user_name": "Cristian",
          "user_email": "cristian@gmail.com"
        },
        {
          "subscription_id": 3,
          "plan": "Basic Plan",
          "price": "5.00",
          "start_date": "2024-11-30T00:00:00.000Z",
          "user_id": 39,
          "user_uuid": "7da20d61-094e-4698-bf15-72fae288f22d",
          "user_name": "Pedro",
          "user_email": "pedro@gmail.com"
        }
      ];
      setSubscriptions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Subscription ID</th>
            <th className="px-4 py-2 border">Plan</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">User Email</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(subscription => (
            <tr key={subscription.subscription_id}>
              <td className="px-4 py-2 border">{subscription.subscription_id}</td>
              <td className="px-4 py-2 border">{subscription.plan}</td>
              <td className="px-4 py-2 border">${subscription.price}</td>
              <td className="px-4 py-2 border">{new Date(subscription.start_date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{subscription.user_name}</td>
              <td className="px-4 py-2 border">{subscription.user_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


