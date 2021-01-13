import React, { useEffect, useState } from "react";
import MainLayout from "../../src/components/layout";
import userManagementService from "../../src/components/services/user-management-service";
import { CreateUser } from "../../src/components/user/create-new-user";

export default function CreateUserPage() {
  const [otherUsernames, setOtherUsernames] = useState([]);

  useEffect(() => {
    userManagementService.getAllUsers().then((res) => {
      setOtherUsernames(res.data.usernames);
    });
  }, []);

  return (
    <MainLayout>
      <CreateUser otherUsernames={otherUsernames}></CreateUser>
    </MainLayout>
  );
}
