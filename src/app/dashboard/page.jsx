"use strict";
"use client";

import React from "react";
import { 
  TrendingUp, 
  Layers, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    {
      title: "Total Sales",
      value: "৳ 1,24,500",
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
      iconColor: "text-emerald-400",
      bgColor: "from-emerald-500/10 to-transparent",
    },
    {
      title: "Products Managed",
      value: "148 Species",
      change: "+4 new today",
      isPositive: true,
      icon: Layers,
      iconColor: "text-aqButton",
      bgColor: "from-aqButton/10 to-transparent",
    },
    {
      title: "Active Orders",
      value: "42 Pending",
      change: "-2.3%",
      isPositive: false,
      icon: ShoppingBag,
      iconColor: "text-amber-400",
      bgColor: "from-amber-500/10 to-transparent",
    },
    {
      title: "Total Transactions",
      value: "1,840 Blows",
      change: "+8.1%",
      isPositive: true,
      icon: CreditCard,
      iconColor: "text-purple-400",
      bgColor: "from-purple-500/10 to-transparent",
    },
  ];

  const recentTransactions = [
    { id: "TXN-9081", customer: "Asmual Hoque", amount: "৳ 2,450", status: "Completed", date: "Today, 10:42 PM" },
    { id: "TXN-9080", customer: "Promi Rahman", amount: "৳ 1,200", status: "Pending", date: "Today, 08:15 PM" },
    { id: "TXN-9079", customer: "N Haque Store", amount: "৳ 5,800", status: "Completed", date: "Yesterday" },
    { id: "TXN-9078", customer: "Naomi Islam", amount: "৳ 950", status: "Failed", date: "Yesterday" },
  ];

  return (
    <div className="w-full text-white space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Welcome back, <span className="text-aqButton">Admin</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Here is a quick system summary and live analytic logs for Aquatic PlantoPedia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={index} 
              className={`bg-linear-to-br ${stat.bgColor} bg-aqBase/40 border border-aqGlow/10 rounded-xl p-5 backdrop-blur-md transition-all hover:border-aqGlow/30`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{stat.title}</span>
                <div className={`p-2 rounded-lg bg-aqBase border border-aqGlow/20 ${stat.iconColor}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg md:text-xl font-bold tracking-tight">{stat.value}</h3>
                <p className="text-[10px] mt-1 flex items-center gap-1">
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-amber-400" />
                  )}
                  <span className={stat.isPositive ? "text-emerald-400" : "text-amber-400"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-aqBase/40 border border-aqGlow/10 rounded-xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-aqGlow/10 pb-4 mb-4">
            <h2 className="text-sm font-semibold tracking-wide">Recent Infrastructure Logs</h2>
            <button className="text-[10px] text-aqButton hover:underline flex items-center gap-1">
              View All Transactions <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-aqGlow/10 text-gray-400 font-medium">
                  <th className="pb-3">Transaction ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aqGlow/5">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-aqGlow/5 transition-colors">
                    <td className="py-3 font-mono text-[11px] text-aqButton">{tx.id}</td>
                    <td className="py-3 text-gray-200">{tx.customer}</td>
                    <td className="py-3 font-semibold">{tx.amount}</td>
                    <td className="py-3">
                      <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-medium ${
                        tx.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        tx.status === "Pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                        "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-400 text-[11px]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-aqBase/40 border border-aqGlow/10 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="border-b border-aqGlow/10 pb-4 mb-4">
              <h2 className="text-sm font-semibold tracking-wide">Quick Database Actions</h2>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left text-xs bg-aqBase border border-aqGlow/20 hover:border-aqButton p-3 rounded-lg transition-all flex items-center justify-between group">
                <span>Add New Plant Stock</span>
                <span className="text-gray-500 group-hover:text-aqButton text-xs">→</span>
              </button>
              <button className="w-full text-left text-xs bg-aqBase border border-aqGlow/20 hover:border-aqButton p-3 rounded-lg transition-all flex items-center justify-between group">
                <span>Review Pending Orders</span>
                <span className="text-gray-500 group-hover:text-aqButton text-xs">→</span>
              </button>
              <button className="w-full text-left text-xs bg-aqBase border border-aqGlow/20 hover:border-aqButton p-3 rounded-lg transition-all flex items-center justify-between group">
                <span>System Health Reports</span>
                <span className="text-gray-500 group-hover:text-aqButton text-xs">→</span>
              </button>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-aqGlow/10 text-[10px] text-gray-500 text-center">
            Connected to Atlas Cluster: Aquatic_PlantoPedia
          </div>
        </div>
      </div>
    </div>
  );
}   