import React from "react";
import MainLayout from "../../src/components/layout";
import UserList from "../../src/components/user/users";

export default function UserListPage() {
  return (
    <MainLayout>
      <UserList></UserList>
    </MainLayout>
  );
}
