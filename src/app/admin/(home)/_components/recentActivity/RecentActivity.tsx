import { useGetAdminDashboardHomeOverviewQuery } from "@/redux/api/dashboardHomeAdmin/adminDashboardHomeSlicApi";
import { CircleCheckBig, Users } from "lucide-react";
import React from "react";

interface Activity {
  id: number;
  name: string;
  action: string;
  time: string;
  avatar: string;
  bgColor: string;
}

interface RecentReport {
  id: string;
  reportId: string;
  customer: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const RecentActivity: React.FC = () => {
  const { data, isLoading } = useGetAdminDashboardHomeOverviewQuery("");

  const allRecentData: RecentReport[] = data?.data?.recentReports;

  // Helper function for time format
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor(
      (now.getTime() - created.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="">
        <div className="overflow-hidden shadow-sm">
          {/* Header */}
          <div className="">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Recent Activity
            </h2>
          </div>

          {/* Activity List */}
          <div className="mt-7 rounded-xl border py-6">
            {allRecentData.map((report) => (
              <div
                key={report.id}
                className="cursor-pointer px-4 py-3 transition-colors duration-150 hover:bg-gray-50 sm:px-6 lg:px-8"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left side: Avatar + Info */}
                  <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    {/* Avatar */}
                    {/* <div
                      className={`${activity.bgColor} flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-md sm:h-12 sm:w-12 sm:text-base`}
                    >
                      {activity.avatar}
                    </div> */}

                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100`}
                    >
                      <CircleCheckBig className="h-6 w-6 text-green-700" />
                    </div>
                    {/* Name and Action */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                        {report.reportId}
                      </h3>
                      <p className="truncate text-xs text-gray-500 sm:text-sm">
                        {report.type}
                      </p>
                    </div>
                  </div>

                  {/* Right side: Time */}
                  <div className="flex-shrink-0">
                    <span className="whitespace-nowrap text-xs font-medium text-gray-400 sm:text-sm">
                      {formatTimeAgo(report.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile optimized notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 sm:text-sm">
            Showing recent user activities
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
