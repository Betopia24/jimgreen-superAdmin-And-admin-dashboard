import Users from "@/components/userManagement/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "user Page",
  // other metadata
};

const UserManagementPage = () => {
  return (
    <>
      {/* <Breadcrumb pageName="User" /> */}
      <Users />
    </>
  );
};

export default UserManagementPage;
