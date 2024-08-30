import DashboardNavBar from "@/components/Dashboard/dashboardNavBar";
import Footer from "@/components/Footer/footer";
import DashboardNavTop from "@/components/Dashboard/DashboardNavTop";
import ProtectedProvider from "@/components/ProtectedRoutes/ProtectedProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedProvider>
      <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <DashboardNavBar />
        <div className="flex flex-col w-full">
          <DashboardNavTop />
          <div className="h-full px-5 pt-5">{children}</div>
          <Footer />
        </div>
      </div>
    </ProtectedProvider>
  );
}
