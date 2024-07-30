import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";

const fontStyle = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Bookly: Making Textbooks Accessible for All Students",
  description:
    "Bookly is the ultimate platform for university students to buy, sell, and share used textbooks and study materials. Easily connect with peers to find affordable books, share notes, and ensure you have everything you need for your studies. Join Bookly today and make your academic journey more efficient and cost-effective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontStyle.className} dark:bg-bgColor-dark dark:text-textColor-dark`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
