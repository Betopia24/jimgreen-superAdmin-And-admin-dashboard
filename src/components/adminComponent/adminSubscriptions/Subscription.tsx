"use client";
import { useGetActiveSubscriptionPanQuery } from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";
import { setPlan } from "@/redux/features/payment/paymentSlice";
import LoadingPage from "@/share/loading/LoadingPage";
import React from "react";
import { useDispatch } from "react-redux";

export interface PlanFeatures {
  aiAnalysis: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
  customBranding: boolean;
  dashboardAnalytics: boolean;
  advancedReports: boolean;
}

export interface Plan {
  id: string;
  name: "EXPERT" | "ADVANCED" | string; // keep string for future plans
  isActive: boolean;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  maxReports: number;
  maxAccounts: number;
  features: PlanFeatures;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

const AdminSubscriptionPlan: React.FC = () => {
  const { data, isLoading } = useGetActiveSubscriptionPanQuery("");

  const dispatch = useDispatch();
  console.log(data);
  // const plans: Plan[] = [
  //   {
  //     name: "Basic",
  //     highlighted: false,
  //     description:
  //       "The Slate necessities. Every thing you need to get up and running.",
  //     price: "Free",
  //     features: [
  //       "3 meeting preparations per month",
  //       "Basic company insights",
  //       "Meeting summary export",
  //       "Email support",
  //     ],
  //   },
  //   {
  //     name: "Advanced",
  //     highlighted: true,
  //     description:
  //       "The Slate necessities. Every thing you need to get up and running.",
  //     price: 100.0,
  //     features: [
  //       "Unlimited meeting preparations",
  //       "Advanced AI insights & scripts",
  //       "Competitor analysis",
  //       "Risk alerts & red flags",
  //       "Meeting templates",
  //       "Priority support",
  //       "Team collaboration (coming soon)",
  //     ],
  //   },
  //   {
  //     name: "Expert",
  //     highlighted: false,
  //     description:
  //       "The Slate necessities. Every thing you need to get up and running.",
  //     price: 230.0,
  //     features: [
  //       "Unlimited meeting preparations",
  //       "Team collaboration (coming soon)",
  //       "Competitor analysis",
  //       "Risk alerts & red flags",
  //       "Priority support",
  //       "Advanced AI insights & scripts",
  //     ],
  //   },
  // ];
  const plans: Plan[] = data?.data;
  console.log(plans);
  const distribution = [
    { plan: "Free", users: 4224, percentage: 34, color: "bg-gray-400" },
    { plan: "Pro", users: 5834, percentage: 47, color: "bg-primary" },
    { plan: "Enterprise", users: 2400, percentage: 19, color: "bg-green-600" },
  ];

  const handleSubscriptSelect = (subscriptionId: string) => {
    dispatch(
      setPlan({
        planId: subscriptionId,
        planType: "monthly",
      }),
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Subscription Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage pricing plans and monitor subscription metrics
            </p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans?.map((plan: Plan, index: number) => (
              <div
                key={index}
                className={`flex h-full flex-col rounded-lg bg-white p-6 shadow-sm`}
              >
                <div className="mb-4 rounded-xl bg-gray-2 p-4">
                  <div
                    className={`mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium ${
                      plan.name === "ADVANCED"
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                  >
                    {plan.name}
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {typeof plan?.monthlyPrice === "number" ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900 xl:text-3xl">
                          ${plan.monthlyPrice}
                        </span>
                        <span className="ml-2 text-gray-500">/Month</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-gray-900 xl:text-3xl">
                          {plan.monthlyPrice}
                        </span>
                        <span className="ml-2 text-gray-500"></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Features - flex-grow keeps bottom button aligned */}
                <div className="mb-6 flex-grow">
                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Featured Include :
                  </p>

                  {/* <ul className="space-y-2.5">
                    {plan?.features?.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="mt-0.5 h-7 w-7 flex-shrink-0 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>

                {/* Bottom Button */}
                <button
                  onClick={() => handleSubscriptSelect(plan.id)}
                  className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border bg-primary py-2 text-sm font-medium text-gray-700 text-white transition hover:bg-primary hover:text-white"
                >
                  Upgrade Plan
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionPlan;
