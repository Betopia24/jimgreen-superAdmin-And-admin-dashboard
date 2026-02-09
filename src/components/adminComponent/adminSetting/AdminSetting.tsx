// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// interface ProfileFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// interface SecurityFormData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// interface NotificationSettings {
//   emailNotifications: boolean;
//   meetingReminders: boolean;
//   aiInsights: boolean;
// }

// const AdminSettingsPage = () => {
//   const [notifications, setNotifications] = useState<NotificationSettings>({
//     emailNotifications: true,
//     meetingReminders: true,
//     aiInsights: true,
//   });

//   const profileForm = useForm<ProfileFormData>({
//     defaultValues: {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@company.com",
//     },
//   });

//   const securityForm = useForm<SecurityFormData>({
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const onProfileSubmit = (data: ProfileFormData) => {
//     console.log("Profile data:", data);
//     alert("Profile changes saved!");
//   };

//   const onSecuritySubmit = (data: SecurityFormData) => {
//     if (data.newPassword !== data.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Security data:", data);
//     alert("Security preferences saved!");
//     securityForm.reset();
//   };

//   const toggleNotification = (key: keyof NotificationSettings) => {
//     setNotifications((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <div className="">
//       <div className="space-y-6">
//         {/* Profile Information Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Profile Information
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Update your personal information
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   {...profileForm.register("firstName", { required: true })}
//                   className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   {...profileForm.register("lastName", { required: true })}
//                   className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...profileForm.register("email", { required: true })}
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={profileForm.handleSubmit(onProfileSubmit)}
//               className="rounded-md bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>

//         {/* Notifications Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Notifications
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Configure how you receive notifications
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">
//                   Email Notifications
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Receive updates via email
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("emailNotifications")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.emailNotifications
//                     ? "bg-primary"
//                     : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.emailNotifications
//                       ? "translate-x-6"
//                       : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">
//                   Meeting Reminders
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Get reminders before meetings
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("meetingReminders")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.meetingReminders ? "bg-primary" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.meetingReminders
//                       ? "translate-x-6"
//                       : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">AI Insights</p>
//                 <p className="text-sm text-gray-500">
//                   Receive AI-generated insights
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("aiInsights")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.aiInsights ? "bg-primary" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.aiInsights ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Security</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Customize your experience
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("currentPassword", {
//                   required: true,
//                 })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("newPassword", { required: true })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("confirmPassword", {
//                   required: true,
//                 })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={securityForm.handleSubmit(onSecuritySubmit)}
//               className="rounded-md bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
//             >
//               Save Preferences
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettingsPage;

"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import {
  useChangePasswordMutation,
  useGetMeProfileQuery,
  useProfileUpdateAvatarMutation,
  useProfileUpdateMutation,
} from "@/redux/api/getMe/getMeApi";

import { toast } from "sonner";

import { LuLoader } from "react-icons/lu";
import LoadingPage from "@/share/loading/LoadingPage";
import { Error } from "../TeamManagement/addMember/AddMemberForm";
import PrimaryButton from "@/share/primaryButton/PrimaryButton";

// Type definitions
interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

export default function AdminSettingsPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const [updateProfilePost, { isLoading }] = useProfileUpdateMutation();
  const [avatarUpdateProfilePost, { isLoading: avatarLoading }] =
    useProfileUpdateAvatarMutation();
  const [changePasswordPost, { isLoading: passowrChangeLoading }] =
    useChangePasswordMutation();

  const [profileImage, setProfileImage] = useState<string | null>(
    "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
  );

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset,
  } = useForm<ProfileFormData>();

  // Security form
  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: securityErrors },
    watch,
    reset: resetSecurity,
  } = useForm<SecurityFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  console.log(data?.data.avatar);

  // Handle image upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log(file);

      const payload = new FormData();

      payload.append("file", file);

      try {
        const response = await avatarUpdateProfilePost(payload).unwrap();
        if (response?.success) {
          toast.success(response?.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.data.message);
      }
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      });

      if (data.data.avatar) {
        setProfileImage(data.data.avatar);
      }
    }
  }, [data, reset]);

  const onProfileSubmit: SubmitHandler<ProfileFormData> = async (formData) => {
    try {
      const response = await updateProfilePost({ payload: formData }).unwrap();
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.data.message);
    }
  };

  // Handle security form submission
  const onSecuritySubmit: SubmitHandler<SecurityFormData> = async (data) => {
    console.log("Security Data:", data);
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await changePasswordPost(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.data.message);
    }
    resetSecurity();
  };

  const avatarSrc = profileImage?.trim();
  console.log(avatarSrc);

  if (profielLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="">
      <div className="space-y-10">
        {/* Profile Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal information
              </p>
            </div>

            <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
              {/* Profile Image Upload */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200 shadow-lg ring-4 ring-white sm:h-28 sm:w-28">
                    {/* <Image
                      width={111}
                      height={111}
                      src={avatarSrc}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    /> */}

                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
                  >
                    {avatarLoading ? (
                      <>
                        <LuLoader className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </>
                    )}
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name Fields */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...registerProfile("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                  {profileErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...registerProfile("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                  {profileErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...registerProfile("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="john@company.com"
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <PrimaryButton
                type="submit"
                text="Save Changes"
                className="px-10 py-3"
                loading={isLoading}
              ></PrimaryButton>
            </form>
          </div>
        </div>

        {/* Security Section */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Security
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Customize your experience
              </p>
            </div>

            <form onSubmit={handleSubmitSecurity(onSecuritySubmit)}>
              {/* Current Password */}
              <div className="mb-6">
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    {...registerSecurity("currentPassword", {
                      required: "Current password is required",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {securityErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...registerSecurity("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showNewPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {securityErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="mb-8">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerSecurity("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value: string) =>
                        value === newPassword || "Passwords do not match",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {securityErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <PrimaryButton
                type="submit"
                text="Save Password Change"
                className="px-10 py-3"
                loading={passowrChangeLoading}
              ></PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
