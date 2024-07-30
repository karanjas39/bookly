import DashboardNavBar from "@/components/dashboardNavBar";
import DashboardNavTop from "@/components/ui/Dashboard/DashboardNavTop";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
      <DashboardNavBar />
      <div className="flex flex-col w-full">
        <DashboardNavTop />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
