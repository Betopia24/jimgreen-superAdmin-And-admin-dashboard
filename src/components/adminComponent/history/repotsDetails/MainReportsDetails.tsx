"use client";
import { useGetReportHistorySignleQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import ReportsDetailsOne from "./ReportsDetailsOne";
// import TrendAnalysisDashboard from "./ReportsDetailsTow";

import ShowAllReportDetailsData from "./ShowAllReportDetailsData";
import LoadingPage from "@/share/loading/LoadingPage";

const MainReportsDetails = ({ historyId }: { historyId: string }) => {
  // console.log("historyid==============", historyId);
  const { data: reportDetailsData, isLoading } =
    useGetReportHistorySignleQuery(historyId);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div>
      {/* <ReportsDetailsOne />
      <TrendAnalysisDashboard /> */}
      <ShowAllReportDetailsData reportDetailsData={reportDetailsData} />
    </div>
  );
};

export default MainReportsDetails;
