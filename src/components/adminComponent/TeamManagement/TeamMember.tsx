"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  X,
  User,
  Calendar,
  Clock,
  Shield,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import DeactivateModal from "./Modal";
import { useGetsuperAdminUsermanagementQuery } from "@/redux/api/super-admin/userManagement/superAdminUserManagementlicApi";
import {
  useDeleteTeamMemberMutation,
  useGetAllTeamMembersQuery,
  useTeamMemberStatsMutation,
} from "@/redux/api/teamMember/teamMemberSliceApi";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import DeleteConfirmModal from "@/share/DeteleConfirm/DeleteConfirm";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   subscription: "Enterprise" | "Pro" | "Free";
//   createdDate: string;
//   lastActive: string;
//   status: "Active" | "Inactive" | "Suspended";
// }

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  isEmailVerified: boolean;
  role: "USER";
  status: "UNBLOCK";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  companyMember: {
    role: "owner";
    companyId: string;
    status: "active";
  };
}

export interface CompanyMember {
  role: "owner" | "member";
  status: "active" | "inactive";
  companyId: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  companyMember: CompanyMember;
}

type FilterStatus = "All" | "Active" | "Inactive";

const TeamManagement: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const userProfile = data?.data as User;
  const id = userProfile?.companyMember?.companyId;
  const [deleteMember, { isLoading: DeleteLoading }] =
    useDeleteTeamMemberMutation();
  const [statsUpdate, { isLoading: StatsLoading }] =
    useTeamMemberStatsMutation();
  const { data: memberData, isLoading } = useGetAllTeamMembersQuery(id);
  const members: TeamMember[] = memberData?.data ?? [];
  const [users, setUsers] = useState(members);

  const filteredUsers = members.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status: "active" | "inactive"): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDetails = (user: User): void => {
    setSelectedUser(user);
    setShowDetailsModal(true);
    setActiveActionMenu(null);
  };

  const handleSuspendUser = (userId: string): void => {
    setUsers(
      users.map((user: TeamMember) =>
        user.id === userId ? { ...user, status: "Suspended" as const } : user,
      ),
    );
    setActiveActionMenu(null);
  };

  const filterOptions: FilterStatus[] = ["All", "Active", "Inactive"];

  const deactivateUser = async () => {
    try {
      const response = await statsUpdate({
        companyId: id,
        memberId: selectedUser?.id,
        payload: {
          status:
            selectedUser?.companyMember?.status === "active"
              ? "inactive"
              : "active",
        },
      }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // delete fucntion
  const handleDelete = async () => {
    console.log(selectedItem, id);
    try {
      const response = await deleteMember({
        companyId: id,
        memberId: selectedItem,
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Team Management
            </h1>
            <p className="text-gray-600">
              Manage and monitor all users across your platform
            </p>
          </div>
          <div>
            <Link
              href={"/admin/team-management/add-member"}
              className="flex gap-2 rounded-md bg-primary px-8 py-3 text-lg font-medium text-white"
            >
              <Plus />
              Add Team Member
            </Link>
          </div>
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
                {/* <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {filterStatus}
                  </span>
                </button> */}

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
                    Reports
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
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    </td>
                  </tr>
                )}
                {filteredUsers.map((user: TeamMember) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-sm font-semibold text-indigo-700">
                            {user.firstName.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setSelectedUser(user);
                        }}
                        className={`rounded-md px-3 py-2 text-xs font-medium ${getStatusColor(user.companyMember.status)}`}
                      >
                        {user.companyMember.status}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedItem(user.id);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeactivateModal
        isLoading={StatsLoading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deactivateUser}
      />
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

export default TeamManagement;
