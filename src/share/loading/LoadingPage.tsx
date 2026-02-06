"use client";

import Image from "next/image";
import loadingCircle from "@/assets/loading/loadingCerle.svg";

const LoadingPage = () => {
  return (
    <div className="lg:min-h-9/12 flex min-h-64 items-center justify-center">
      <div className="relative">
        <Image
          src={loadingCircle}
          width={100}
          height={100}
          alt="Loading"
          priority
          //   className="animate-spin"
        />
        <p className="mt-4 text-center text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
