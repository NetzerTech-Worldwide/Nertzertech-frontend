import type { LucideIcon } from "lucide-react";

export type PortalCard = {
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColorClass: string;
  iconBgClass: string;
};

export type PrincipleCard = {
  title: string;
  body: string;
  headerClass: string;
};

export type MomentumCard = {
  title: string;
  body: string;
  image: string;
};
