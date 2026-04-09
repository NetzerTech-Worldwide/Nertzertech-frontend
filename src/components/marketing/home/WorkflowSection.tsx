import Link from "next/link";
import type { WorkflowStep } from "./home-types";

type WorkflowSectionProps = {
  workflowSteps: WorkflowStep[];
};

export default function WorkflowSection({ workflowSteps }: WorkflowSectionProps) {
  return (
    <section className="bg-[#deedf7]">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.08fr] lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-[#b7d2e5] bg-[#f0f8fd] px-4 py-1 text-[12px] font-semibold text-[#2b85bc]">
            How It Works
          </span>
          <h2 className="mt-5 text-[34px] font-extrabold leading-tight text-[#2b7fb4] sm:text-[44px]">Manage Your School in 3 Simple Steps</h2>
          <h3 className="mt-12 max-w-[18ch] text-[30px] font-bold leading-tight text-[#2b7fb4] sm:text-[38px]">
            Simplify every part of your school&apos;s operations in just three quick steps.
          </h3>
          <p className="mt-5 max-w-[50ch] text-[18px] leading-8 text-[#5f7486]">
            Transform your school with smart automation and complete visibility across classes, records and operations.
          </p>
          <Link
            href="#roles"
            className="mt-8 inline-flex rounded-2xl bg-[#2b85bc] px-8 py-3 text-[16px] font-semibold text-white transition hover:bg-[#216b96]"
          >
            Get Started
          </Link>
        </div>

        <div className="rounded-[22px] bg-[#2f8cc2] p-7 shadow-[0_20px_40px_-26px_rgba(12,70,113,0.9)]">
          <h3 className="text-[34px] font-bold text-white">Overview</h3>
          <div className="mt-5 space-y-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="flex gap-4 rounded-2xl bg-white p-5">
                  <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.iconBgClass}`}>
                    <Icon className={`h-5 w-5 ${step.iconColorClass}`} />
                  </span>
                  <div>
                    <h4 className="text-[26px] font-bold text-[#1f2b36] sm:text-[28px]">{step.title}</h4>
                    <p className="mt-1 text-[16px] leading-7 text-[#5f7486]">{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
