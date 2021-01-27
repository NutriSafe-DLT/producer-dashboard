import React from "react";
import MainLayout from "../../src/components/layout";
import UserManagement from "../../src/components/user/users-management";

export default function UserListPage() {
  return (
    <MainLayout>
      <UserManagement></UserManagement>
    </MainLayout>
  );
}
