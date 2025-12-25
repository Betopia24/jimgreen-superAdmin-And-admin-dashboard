"use client";
import React from "react";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ChartLine,
  FileText,
  CalendarCheck,
} from "lucide-react";
import { Calendar } from "@/components/Layouts/sidebar/icons";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  change,
  iconBgColor,
}) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`${iconBgColor} mb-4 flex h-12 w-12 items-center justify-center rounded-lg`}
      >
        {icon}
      </div>
      <h3 className="mb-1 text-base text-gray-500">{title}</h3>
      <p className="mb-2 text-2xl font-semibold text-gray-900">{value}</p>
      <p
        className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
      >
        {change} from last month
      </p>
    </div>
  );
};

export default function DashboardOverview() {
  const stats = [
    {
      icon: <ChartLine className="h-6 w-6 text-primary" />,
      title: "Total Analyses",
      value: "12",
      change: "+12.5% vs last month",
      iconBgColor: "bg-indigo-100",
    },
    {
      icon: <CalendarCheck className="h-6 w-6 text-primary" />,
      title: "Last 30 Days",
      value: "40",
      change: "+24 calculations",
      iconBgColor: "bg-indigo-100",
    },

    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Total Users",
      value: "12,45",
      change: "+23 this month",
      iconBgColor: "bg-indigo-100",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Reports Generated",
      value: "567",
      change: "+23 this month",
      iconBgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage all users, buyers, sellers, and dealers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
