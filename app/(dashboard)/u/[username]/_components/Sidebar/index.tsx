import React from "react";
import CreatorWrapper from "./Wrapper";
import DashToggle from "./Toggle";
import Navigation from "./Navigation";

export default function DashboardSideBar() {
  return (
    <>
      <CreatorWrapper>
        <DashToggle />
        <Navigation />
      </CreatorWrapper>
    </>
  );
}
