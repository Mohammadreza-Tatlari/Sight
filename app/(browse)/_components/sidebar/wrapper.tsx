//this component is responsible for condition of sidebar
//which if it is wrapped or in full fize
"use client"

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    const {collapsed} = useSidebar((state) => state)
  return (
    <>
      <aside className={
        cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]")}>
        {children}
        </aside>
    </>
  );
}
