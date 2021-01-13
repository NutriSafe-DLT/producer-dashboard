import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MainLayout from "../../src/components/layout";
import userManagementService from "../../src/components/services/user-management-service";
import { WhitelistDetails } from "../../src/components/whitelists/whitelist-details";

export default function WhitelistDetailsPage() {
  const [functions, setFunctions] = React.useState();
  const [whitelistNameState, setWhitelistNameState] = React.useState<string>();

  useEffect(() => {
    const whitelistName = Array.isArray(whitelist) ? whitelist[0] : whitelist;
    setWhitelistNameState(whitelistName);
    userManagementService.getWhitelists().then((res) => {
      setFunctions(res.data[whitelistName]);
    });
  });

  const router = useRouter();
  const { whitelist } = router.query;
  return (
    <MainLayout>
      {functions ? (
        <WhitelistDetails
          functions={functions}
          whitelistName={whitelistNameState}
        ></WhitelistDetails>
      ) : (
        <div></div>
      )}
    </MainLayout>
  );
}
