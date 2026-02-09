"use client";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import Link from "next/link";
import { useGetAllSubscriptionPanQuery } from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";

interface Plan {
  name: string;
  highlighted: boolean;
  description: string;
  price: number;
  features: string[];
}

interface Distribution {
  plan: string;
  users: number;
  percentage: number;
  color: string;
}

const SubscriptionPlan: React.FC = () => {
  const { data, isLoading } = useGetAllSubscriptionPanQuery("");

  console.log(data);

  const plans: Plan[] = [
    {
      name: "Basic",
      highlighted: false,
      description:
        "The Slate necessities. Every thing you need to get up and running.",
      price: 16.0,
      features: [
        "3 meeting preparations per month",
        "Basic company insights",
        "Meeting summary export",
        "Email support",
      ],
    },
    {
      name: "Basic",
      highlighted: true,
      description:
        "The Slate necessities. Every thing you need to get up and running.",
      price: 16.0,
      features: [
        "Unlimited meeting preparations",
        "Advanced AI insights & scripts",
        "Competitor analysis",
        "Risk alerts & red flags",
        "Meeting templates",
        "Priority support",
        "Team collaboration (coming soon)",
      ],
    },
    {
      name: "Basic",
      highlighted: false,
      description:
        "The Slate necessities. Every thing you need to get up and running.",
      price: 16.0,
      features: [
        "Unlimited meeting preparations",
        "Team collaboration (coming soon)",
        "Competitor analysis",
        "Risk alerts & red flags",
        "Priority support",
        "Advanced AI insights & scripts",
      ],
    },
  ];

  const distribution: Distribution[] = [
    { plan: "Free", users: 4224, percentage: 34, color: "bg-gray-400" },
    { plan: "Pro", users: 5834, percentage: 47, color: "bg-primary" },
    { plan: "Enterprise", users: 2400, percentage: 19, color: "bg-green-600" },
  ];

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Subscription Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage pricing plans and monitor subscription metrics
            </p>
          </div>
          <Link
            href={`/super-admin/subscriptions/add-plan`}
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition hover:bg-blue-900"
          >
            Add New Plan
          </Link>
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan: Plan, index: number) => (
              <div
                key={index}
                className={`flex h-full flex-col rounded-lg bg-white p-6 shadow-sm`}
              >
                <div className="mb-4 rounded-xl bg-gray-2 p-4">
                  <div
                    className={`mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium ${
                      plan.highlighted
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
                    <span className="text-2xl font-bold text-gray-900 xl:text-3xl">
                      ${plan.price.toFixed(2)}
                    </span>
                    <span className="ml-2 text-gray-500">/Month</span>
                  </div>
                </div>

                {/* Features - flex-grow keeps bottom button aligned */}
                <div className="mb-6 flex-grow">
                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Featured Include :
                  </p>

                  <ul className="space-y-2.5">
                    {plan.features.map((feature: string, idx: number) => (
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
                <Link
                  href={`/super-admin/subscriptions/edit-plan`}
                  className="bg-[rgba(255, 255, 255, 0.20)] mt-auto flex w-full items-center justify-center gap-3 rounded-full border py-2 text-sm font-medium text-gray-700 transition hover:bg-primary hover:text-white"
                >
                  Edit Plan
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
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Subscription Distribution
          </h2>
          <div className="space-y-4">
            {distribution.map((item: Distribution, index: number) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.plan}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.users} users ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
