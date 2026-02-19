"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Info, DollarSign, Zap, Plus, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCreateSubscriptionPanMutation,
  useDeleteSubscriptionPanMutation,
  useGetSingleSubscriptionPanQuery,
  useUpdateSubscriptionPanMutation,
} from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";
import { toast } from "sonner";
import { Error } from "@/components/adminComponent/TeamManagement/addMember/AddMemberForm";
import PrimaryButton from "@/share/primaryButton/PrimaryButton";
import LoadingPage from "@/share/loading/LoadingPage";
import DeleteConfirmModal from "@/share/DeteleConfirm/DeleteConfirm";

interface PlanFormData {
  name: string;
  isActive: boolean;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  maxReports: number;
  maxAccounts: number;
  features: string[];
}

export default function NewPlan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlanFormData>({
    defaultValues: {
      name: "",
      isActive: true,
      description: "Brief description of the plan",
      monthlyPrice: 29,
      annualPrice: 9,
      maxAccounts: 100,
      maxReports: 50,
      features: [
        "AI Persona Customization",
        "Question Recommender",
        "Deal Intelligence",
        "Multi-language Support",
        "Dashboard Analytics",
        "Priority Support",
      ],
    },
  });

  const [newFeatureName, setNewFeatureName] = useState("");
  const features = watch("features");

  const { data, isLoading: planLoading } = useGetSingleSubscriptionPanQuery(id);

  console.log(data);

  const [updatePlanPost, { isLoading }] = useUpdateSubscriptionPanMutation();
  const [deletePan, { isLoading: DeleteLoading }] =
    useDeleteSubscriptionPanMutation();

  const handleAddFeature = () => {
    if (!newFeatureName.trim()) {
      setError("Feature name is required");
      return;
    }

    setValue("features", [...features, newFeatureName.trim()]);
    setError("");
    setNewFeatureName("");
  };

  const handleRemoveFeature = (index: number) => {
    setValue(
      "features",
      features.filter((_, idx) => idx !== index),
    );
  };

  const handleEditFeature = (index: number, newValue: string) => {
    setValue(
      "features",
      features.map((feature, idx) => (idx === index ? newValue : feature)),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  // const onSubmit = async (data: PlanFormData) => {
  //   console.log("Form Data:", data);
  //   // Handle form submission
  //   try {
  //     const response = await updatePlanPost(data).unwrap();
  //     if (response?.success) {
  //       toast.success(response?.message);
  //     }
  //   } catch (error) {
  //     const err = error as Error;
  //     toast.error(err.data.message);
  //   }
  // };

  const onSubmit = async (formData: PlanFormData) => {
    console.log(formData);
    try {
      const response = await updatePlanPost({
        id,
        data: formData,
      }).unwrap();

      if (response?.success) {
        toast.success(response.message);
        router.push("/super-admin/subscriptions");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.data.message);
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        isActive: data.data.isActive,
        description: data.data.description,
        monthlyPrice: data.data.monthlyPrice,
        annualPrice: data.data.annualPrice,
        maxAccounts: data.data.maxAccounts,
        maxReports: data.data.maxReports,
        features: data.data.features,
      });
    }
  }, [data, reset]);

  const handleReset = () => {
    reset();
    setNewFeatureName("");
  };

  // delete fucntion
  const handleDelete = async () => {
    try {
      const response = await deletePan(id).unwrap();
      if (response?.success) {
        toast.success(response.message);
        router.push("/super-admin/subscriptions");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (planLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Subscription Plan
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Modify plan details, pricing, features, and visibility settings
          </p>
        </div>

        {/* Plan Information Section */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Plan Information
            </h2>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Plan Name
              </label>
              <select
                {...register("name", { required: "Plan name is required" })}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Plan</option>
                <option value="BASIC">Basic</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXPERT">Expert</option>
              </select>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {field.value ? "Active" : "Inactive"}
                    </span>
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        field.value ? "bg-primary" : "bg-gray-300"
                      }`}
                      aria-label="Toggle status"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          field.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <label className="my-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Monthly Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  {...register("monthlyPrice", {
                    valueAsNumber: true,
                    required: "Monthly price is required",
                  })}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.monthlyPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.monthlyPrice.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Annual Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  {...register("annualPrice", {
                    valueAsNumber: true,
                    required: "Annual price is required",
                  })}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.annualPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.annualPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Feature Limits Section */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Feature Limits
            </h2>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Max Meetings per Month
              </label>
              <input
                type="number"
                {...register("maxAccounts", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Max AI Simulations
              </label>
              <input
                type="number"
                {...register("maxReports", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Feature List Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Features</h3>

            {/* Add New Feature Input */}
            {/* <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter new feature name"
                className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div> */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureName}
                  onChange={(e) => {
                    setNewFeatureName(e.target.value);
                    if (error) setError(""); // clear error while typing
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddFeature();
                    }
                  }}
                  placeholder="Enter new feature name"
                  className={`flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    error
                      ? "border-red-400 bg-red-50 focus:ring-red-400"
                      : "border-gray-200 bg-gray-50 focus:ring-blue-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              {/* ✅ Error Message */}
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-md p-3 ${idx % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <div className="flex flex-1 items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleEditFeature(idx, e.target.value)}
                      className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="ml-2 text-gray-400 transition-colors hover:text-red-500"
                    aria-label={`Remove ${feature}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => {
                setSelectedItem(id);
                setIsDeleteOpen(true);
              }}
              className="rounded-md border border-red-500 bg-red-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Delete
            </button>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              Reset to Default
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <div>
              <PrimaryButton
                text=" Save Changes"
                type="submit"
                loading={isLoading}
                className="px-6 py-2"
              />
            </div>
          </div>
        </div>
      </form>
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Subscription Plan"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        isLoading={DeleteLoading}
      />
    </div>
  );
}
