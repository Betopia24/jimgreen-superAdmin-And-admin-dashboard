"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  X,
  User,
  Calendar,
  Clock,
  Shield,
  Delete,
  Trash,
  Trash2,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import {
  useDeleteUserMutation,
  useGetsuperAdminUsermanagementQuery,
  useUserSuspendMutation,
} from "@/redux/api/super-admin/userManagement/superAdminUserManagementlicApi";
import DeleteConfirmModal from "@/share/DeteleConfirm/DeleteConfirm";
import { toast } from "sonner";

export type UserStatus = "BLOCK" | "UNBLOCK";
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type UserTier = "FREE" | "PAID";

export interface CompanyMember {
  id: string;
  companyId: string;
  role: "owner" | "member";
  status: "active" | "blocked";
}

export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  status: UserStatus;
  role: UserRole;
  tier: UserTier;
  createdAt: string;
  updatedAt: string;
  companyMember: CompanyMember | null;
}

// export type UIUserStatus = "Active" | "Inactive" | "Suspended";
export type FilterStatus = "All" | "Active" | "blocked";

export interface UIUser {
  id: string;
  name: string;
  email: string;
  subscription: UserTier;
  createdDate: string;
  lastActive: string;
  status: FilterStatus;
}

const mapApiUserToUIUser = (user: ApiUser): UIUser => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`,
  email: user.email,
  subscription: user.tier,
  createdDate: new Date(user.createdAt).toLocaleDateString(),
  lastActive: new Date(user.updatedAt).toLocaleDateString(),
  status: user.status === "UNBLOCK" ? "Active" : "blocked",
});

const UserManagement: React.FC = () => {
  const { data, isLoading } = useGetsuperAdminUsermanagementQuery("");
  const [deleteUserPost, { isLoading: DeleteLoading }] =
    useDeleteUserMutation();
  const [accountSuspendPost, { isLoading: suspendLoading }] =
    useUserSuspendMutation();
  console.log(data);
  const [users, setUsers] = useState<UIUser[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UIUser | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  const filteredUsers = users?.filter((user: UIUser) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (!data?.data) return;
    setUsers(data.data.map(mapApiUserToUIUser));
  }, [data]);

  const getStatusColor = (status: UIUser["status"]): string => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "blocked":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSubscriptionColor = (
    subscription: UIUser["subscription"],
  ): string => {
    switch (subscription) {
      case "PAID":
        return "bg-gray-800 text-white";
      case "FREE":
        return "bg-gray-50 text-gray-700 border";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await accountSuspendPost(userId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (user: UIUser): void => {
    setSelectedUser(user);
    setShowDetailsModal(true);
    setActiveActionMenu(null);
  };

  const filterOptions: FilterStatus[] = ["All", "Active", "blocked"];

  const handleDelete = async () => {
    console.log(selectedItem);
    try {
      const response = await deleteUserPost(selectedItem).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all users across your platform
          </p>
        </div>

        {/* User Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              All Users ({filteredUsers.length})
            </h2>

            {/* Search and Filter Bar */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-center transition-colors hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {filterStatus}
                  </span>
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="py-2">
                      {filterOptions.map((status: FilterStatus) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full px-4 py-2 text-left transition-colors hover:bg-gray-50 ${
                            filterStatus === status
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Subscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredUsers.map((user: UIUser) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-sm font-semibold text-indigo-700">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-md px-3 py-2 text-xs font-medium ${getSubscriptionColor(user.subscription)}`}
                      >
                        {user.subscription}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {user.createdDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {user.lastActive}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-md px-3 py-2 text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveActionMenu(
                              activeActionMenu === user.id ? null : user.id,
                            )
                          }
                          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                        >
                          <MoreVertical className="h-5 w-5 text-gray-600" />
                        </button>

                        {activeActionMenu === user.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                            <div className="py-2">
                              <Link
                                href={`/super-admin/user-management/details?id=${user.id}`}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-gray-50"
                              >
                                <User className="h-4 w-4" />
                                <span>View Details</span>
                              </Link>
                              <button
                                onClick={() => handleSuspendUser(user.id)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-yellow-500 transition-colors hover:bg-gray-50"
                              >
                                {suspendLoading ? (
                                  <>
                                    <LoaderCircle className="animate-spin" />
                                  </>
                                ) : (
                                  <>
                                    <Shield className="h-4 w-4" />
                                  </>
                                )}

                                <span>Suspend User</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem(user.id);
                                  setIsDeleteOpen(true);
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 transition-colors hover:bg-gray-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete account</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  User Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                    <span className="text-3xl font-bold text-indigo-700">
                      {selectedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Subscription
                      </span>
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getSubscriptionColor(selectedUser.subscription)}`}
                    >
                      {selectedUser.subscription}
                    </span>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Status
                      </span>
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedUser.status)}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Created Date
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {selectedUser.createdDate}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Last Active
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {selectedUser.lastActive}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                    Edit User
                  </button>
                  <button
                    onClick={() => {
                      handleSuspendUser(selectedUser.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                  >
                    Suspend User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Raw Materials"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        isLoading={DeleteLoading}
      />
    </div>
  );
};

export default UserManagement;
