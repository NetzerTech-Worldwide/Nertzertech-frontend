import type { ReactNode } from "react";
import StudentSidebar, { StudentSidebarToggle } from "./student-sidebar";
import StudentTopbar from "./student-topbar";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F5F7FB] md:pl-56 lg:pl-64">
      <StudentSidebar />
      <StudentSidebarToggle />

      <div className="min-h-screen flex flex-col">
        <StudentTopbar />

        <main className="flex-1 space-y-6 px-4 pb-12 pt-16 sm:px-5 md:px-6 md:pt-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}