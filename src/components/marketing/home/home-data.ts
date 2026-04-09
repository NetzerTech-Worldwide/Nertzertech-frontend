import { BarChart3, Bell, Sparkles } from "lucide-react";
import type { MomentumCard, PortalCard, PrincipleCard, WorkflowStep } from "./home-types";

export const logoImage = "/_assets/blue%20company%20logo.png";

export const homeHero1 = "/_assets/homehero1.png";
export const homeHero2 = "/_assets/homehero2.png";
export const homeHero3 = "/_assets/homehero3.png";

export const studentPortalImage = "/_assets/studentportal.png";
export const teacherPortalImage = "/_assets/teacherportal.png";
export const parentPortalImage = "/_assets/parentportal.png";

export const featureSectionImage = "/_assets/featuresection.jpg";
export const builtForSchoolsImage = "/_assets/builtforschools.jpg";
export const aboutUsSectionImage = "/_assets/aboutus%20section.jpg";

export const startStrongImage = "/_assets/start%20strong.png";
export const stayOnTrackImage = "/_assets/stay%20on%20track.png";
export const planAheadImage = "/_assets/plan%20ahead.png";
export const startStrongSectionBg = "/_assets/start%20strong%20section.png";

export const lastSectionBeforeFooterImage = "/_assets/last%20section%20before%20footer.jpg";

export const portalCards: PortalCard[] = [
  {
    title: "Students Portal",
    description: "Access assignments, courses and grades in one simple dashboard.",
    bullets: ["Course materials and assignments", "Academic records and timetable", "Campus life and activities"],
    image: studentPortalImage,
  },
  {
    title: "Teacher Portal",
    description: "Manage courses, student performance and classroom operations quickly.",
    bullets: ["Course management and grading", "Student performance tracking", "Administrative tools"],
    image: teacherPortalImage,
  },
  {
    title: "Parent Portal",
    description: "Monitor your child's progress and stay connected to school updates.",
    bullets: ["Academic progress monitoring", "Fee payments and communication", "School updates and events"],
    image: parentPortalImage,
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Explore Features",
    description: "Create your school account and instantly access student, teacher, parent and admin dashboards.",
    icon: Sparkles,
    iconColorClass: "text-[#2b84bc]",
    iconBgClass: "bg-[#e8f3fb]",
  },
  {
    title: "Navigate Your Dashboard",
    description: "Switch between classes, reports, finance and communication tools with clear visibility.",
    icon: Bell,
    iconColorClass: "text-[#eb6a2b]",
    iconBgClass: "bg-[#fff0e8]",
  },
  {
    title: "Optimize Your Workflow",
    description: "Automate daily operations and keep every school process aligned and productive.",
    icon: BarChart3,
    iconColorClass: "text-[#8f48d7]",
    iconBgClass: "bg-[#f4ebff]",
  },
];

export const principleCards: PrincipleCard[] = [
  {
    title: "Designed around real academic workflows",
    body: "Schools do not work in isolation. Learning, administration, finance, and student life are connected so the platform is structured the same way.",
    headerClass: "bg-[#7d32e8]",
  },
  {
    title: "Scales across education levels",
    body: "Primary schools need simplicity, secondary schools need structure, and universities need flexibility and depth.",
    headerClass: "bg-[#2f9c2d]",
  },
  {
    title: "Grounded in real school environments",
    body: "From large student populations to limited infrastructure, the platform is built to work in real conditions, not ideal ones.",
    headerClass: "bg-[#ea6c1b]",
  },
  {
    title: "Built with long-term institutions in mind",
    body: "Instead of adding more dashboards and tools, the platform centralizes what already exists. NetzerTech is designed to support growth, policy changes, and evolving academic needs over time.",
    headerClass: "bg-[#cc4bb8]",
  },
];

export const momentumCards: MomentumCard[] = [
  {
    title: "Start Strong",
    body: "Give students the right foundation from day one with clear schedules, learning resources and attendance visibility.",
    image: startStrongImage,
  },
  {
    title: "Stay on Track",
    body: "Keep everyone aligned with real-time progress, assignments, reminders and records that reduce confusion.",
    image: stayOnTrackImage,
  },
  {
    title: "Plan Ahead",
    body: "Support long-term growth with result tracking, fee visibility, learning pathways and future planning tools.",
    image: planAheadImage,
  },
];
