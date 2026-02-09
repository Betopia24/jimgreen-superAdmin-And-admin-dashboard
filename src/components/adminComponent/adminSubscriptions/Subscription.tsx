"use client";
import {
  useGetActiveSubscriptionPanQuery,
  usePaymentCreateMutation,
} from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";
import {
  setClientSecret,
  setPlan,
} from "@/redux/features/payment/paymentSlice";
import LoadingPage from "@/share/loading/LoadingPage";
import PrimaryButton from "@/share/primaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import React from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch } from "react-redux";

export interface Plan {
  id: string;
  name: "EXPERT" | "ADVANCED" | "BASIC"; // keep string for future plans
  isActive: boolean;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  maxReports: number;
  maxAccounts: number;
  features: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

const AdminSubscriptionPlan: React.FC = () => {
  const [loadingPlanId, setLoadingPlanId] = React.useState<string | null>(null);

  const { data, isLoading } = useGetActiveSubscriptionPanQuery("");
  const [paymentPost, { isLoading: payLoading }] = usePaymentCreateMutation();
  const router = useRouter();

  const dispatch = useDispatch();
  const plans: Plan[] = data?.data;

  const handleSubscriptSelect = async (subscriptionId: string) => {
    try {
      setLoadingPlanId(subscriptionId);
      const response = await paymentPost({
        planId: subscriptionId,
        planType: "monthly",
      }).unwrap();

      dispatch(setClientSecret(response?.data.clientSecret));
      router.push("/admin/subscriptions/payment");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPlanId(null);
    }
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

                  <ul className="space-y-2.5">
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
                  </ul>
                </div>

                {/* Bottom Button */}

                <button
                  disabled={loadingPlanId === plan.id}
                  onClick={() => handleSubscriptSelect(plan.id)}
                  className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border bg-primary py-2 text-sm font-medium text-white transition hover:bg-primary hover:text-white"
                >
                  {loadingPlanId === plan.id && (
                    <LuLoader className="animate-spin" />
                  )}
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
