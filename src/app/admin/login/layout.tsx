import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/session";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  if (await isAdminSessionValid()) {
    redirect("/admin");
  }
  return <>{children}</>;
}
