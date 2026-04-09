import Image from "next/image";
import { BarChart3, Bell, GraduationCap, ShieldCheck } from "lucide-react";

type HomeFeaturesSectionProps = {
  featureSectionImage: string;
};

export default function HomeFeaturesSection({ featureSectionImage }: HomeFeaturesSectionProps) {
  return (
    <section id="features" className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-[#c1d7e8] bg-[#f0f7fc] px-4 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#2b85bc]">
          Features
        </span>
        <h2 className="mx-auto mt-4 max-w-[22ch] text-[32px] font-extrabold leading-tight text-[#2c7faf] sm:text-[44px]">
          Take Your School to the Next Level With an Advanced Management System
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="rounded-[24px] border border-[#cad8e4] bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecf6ff] text-[#3e94cf]">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="mt-14 text-[28px] font-bold text-[#1f2b36]">Progress Tracking</h3>
          <p className="mt-3 text-[16px] leading-7 text-[#627587]">
            Monitor each learning journey with detailed analytics, mastery levels and personalized recommendations.
          </p>
        </article>
        <article className="rounded-[24px] border border-[#cad8e4] bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecf6ff] text-[#3e94cf]">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="mt-14 text-[28px] font-bold text-[#1f2b36]">Real-time Updates</h3>
          <p className="mt-3 text-[16px] leading-7 text-[#627587]">
            Get instant notifications about assignments, grades, school events and important announcements.
          </p>
        </article>
        <article className="rounded-[24px] border border-[#cad8e4] bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecf6ff] text-[#3e94cf]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="mt-14 text-[28px] font-bold text-[#1f2b36]">Interactive Learning</h3>
          <p className="mt-3 text-[16px] leading-7 text-[#627587]">
            Engage with dynamic course materials, videos and collaborative learning experiences.
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="relative min-h-[270px] overflow-hidden rounded-[24px] border border-[#cad8e4] bg-[#1e76ac]">
          <Image src={featureSectionImage} alt="Student summary dashboard" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f5f90]/95 via-[#1a709f]/70 to-transparent" />
          <div className="absolute bottom-0 p-7 text-white">
            <h3 className="text-[30px] font-bold sm:text-[36px]">Smart Result Summary</h3>
            <p className="mt-2 max-w-[66ch] text-[16px] leading-7 text-white/95 sm:text-[18px] sm:leading-8">
              Instant summaries of grades, subject strengths and learning progress all in one dashboard.
            </p>
          </div>
        </article>

        <article className="rounded-[24px] border border-[#cad8e4] bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecf6ff] text-[#3e94cf]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-14 text-[28px] font-bold text-[#1f2b36]">Secure and Reliable</h3>
          <p className="mt-3 text-[16px] leading-7 text-[#627587]">
            Your data is protected with enterprise-grade security and regular backups.
          </p>
        </article>
      </div>
    </section>
  );
}
