import React, { useEffect, useState } from "react";
import MainLayout from "../../src/components/layout";
import userManagementService from "../../src/components/services/user-management-service";
import { CreateUser } from "../../src/components/user/create-new-user";

export default function CreateUserPage() {
  const [existingUsernames, setExistingUsernames] = useState([]);

  useEffect(() => {
    userManagementService.getAllUsers().then((res) => {
      setExistingUsernames(res.data.usernames);
    });
  }, []);

  return (
    <MainLayout>
      <CreateUser existingUsernames={existingUsernames}></CreateUser>
    </MainLayout>
  );
}
