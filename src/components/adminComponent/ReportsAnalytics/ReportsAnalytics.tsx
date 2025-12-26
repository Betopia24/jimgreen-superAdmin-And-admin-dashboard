"use client";
import React, { useState } from "react";
import { TrendingUp, Calendar, BarChart3, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

interface Report {
  id: string;
  customer: string;
  type: string;
  status: "Completed" | "Processing";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  positive = true,
}) => (
  <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="mb-1 text-sm text-gray-600">{title}</p>
        <p className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          {value}
        </p>
        <p
          className={`text-sm ${positive ? "text-green-600" : "text-red-600"} font-medium`}
        >
          {change}
        </p>
      </div>
      <div className="ml-2 text-blue-500">{icon}</div>
    </div>
  </div>
);

const ReportsAnalytics: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");

  const chartData = [
    { month: "Jul", reports: 400, customers: 80 },
    { month: "Aug", reports: 430, customers: 85 },
    { month: "Sep", reports: 450, customers: 90 },
    { month: "Oct", reports: 470, customers: 95 },
    { month: "Nov", reports: 490, customers: 100 },
    { month: "Dec", reports: 510, customers: 105 },
  ];

  const recentReports: Report[] = [
    {
      id: "RPT-1247",
      customer: "Riverside Municipal",
      type: "Water Quality",
      status: "Completed",
    },
    {
      id: "RPT-1247",
      customer: "Industrial Corp",
      type: "Chemical Analysis",
      status: "Processing",
    },
    {
      id: "RPT-1247",
      customer: "City Pool Services",
      type: "Contamination Risk",
      status: "Completed",
    },
    {
      id: "RPT-1247",
      customer: "Residential B",
      type: "Compliance Check",
      status: "Completed",
    },
  ];

  return (
    <div className="">
      <div className="mx-auto max-w-7xl">
        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <StatCard
            title="Total Reports"
            value="1,247"
            change="+12.5% vs last month"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <StatCard
            title="This Month"
            value="89"
            change="+24 calculations"
            icon={<Calendar className="h-6 w-6" />}
          />
          <StatCard
            title="Avg Per Day"
            value="123"
            change="+23 today"
            icon={<BarChart3 className="h-6 w-6" />}
          />
          <StatCard
            title="Reports Generated"
            value="1,247"
            change="+23 this month"
            icon={<CheckCircle className="h-6 w-6" />}
          />
        </div>

        {/* Chart Section */}
        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl">
                Report Generation Trend
              </h2>
              <p className="text-sm text-gray-600">
                Monthly reports and active customers
              </p>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </select>
          </div>

          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Recent Reports
            </h2>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="border-b border-gray-100 p-4 last:border-b-0"
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-sm font-semibold text-blue-600">
                    {report.id}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      report.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="mb-1 text-sm font-medium text-gray-900">
                  {report.customer}
                </p>
                <p className="mb-3 text-sm text-gray-600">{report.type}</p>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {recentReports.map((report, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm font-semibold text-blue-600">
                        {report.id}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {report.customer}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {report.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          report.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
