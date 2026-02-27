"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Lato } from "next/font/google";




  const lato = Lato ({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function StudentDashboardPage() {

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const handleMenuToggle = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setActiveItem(menu);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

const isActive = (item: string) =>
  activeItem === item
    ? "bg-sky-600 text-white"
    : "text-black hover:bg-gray-100";

const academicsItems = [
  { label: "Subjects", icon: "mdi:book-outline" },
  { label: "Classroom", icon: "mdi:google-classroom" },
  { label: "Assignment", icon: "mdi:clipboard-text-outline" },
  { label: "Examination", icon: "mdi:file-document-outline" },
  { label: "Records", icon: "mdi:folder-outline" },
  { label: "Attendance", icon: "mdi:calendar-check-outline" },
  { label: "Timetable", icon: "mdi:calendar-clock-outline" },
  { label: "Library", icon: "mdi:library-outline" },
];
const studentLifeItems = [
  { label: "Forum", icon: "mdi:forum-outline" },
  { label: "Club", icon: "mdi:account-group-outline" },
  { label: "Event", icon: "mdi:calendar-star-outline" },
];

const financeItems = [
  { label: "School Fees", icon: "mdi:cash-multiple" },
  { label: "Student ID", icon: "mdi:card-account-details-outline" },
];

const supportItems = [
  { label: "Profile", icon: "mdi:account-outline" },
  { label: "Approval", icon: "mdi:check-decagram-outline" },
];


return (
  
  <div className={`flex min-h-screen bg-gray-50 ${lato.className}`}>



      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

        {/* LOGO */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-300 rounded-md" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-gray-800">Netzertech</span>
            <span className="text-xs text-gray-500">Student Dashboard</span>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 py-4 space-y-1">

          {/* DASHBOARD */}
          <div
            onClick={() => handleItemClick("Dashboard")}
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${isActive("Dashboard")}`}
          >
            <Icon icon="mdi:view-dashboard-outline" className="w-5 h-5" />

            <span className="font-medium">Dashboard</span>
          </div>

          {/* ACADEMICS */}
          <div className="px-2">
            <div
              onClick={() => handleMenuToggle("Academics")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md ${isActive("Academics")}`}
            >
              <div className="flex items-center gap-3">
               <Icon icon="mdi:school-outline" className="w-5 h-5" />

                <span className="font-medium">Academics</span>
              </div>
              <span>⌄</span>
            </div>

            {openMenu === "Academics" && (
               <div className="ml-6 mt-1 space-y-1">
                 {academicsItems.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => handleItemClick(item.label)}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${isActive(item.label)}`}
                  >
                    <Icon icon={item.icon} className="w-4 h-4" />
                    <span className="font-medium ">{item.label}</span>
                </div>
                
              ))}
             </div>
           )}

          </div>

          {/* STUDENT LIFE */}
          <div className="px-2">
            <div
              onClick={() => handleMenuToggle("Student Life")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md ${isActive("Student Life")}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="mdi:account-group-outline" className="w-5 h-5" />

                <span className="font-medium">Student Life</span>
              </div>
              <span>⌄</span>
            </div>

            {openMenu === "Student Life" && (
  <div className="ml-6 mt-1 space-y-1">
    {studentLifeItems.map((item) => (
      <div
        key={item.label}
        onClick={() => handleItemClick(item.label)}
        className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${isActive(item.label)}`}
      >
        <Icon icon={item.icon} className="w-4 h-4" />
        <span className="font.medium">{item.label}</span>
      </div>
    ))}
  </div>
)}

          </div>

          {/* FINANCE */}
          <div className="px-2">
            <div
              onClick={() => handleMenuToggle("Finance")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md ${isActive("Finance")}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="mdi:wallet-outline" className="w-5 h-5" />

                <span className="font-medium">Finance</span>
              </div>
              <span>⌄</span>
            </div>

            {openMenu === "Finance" && (
  <div className="ml-6 mt-1 space-y-1">
    {financeItems.map((item) => (
      <div
        key={item.label}
        onClick={() => handleItemClick(item.label)}
        className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${isActive(item.label)}`}
      >
        <Icon icon={item.icon} className="w-4 h-4" />
        <span className="font-medium">{item.label}</span>
      </div>
    ))}
  </div>
)}

          </div>

          {/* SUPPORT */}
          <div className="px-2">
            <div
              onClick={() => handleMenuToggle("Support")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md ${isActive("Support")}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="mdi:help-circle-outline" className="w-5 h-5" />

                <span className="font-medium">Support</span>
              </div>
              <span>⌄</span>
            </div>

            {openMenu === "Support" && (
  <div className="ml-6 mt-1 space-y-1">
    {supportItems.map((item) => (
      <div
        key={item.label}
        onClick={() => handleItemClick(item.label)}
        className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${isActive(item.label)}`}
      >
        <Icon icon={item.icon} className="w-4 h-4" />
        <span className="font-medium">{item.label}</span>
      </div>
    ))}
  </div>
)}

          </div>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col text-xl">

        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center w-full max-w-md">
          <div className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-2">
            
            <input
              type="text"
              placeholder="Search anything here"
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <Icon icon="mdi:magnify" className="w-5 h-5 text-black" />

          </div>
        </div>

          <div className="flex items-center gap-6">
           <Icon icon="mdi:bell-outline" className="w-5 h-5 text-black cursor-pointer" />


            <Icon icon="mdi:email-outline" className="w-5 h-5 text-black cursor-pointer" />

            <div className="flex items-center gap-3">
             <Icon
  icon="mdi:account-circle-outline"
  className="w-9 h-9 text-black cursor-pointer"
/>

              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500">John Doe</span>
                <span className="text-sm font-semibold">ID: 234567</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Page content */}
        </div>
      </main>
    </div>
  );
}
