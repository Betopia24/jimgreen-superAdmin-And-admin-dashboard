import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";

import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";

import RecentActivity from "./_components/recentActivity/RecentActivity";
import DashboardOverview from "./_components/overview-cards/OverView";
import RevenueGrowthChart from "./_components/chats/Chats";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <DashboardOverview />
      </Suspense>

      <div className="mt-10">
        <RevenueGrowthChart />
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />

        <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        <RegionLabels />
      </div> */}
      <div className="mt-10">
        <RecentActivity />
      </div>
    </>
  );
}
