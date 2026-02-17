"use client";

import MainReportsDetails from "@/components/adminComponent/history/repotsDetails/MainReportsDetails";
import { useParams } from "next/navigation";

function HistoryDetails() {
  const { historyId } = useParams();
  return (
    <div className="my-6">
      <MainReportsDetails historyId={historyId as string} />
    </div>
  );
}

export default HistoryDetails;
