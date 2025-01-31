import React from "react";
import { DashUsersList } from "../../../components/DashUserList";
import { DashUserProjectList } from "../../../components/DashUserProjectList";
import { Rentability } from "../../../components/Rentability";
import { DashContactList } from "../../../components/DashContactList";
import { Servers } from "../../../components/Servers";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-8">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <DashUsersList />
            <Rentability />
          </div>
          
          <div className="space-y-6">
            <DashUserProjectList />
            <DashContactList />
          </div>
        </div>
        
        <div className="mt-6">
          <Servers />
        </div>
      </div>
    </div>
  );
}
