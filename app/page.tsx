import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <p>initiated</p>
    <Button className="ml-1" size={"default"}>Something</Button>
    <p>Authenticated Users are Allowed to see this Page</p>
    <UserButton afterSignOutUrl="/" />
    </>
  );
}
