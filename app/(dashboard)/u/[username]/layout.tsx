import { getSelfByUserName } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import DashboardSideBar from "./_components/Sidebar";
import { DashboardContainer } from "./_components/Container";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}
export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const self = await getSelfByUserName(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <DashboardSideBar />
        <DashboardContainer>
            {children}
        </DashboardContainer>
      </div>
    </>
  );
}
