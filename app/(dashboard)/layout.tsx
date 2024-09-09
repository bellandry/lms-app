"use client";

import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { HeroSection } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const isTeacherMode = pathName?.includes("/teacher");
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[70px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      {isTeacherMode && (
        <div className="hidden md:mt-[70px] md:flex h-screen w-64 flex-col fixed inset-y-0 z-45 pt-2">
          <Sidebar />
        </div>
      )}
      {pathName === "/" && (
        <div className="pt-[70px]">
          <HeroSection />
        </div>
      )}
      <main
        className={cn(
          "h-full md:container px-4 mb-14 flex-grow",
          isTeacherMode && "md:pl-64",
          pathName !== "/" && "pt-[70px]"
        )}
      >
        {children}
      </main>
      {!isTeacherMode && <Footer />}
    </div>
  );
};

export default DashboardLayout;
