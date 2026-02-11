// "use client";
// import { useGetAdminDashboardHomeOverviewQuery } from "@/redux/api/dashboardHomeAdmin/adminDashboardHomeSlicApi";
// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const Charts: React.FC = () => {
//   const [timeRange, setTimeRange] = useState("Last 6 months");

//   const { data: responseData, isLoading } =
//     useGetAdminDashboardHomeOverviewQuery("");
//   console.log(responseData?.data?.reportTrend);
//   const chartVatue = responseData?.data?.reportTrend;

//   const data = [
//     { month: "Jan", reports: 400, users: 100 },
//     { month: "Feb", reports: 500, users: 110 },
//     { month: "Mar", reports: 580, users: 115 },
//     { month: "Apr", reports: 630, users: 120 },
//     { month: "May", reports: 700, users: 130 },
//     { month: "Jun", reports: 800, users: 140 },
//   ];

//   return (
//     <div className="w-full bg-gray-50 p-4 md:p-8">
//       <div className="">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
//               Platform Usage Trends
//             </h1>
//             <p className="mt-1 text-sm text-gray-600 md:text-base">
//               Reports and user growth over time
//             </p>
//           </div>
//           <button className="self-start rounded-lg border-2 border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:self-auto">
//             {timeRange}
//           </button>
//         </div>

//         {/* Chart */}
//         <div className="h-[400px] w-full md:h-[500px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 20,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis
//                 dataKey="month"
//                 tick={{ fill: "#6b7280", fontSize: 14 }}
//                 axisLine={{ stroke: "#e5e7eb" }}
//               />
//               <YAxis
//                 tick={{ fill: "#6b7280", fontSize: 14 }}
//                 axisLine={{ stroke: "#e5e7eb" }}
//                 domain={[0, 1000]}
//                 ticks={[0, 250, 500, 750, 1000]}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "white",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "8px",
//                   padding: "12px",
//                 }}
//                 labelStyle={{ color: "#111827", fontWeight: "bold" }}
//               />
//               <Legend
//                 wrapperStyle={{
//                   paddingTop: "20px",
//                 }}
//                 iconType="rect"
//                 iconSize={14}
//               />
//               <Bar
//                 dataKey="reports"
//                 fill="#2563eb"
//                 radius={[8, 8, 0, 0]}
//                 name="Reports"
//                 maxBarSize={60}
//               />
//               <Bar
//                 dataKey="users"
//                 fill="#16a34a"
//                 radius={[8, 8, 0, 0]}
//                 name="Users"
//                 maxBarSize={60}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;

"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAdminDashboardHomeOverviewQuery } from "@/redux/api/dashboardHomeAdmin/adminDashboardHomeSlicApi";

const Charts: React.FC = () => {
  const [timeRange] = useState("Last 6 months");

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAdminDashboardHomeOverviewQuery("");

  // API response data
  const chartData = responseData?.data?.reportTrend || [];

  //  Loading state
  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  //  Error state
  if (isError) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-red-500">Failed to load chart data</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Platform Usage Trends
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Reports and customer growth over time
          </p>
        </div>

        <span className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 sm:self-auto">
          {timeRange}
        </span>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 14 }}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#6b7280", fontSize: 14 }}
              axisLine={{ stroke: "#d1d5db" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
              }}
            />

            <Legend iconType="rect" iconSize={14} />

            <Bar
              dataKey="reports"
              name="Reports"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />

            <Bar
              dataKey="customers"
              name="Customers"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
