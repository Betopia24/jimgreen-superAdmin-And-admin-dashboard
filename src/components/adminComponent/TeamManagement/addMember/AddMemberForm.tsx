"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, ChevronDown, Eye, EyeOff } from "lucide-react";

interface AddUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function AddMemberForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AddUserFormData) => {
    console.log("Form Data:", data);
    // Handle form submission here
    alert("User added successfully!");
    reset();
  };

  return (
    <div className="">
      <div className="">
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Add User
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Add your user and let them manage your company work.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                    className={`block w-full border py-3 pl-10 pr-3 ${
                      errors.firstName ? "border-red-300" : "border-gray-300"
                    } rounded-lg bg-gray-50 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-base`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    type="text"
                    id="lastName"
                    placeholder="Enter last name"
                    className={`block w-full border py-3 pl-10 pr-3 ${
                      errors.lastName ? "border-red-300" : "border-gray-300"
                    } rounded-lg bg-gray-50 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-base`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Password Row */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`block w-full border py-3 pl-10 pr-3 ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg bg-gray-50 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-base`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className={`block w-full border py-3 pl-10 pr-12 ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } rounded-lg bg-gray-50 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-base`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-lg pr-3 transition-colors hover:bg-gray-100"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Roll
              </label>
              <div className="relative">
                <select
                  {...register("role", { required: "Role is required" })}
                  id="role"
                  className={`block w-full appearance-none border py-3 pl-4 pr-10 ${
                    errors.role ? "border-red-300" : "border-gray-300"
                  } cursor-pointer rounded-lg bg-gray-50 text-sm text-gray-700 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-base`}
                >
                  <option value="user">User</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-5 pt-4">
              <button
                type="submit"
                className="0 w-full rounded-lg bg-gray-300 px-8 py-3 text-sm font-medium text-black shadow-lg transition-all duration-200 hover:bg-gray-400 hover:shadow-xl focus:outline-none focus:ring-2 sm:w-auto sm:text-base"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-base"
              >
                Add New User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
