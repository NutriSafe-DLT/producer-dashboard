import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MainLayout from "../../src/components/layout";
import userManagementService from "../../src/components/services/user-management-service";
import UserDetailsCard from "../../src/components/user/user-details";

interface UserDetails {
  username: string;
  role: string;
  linkedToWhitelists: string[];
  allowedFunctions: string[];
}

export default function ProductInboxPage() {
  const [user, setUser] = React.useState<UserDetails>();
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (Array.isArray(username)) {
      userManagementService.getUserInfo(username[0]).then((res) => {
        setUser(res.data);
      });
    } else {
      userManagementService.getUserInfo(username).then((res) => {
        setUser(res.data);
      });
    }
  });

  return (
    <MainLayout>
      {user ? (
        <UserDetailsCard userDetails={user}></UserDetailsCard>
      ) : (
        <div></div>
      )}
    </MainLayout>
  );
}
