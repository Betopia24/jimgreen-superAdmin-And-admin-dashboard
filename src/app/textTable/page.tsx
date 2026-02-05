"use client";

import React from "react";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function LatestRepostTable() {
  const reports = [
    {
      id: "RPT-1247",
      client: "Riverside Municipal",
      date: "2 hours ago",
      phLevel: "7.4",
      status: "Good",
      statusColor: "bg-[#DCFCE7] text-[#008236]",
    },
    {
      id: "RPT-1247",
      client: "Industrial Corp",
      date: "2 hours ago",
      phLevel: "8.2",
      status: "Warning",
      statusColor: "bg-[#FEF9C2] text-[#A65F00]",
    },
    {
      id: "RPT-1247",
      client: "City Pool Services",
      date: "2 hours ago",
      phLevel: "7.6",
      status: "Good",
      statusColor: "bg-[#DCFCE7] text-[#008236]",
    },
    {
      id: "RPT-1247",
      client: "Residential B",
      date: "2 hours ago",
      phLevel: "9.1",
      status: "Critical",
      statusColor: "bg-[#FFE2E2] text-[#C10007]",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-50 pb-6">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-3xl font-medium text-[#101828]">
            Latest Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F3F4F6]">
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  Report ID
                </th>
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  pH Level
                </th>
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[16px] font-semibold text-[#4A5565]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-[#0058DD]">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#101828]">
                    {report.client}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#4A5565]">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm text-[#4A5565]">
                        {report.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#101828]">
                    {report.phLevel}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${report.statusColor}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/dashboard/${report.id}`}>
                      <button className="cursor-pointer text-sm font-medium text-[#0058DD] transition-colors hover:text-[#0058DD] hover:underline">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
