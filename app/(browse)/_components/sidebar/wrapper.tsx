//this component is responsible for condition of sidebar
//which if it is wrapped or in full fize
"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { ToggleSkeleton } from "./user-item";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state);
  
  //this useEffect and snippet code is provided for hydration errors because the wrapper is
  //being loaded inside a SC and the SC does not have access to states that may return error
  /* const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }); */

  //also usehooks-ts can be used instead of useEffect above
  const isClient = useIsClient()

  if (!isClient) {
    return (
      <>
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
          <ToggleSkeleton />
          <RecommendedSkeleton />
        </aside>
      </>
    );
  }
  return (
    <>
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
          collapsed && "w-[70px]"
        )}
      >
        {children}
      </aside>
    </>
  );
}
