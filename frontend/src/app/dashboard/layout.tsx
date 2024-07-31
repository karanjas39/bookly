import DashboardNavBar from "@/components/ui/Dashboard/dashboardNavBar";
import Footer from "@/components/footer";
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
        <div className="h-full px-5 pt-5">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
