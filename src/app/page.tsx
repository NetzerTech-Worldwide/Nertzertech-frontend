import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Compass, Medal } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type FeatureBullet = {
  text: string;
  color?: string;
};

type FeatureSection = {
  tag: string;
  title: string;
  description: string;
  bullets?: FeatureBullet[];
  imageFirst?: boolean;
};

type PopupCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconClassName: string;
  className: string;
};

const logoImage = "/_assets/blue%20company%20logo.png";
const desktopImage = "/_assets/ZenBook%20Duo%2014.png";
const topHeroImage = "/_assets/landing-page-hero.jpg";
const lowerHeroImage = "/_assets/landing-page-hero2.jpg";

const featureSections: FeatureSection[] = [
  {
    tag: "Learning",
    title: "Digital lessons that structure learning",
    description:
      "Transform how your organization delivers knowledge. Our digital platforms create structured, accessible learning experiences that keep learners engaged on their schedule. Organize courses, materials, and interactive tools into clear pathways for corporate training, universities, and beyond. Track progress, maintain accountability, and watch your learners master new skills faster than ever.",
  },
  {
    tag: "Classroom",
    title: "Live teaching, recorded lessons, always available",
    description:
      "Conduct classes live or recorded. Submit assignments, grade work, track who shows up and who participates. Learning happens in the classroom and continues beyond it.",
    bullets: [
      { text: "Live and recorded class sessions", color: "bg-[#ef4444]" },
      { text: "Assignment submission and grading tools", color: "bg-[#d946ef]" },
      { text: "Student engagement and participation tracking", color: "bg-[#4caf50]" },
    ],
  },
  {
    tag: "Records",
    title: "Student data secure and accessible",
    description:
      "Keep academic histories safe and organized. Every student profile is centralized, role-based access keeps information where it belongs, and NDPR compliance is built in from the start.",
    bullets: [
      { text: "Centralized student profiles and histories" },
      { text: "Role-based access for staff and administrators" },
      { text: "NDPR-aware data handling and compliance" },
    ],
    imageFirst: true,
  },
  {
    tag: "Operations",
    title: "Attendance, timetables, staffing, and scheduling",
    description:
      "Manage who is here, when classes run, and who teaches what. Institutional reporting gives you visibility to make decisions fast and keep the school running smooth.",
    bullets: [
      { text: "Attendance and timetable management systems" },
      { text: "Staff roles and academic calendar scheduling" },
      { text: "Institutional reporting and operational insights" },
    ],
    imageFirst: true,
  },
  {
    tag: "Finances",
    title: "School fees tracked, payments clear",
    description:
      "Set up fees once, track payments as they come in. See outstanding balances at a glance and generate reports that show exactly where money stands.",
    bullets: [
      { text: "Attendance and timetable management systems" },
      { text: "Staff roles and academic calendar scheduling" },
      { text: "Institutional reporting and operational insights" },
    ],
  },
  {
    tag: "Operations",
    title: "Built for every role in your school",
    description:
      "Students see what they need to do. Teachers manage their classes without friction. Parents get real time visibility into their child's academics. Administrators get the visibility to run operations. Everyone adopts it because it works the way they work.",
  },
];

function PopupCard({ title, subtitle, icon, iconClassName, className }: PopupCardProps) {
  const Icon = icon;

  return (
    <div
      className={`absolute z-20 flex items-center gap-2 rounded-xl bg-white px-2 py-1.5 shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)] sm:gap-2.5 sm:px-2.5 sm:py-2 ${className}`}
    >
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white sm:h-9 sm:w-9 ${iconClassName}`}>
        <Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" />
      </div>
      <div>
        <p className="text-[8px] font-semibold leading-tight text-[#171717] sm:text-[9px]">{title}</p>
        <p className="text-[7px] leading-tight text-[#5f6670] sm:text-[8px]">{subtitle}</p>
      </div>
    </div>
  );
}

function FeatureCard({ section }: { section: FeatureSection }) {
  const imageOrder = section.imageFirst ? "lg:order-1" : "lg:order-2";
  const textOrder = section.imageFirst ? "lg:order-2" : "lg:order-1";

  return (
    <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={`${textOrder}`}>
        <span className="inline-flex rounded-full border border-[#b5ccdd] bg-[#f2f7fb] px-3 py-1 text-[9px] font-semibold text-[#306d96]">
          {section.tag}
        </span>
        <h2 className="mt-4 max-w-[16ch] text-[24px] font-extrabold leading-tight text-[#2a79ad] sm:text-[31px]">
          {section.title}
        </h2>
        <p className="mt-5 max-w-[56ch] text-[12px] leading-5 text-[#5f6670]">{section.description}</p>
        {section.bullets ? (
          <ul className="mt-5 space-y-2">
            {section.bullets.map((bullet) => (
              <li key={bullet.text} className="flex items-start gap-2 text-[12px] text-[#4f5660]">
                <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${bullet.color ?? "bg-[#111827]"}`} />
                <span>{bullet.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={`${imageOrder}`}>
        <div className="landing-float relative mx-auto w-full max-w-[560px] rounded-[34px] bg-gradient-to-b from-[#a9cee6] to-[#6ea9d8] p-4 shadow-[0_28px_45px_-28px_rgba(41,119,173,0.8)]">
          <Image
            src={desktopImage}
            alt="NetzerTech desktop dashboard"
            width={1200}
            height={850}
            className="h-auto w-full rounded-[24px]"
            sizes="(max-width: 1024px) 100vw, 48vw"
          />
          <PopupCard
            title="Digital lessons"
            subtitle="Teach, assign and evaluate."
            icon={BookOpen}
            iconClassName="bg-gradient-to-b from-[#37b0f8] to-[#3f63ff]"
            className="right-2 top-2 w-[165px] sm:right-3 sm:top-3 sm:w-[198px]"
          />
          <PopupCard
            title="Structured Learning"
            subtitle="Clear learning paths"
            icon={Compass}
            iconClassName="bg-gradient-to-b from-[#2d9de5] to-[#005eaa]"
            className="left-2 top-[53%] w-[165px] -translate-y-1/2 sm:left-3 sm:w-[198px]"
          />
          <PopupCard
            title="Student Progress"
            subtitle="Visible academics progress"
            icon={Medal}
            iconClassName="bg-gradient-to-b from-[#ef7cf6] to-[#9f47ff]"
            className="bottom-2 right-2 w-[165px] sm:bottom-3 sm:right-4 sm:w-[198px]"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#e8eff4] text-[#2f3a44]`}>
      <header className="sticky top-0 z-40 border-b border-[#d7e3ec] bg-[#f4f8fb]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Image
              src={logoImage}
              alt="NetzerTech"
              width={500}
              height={500}
              className="h-10 w-10 sm:h-12 sm:w-12"
              priority
            />
            <span className="text-[13px] font-semibold tracking-normal text-[#2b85bc] sm:text-[17px]">
              NetzerTech
            </span>
          </Link>

          <nav className="hidden items-center gap-10 text-[9px] font-medium text-[#445766] md:flex">
            <Link className="transition hover:text-[#277cb3]" href="#">
              Home
            </Link>
            <Link className="transition hover:text-[#277cb3]" href="/aboutus">
              About Us
            </Link>
            <Link className="transition hover:text-[#277cb3]" href="#features">
              Features
            </Link>
            <Link className="transition hover:text-[#277cb3]" href="#footer">
              Contact Us
            </Link>
          </nav>

          <Link
            href="#footer-hero"
            className="rounded-2xl bg-[#2b85bc] px-5 py-2.5 text-[9px] font-semibold text-white transition hover:bg-[#2475a6]"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="relative h-[220px] overflow-hidden sm:h-[280px] lg:h-[360px]">
        <Image
          src={topHeroImage}
          alt="Team collaboration"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2a79ad]/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-[24px] font-extrabold sm:text-[39px]">Features</h1>
          <p className="mt-3 text-[13px] sm:text-[15px]">
            Home <span className="mx-2 text-white/70">&gt;</span> About Us
          </p>
        </div>
      </section>

      <main id="features" className="mx-auto w-full max-w-[1240px] space-y-20 px-4 py-14 sm:px-6 lg:space-y-28 lg:px-8 lg:py-20">
        {featureSections.map((section, index) => (
          <div key={section.title} id={index === 0 ? "about" : undefined}>
            <FeatureCard section={section} />
          </div>
        ))}
      </main>

      <section id="footer-hero" className="relative mt-20 h-[300px] overflow-hidden sm:h-[340px] lg:h-[380px]">
        <Image src={lowerHeroImage} alt="Campus" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h2 className="max-w-[20ch] text-[24px] font-extrabold leading-tight sm:text-[39px]">
            Built for real institutions and real world demands
          </h2>
          <p className="mt-5 max-w-[46ch] text-[12px] text-white/90 sm:text-[13px]">
            NetzerTech brings learning, administration, and data together into one dependable system.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="rounded-2xl bg-white px-8 py-3 text-[11px] font-semibold text-[#2a79ad] transition hover:bg-[#eaf4fb]"
            >
              Talk to us
            </Link>
            <Link
              href="#"
              className="rounded-2xl border border-white/80 px-8 py-3 text-[11px] font-semibold text-white transition hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[#3a5c88] text-white/90">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Image src={logoImage} alt="NetzerTech" width={170} height={40} className="h-9 w-auto brightness-[1.2]" />
            <p className="mt-4 text-[12px] text-white/80">Empowering education through technology</p>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-white">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-2 text-[12px] text-white/80">
              <Link href="/aboutus" className="transition hover:text-white">
                About Us
              </Link>
              <Link href="#features" className="transition hover:text-white">
                Features
              </Link>
              <Link href="#footer-hero" className="transition hover:text-white">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1240px] px-4 pb-6 text-[10px] text-white/75 sm:px-6 lg:px-8">
          @2025 Netzertech All rights reserved.
        </div>
      </footer>
    </div>
  );
}
