import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Asterisk, BarChart3, Bell, GraduationCap, Send, ShieldCheck, Sparkles } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const logoImage = "/_assets/blue%20company%20logo.png";

const homeHero1 = "/_assets/homehero1.png";
const homeHero2 = "/_assets/homehero2.png";
const homeHero3 = "/_assets/homehero3.png";

const studentPortalImage = "/_assets/studentportal.png";
const teacherPortalImage = "/_assets/teacherportal.png";
const parentPortalImage = "/_assets/parentportal.png";

const featureSectionImage = "/_assets/featuresection.jpg";
const builtForSchoolsImage = "/_assets/builtforschools.jpg";
const aboutUsSectionImage = "/_assets/aboutus%20section.jpg";

const startStrongImage = "/_assets/start%20strong.png";
const stayOnTrackImage = "/_assets/stay%20on%20track.png";
const planAheadImage = "/_assets/plan%20ahead.png";
const startStrongSectionBg = "/_assets/start%20strong%20section.png";

const lastSectionBeforeFooterImage = "/_assets/last%20section%20before%20footer.jpg";

type PortalCard = {
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColorClass: string;
  iconBgClass: string;
};

type PrincipleCard = {
  title: string;
  body: string;
  headerClass: string;
};

type MomentumCard = {
  title: string;
  body: string;
  image: string;
};

const portalCards: PortalCard[] = [
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

const workflowSteps: WorkflowStep[] = [
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

const principleCards: PrincipleCard[] = [
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

const momentumCards: MomentumCard[] = [
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

export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#e9f0f5] text-[#294359]`}>
      <header className="sticky top-0 z-50 border-b border-[#d5e3ee] bg-[#f4f8fb]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoImage} alt="NetzerTech" width={52} height={52} className="h-10 w-10" priority />
            <span className="text-[24px] font-bold text-[#2b85bc]">NetzerTech</span>
          </Link>

          <nav className="hidden items-center gap-10 text-[15px] font-medium text-[#425e73] md:flex">
            <Link href="#home" className="transition hover:text-[#2b85bc]">
              Home
            </Link>
            <Link href="/aboutus" className="transition hover:text-[#2b85bc]">
              About
            </Link>
            <Link href="/features" className="transition hover:text-[#2b85bc]">
              Features
            </Link>
            <Link href="#contact" className="transition hover:text-[#2b85bc]">
              Contact Us
            </Link>
          </nav>

          <Link
            href="#get-started"
            className="rounded-2xl bg-[#2b85bc] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#216b96]"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main id="home" className="pb-0">
        <section className="relative overflow-hidden border-b border-[#d5e3ee] bg-[#e8eff4]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(105,126,143,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(105,126,143,0.22)_1px,transparent_1px)] [background-size:78px_82px]" />
            <div className="absolute left-0 top-0 h-52 w-[42%] bg-gradient-to-br from-[#dbe7f1] via-[#dbe7f1]/70 to-transparent" />
            <div className="absolute -left-14 bottom-12 h-28 w-28 rounded-full border-[20px] border-[#e4d8cc]/95" />
            <div className="absolute -bottom-8 left-1/2 h-10 w-36 -translate-x-1/2 rounded-t-full border border-[#d1dde7]/80 bg-[#ecf3f8]" />
          </div>

          <div className="relative grid w-full items-center gap-7 px-4 py-8 sm:px-8 lg:min-h-[420px] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-8 lg:px-12 lg:py-8 xl:px-16 2xl:px-20">
            <div>
              <h1 className="max-w-[470px] text-[26px] font-extrabold leading-[1.1] tracking-[-0.012em] text-[#2b7fb4] sm:text-[35px] lg:text-[45px] xl:text-[50px]">
                Powerful Tools for Smarter School Management
              </h1>
              <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-[#5d6f7f]">
                One platform for your whole school. Automate operations, improve communication, and manage all activities
                from one smart dashboard.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="#get-started"
                  className="inline-flex items-center gap-2 rounded-[14px] bg-[#2b85bc] px-6 py-2.5 text-[15px] font-semibold text-white transition hover:bg-[#216b96]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="rounded-[14px] border border-[#c6d4df] bg-white px-6 py-2.5 text-[15px] font-semibold text-[#2a7eb4] shadow-[0_10px_18px_-14px_rgba(36,68,97,0.85)] transition hover:border-[#9cb8cc]"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            <div className="relative mx-auto h-[330px] w-full max-w-[370px] sm:h-[430px] sm:max-w-[460px] lg:h-[500px] lg:max-w-[450px]">
              <div className="absolute bottom-[2%] left-[2%] h-[94%] w-[46%] lg:bottom-0 lg:left-0 lg:h-[480px] lg:w-[206px]">
                <div className="pointer-events-none absolute -right-5 top-0 h-full w-10 rounded-br-[28px] rounded-tr-[110px] bg-gradient-to-r from-[#cbbdf6]/55 via-[#cbbdf6]/24 to-transparent blur-[1.5px] lg:-right-6 lg:w-12 lg:rounded-br-[32px] lg:rounded-tr-[130px]" />
                <div className="relative h-full w-full overflow-hidden rounded-bl-[110px] rounded-br-[28px] rounded-tl-[110px] rounded-tr-[110px] border-[6px] border-[#cbbdf6] bg-gradient-to-b from-[#ad77f8] to-[#664692] lg:rounded-bl-[130px] lg:rounded-br-[32px] lg:rounded-tl-[130px] lg:rounded-tr-[130px]">
                  <Image
                    src={homeHero2}
                    alt="Teacher assisting a student"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 58vw, 24vw"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#e8ddff]/38 via-[#e8ddff]/14 to-transparent mix-blend-screen" />
                </div>
              </div>
              <div className="absolute right-[2%] top-[1%] h-[45%] w-[41%] lg:right-[2%] lg:top-[2%] lg:h-[220px] lg:w-[178px]">
                <div className="pointer-events-none absolute -right-5 top-0 h-full w-10 rounded-r-[95px] bg-gradient-to-r from-[#d6dbc8]/55 via-[#d6dbc8]/24 to-transparent blur-[1.5px] lg:-right-6 lg:w-12 lg:rounded-r-[115px]" />
                <div className="relative h-full w-full overflow-hidden rounded-[95px] border-[6px] border-[#d6dbc8] bg-gradient-to-b from-[#899643] to-[#2c3015] lg:rounded-[115px]">
                  <Image
                    src={homeHero1}
                    alt="Student with folder"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 38vw, 16vw"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#e4e9d3]/38 via-[#e4e9d3]/14 to-transparent mix-blend-screen" />
                </div>
              </div>
              <div className="absolute bottom-[1%] right-[2%] h-[45%] w-[41%] lg:bottom-[2%] lg:right-[2%] lg:h-[220px] lg:w-[178px]">
                <div className="pointer-events-none absolute -right-5 top-0 h-full w-10 rounded-br-[95px] rounded-tr-[95px] bg-gradient-to-r from-[#e5dbc6]/55 via-[#e5dbc6]/24 to-transparent blur-[1.5px] lg:-right-6 lg:w-12 lg:rounded-br-[115px] lg:rounded-tr-[115px]" />
                <div className="relative h-full w-full overflow-hidden rounded-bl-[95px] rounded-br-[95px] rounded-tl-[26px] rounded-tr-[95px] border-[6px] border-[#e5dbc6] bg-gradient-to-b from-[#bd8d27] to-[#574112] lg:rounded-bl-[115px] lg:rounded-br-[115px] lg:rounded-tl-[30px] lg:rounded-tr-[115px]">
                  <Image
                    src={homeHero3}
                    alt="Student studying with laptop"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 38vw, 16vw"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#f2e6c6]/38 via-[#f2e6c6]/14 to-transparent mix-blend-screen" />
                </div>
              </div>
              <Sparkles className="absolute right-[47%] top-[2.2%] h-4 w-4 text-[#d8d72b]" />
              <Sparkles className="absolute right-[43%] top-[9%] h-3 w-3 text-[#d17cf0]" />
              <span className="absolute right-[6%] top-[27%] h-2 w-2 rounded-full bg-[#d94e4e]" />
              <Asterisk className="absolute right-[15%] top-[51%] h-4 w-4 text-[#c26a6c]" />
              <Asterisk className="absolute right-[10%] top-[59%] h-5 w-5 text-[#2ea3a8]" />
              <Send className="absolute left-[38%] top-[74%] h-6 w-6 -rotate-[26deg] text-[#cd4edb] drop-shadow-[0_1px_0_rgba(63,28,89,0.9)]" />
            </div>
          </div>
        </section>

        <section id="roles" className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#c1d7e8] bg-[#f0f7fc] px-4 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#2b85bc]">
              For every role
            </span>
            <h2 className="mt-4 text-[34px] font-extrabold text-[#2c7faf] sm:text-[42px]">Who NetzerTech Serves</h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[16px] leading-7 text-[#5f7486] sm:text-[18px] sm:leading-8">
              Tailored experiences designed for students, teachers, parents, and administrators.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {portalCards.map((card) => (
              <article key={card.title} className="rounded-[28px] border border-[#c7d8e6] bg-white px-7 pb-7 pt-6 shadow-[0_18px_35px_-32px_rgba(15,48,77,0.7)]">
                <div className="mx-auto h-[86px] w-[86px] overflow-hidden rounded-full">
                  <Image
                    src={card.image}
                    alt={`${card.title} icon`}
                    width={86}
                    height={86}
                    className="h-full w-full object-cover"
                    sizes="86px"
                  />
                </div>
                <h3 className="mt-5 text-center text-[28px] font-bold leading-tight text-[#1f2b36] sm:text-[32px]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#627688]">{card.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[15px] leading-6 text-[#4f6273]">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2b85bc]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#get-started"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#2b6f96] px-5 py-3 text-[18px] font-semibold text-white transition hover:bg-[#225c7d]"
                >
                  Access Portal
                </Link>
              </article>
            ))}
          </div>
        </section>

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
                href="#get-started"
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

        <section id="about" className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#c1d7e8] bg-[#f0f7fc] px-4 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#2b85bc]">
              About Us
            </span>
            <h2 className="mt-4 text-[34px] font-extrabold text-[#2c7faf] sm:text-[44px]">Why Schools Choose NetzerTech</h2>
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="relative h-[370px]">
              <div className="absolute inset-y-0 left-0 w-[88%] rounded-[56px] bg-[#bfe2f7]" />
              <div className="absolute left-8 top-8 h-[calc(100%-32px)] w-[calc(100%-32px)] overflow-hidden rounded-[56px] border border-[#82b5d6] bg-white">
                <Image
                  src={aboutUsSectionImage}
                  alt="Team meeting in conference room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </div>
            <div>
              <h3 className="max-w-[18ch] text-[34px] font-bold leading-tight text-[#2b7fb4] sm:text-[40px]">
                Empower Your Institution With Our Management Solutions
              </h3>
              <p className="mt-6 text-[18px] leading-8 text-[#5f7486]">
                The NetzerTech Learning Management System is a complete platform built for curriculum delivery, assessments,
                communication, and institution-wide oversight with modern security and scalability.
              </p>
              <Link
                href="#get-started"
                className="mt-8 inline-flex rounded-2xl border border-[#69a3c8] px-7 py-3 text-[16px] font-semibold text-[#2a7db1] transition hover:bg-[#e6f3fb]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section id="built-for-schools" className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex rounded-full border border-[#b6d2e4] bg-[#eef7fc] px-4 py-1 text-[12px] font-medium text-[#2b85bc]">
                Built for schools
              </span>
              <h2 className="mt-4 max-w-[14ch] text-[34px] font-extrabold leading-tight text-[#2c7faf] sm:text-[52px]">
                Why institutions choose this approach
              </h2>
              <div className="mt-8 overflow-hidden rounded-[20px]">
                <Image
                  src={builtForSchoolsImage}
                  alt="Built for schools"
                  width={1100}
                  height={760}
                  className="h-auto w-full rounded-[20px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:items-start">
              {principleCards.map((card) => (
                <article key={card.title} className="rounded-[22px] shadow-[0_16px_26px_-22px_rgba(20,49,74,0.75)]">
                  <div className={`rounded-[22px] px-5 pb-[3.24rem] pt-[1.92rem] text-center text-[15px] font-semibold leading-tight text-white sm:text-[14px] ${card.headerClass}`}>{card.title}</div>
                  <div className="-mt-[2.2rem] rounded-[20px] border border-[#e2e7eb] bg-[#f8f8f9] px-6 py-6">
                    <p className="text-center text-[15px] leading-8 text-[#67727d]">{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <Image
            src={startStrongSectionBg}
            alt="Students in school compound"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#e4eef4]/82" />
          <div className="relative mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {momentumCards.map((card) => (
                <article key={card.title} className="relative rounded-[22px] border border-[#cad8e4] bg-white p-8 text-center shadow-[0_20px_35px_-30px_rgba(15,48,77,0.8)]">
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border-[4px] border-[#d8e5eb] bg-[#f7f0ff] p-1">
                    <Image src={card.image} alt={card.title} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" sizes="72px" />
                  </div>
                  <h3 className="mt-9 text-[30px] font-bold text-[#2b7fb4] sm:text-[36px]">{card.title}</h3>
                  <p className="mt-4 text-[18px] leading-8 text-[#5f7486]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="get-started" className="relative mt-8 min-h-[340px] overflow-hidden">
          <Image
            src={lastSectionBeforeFooterImage}
            alt="Library background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto flex min-h-[340px] w-full max-w-[1240px] flex-col items-center justify-center px-4 py-14 text-center text-white sm:px-6 lg:px-8">
            <h2 className="max-w-[24ch] text-[34px] font-extrabold leading-tight sm:text-[48px]">
              Ready for a More Connected School Experience?
            </h2>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-7 text-white/90 sm:text-[18px] sm:leading-8">
              NetzerTech empowers admins, teachers, parents and students to work better together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#"
                className="rounded-2xl bg-white px-9 py-3 text-[16px] font-semibold text-[#2b85bc] transition hover:bg-[#edf6fc]"
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="rounded-2xl border border-white px-9 py-3 text-[16px] font-semibold text-white transition hover:bg-white/10"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#3f5f8b] text-white/90">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Image src={logoImage} alt="NetzerTech logo" width={180} height={50} className="h-10 w-auto brightness-[1.28]" />
            <p className="mt-5 text-[16px] text-white/85">Empowering education through technology</p>
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-white">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-2 text-[16px] text-white/85">
              <Link href="/aboutus" className="transition hover:text-white">
                About Us
              </Link>
              <Link href="/features" className="transition hover:text-white">
                Features
              </Link>
              <Link href="#get-started" className="transition hover:text-white">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-7 text-[15px] text-white/75 sm:px-6 lg:px-8">
          @2025 Netzertech All rights reserved.
        </div>
      </footer>
    </div>
  );
}
