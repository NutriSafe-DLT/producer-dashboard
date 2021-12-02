import React from "react";
import MainLayout from "../src/components/layout/index";
import Dashboard from "../src/components/dashboard/index";
import SignIn from "./login";

export default function Index() {
  return (
    <MainLayout>
      <SignIn />
    </MainLayout>
  );
}
