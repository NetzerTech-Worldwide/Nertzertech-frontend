import Image from "next/image";
import Link from "next/link";
import { Chakra_Petch, Inter } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const logoFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const logoImage = "/_assets/blue%20company%20logo.png";
const heroImage = "/_assets/landing-page-hero.jpg";
const aboutus1 = "/_assets/aboutus1.jpg";
const aboutus2 = "/_assets/aboutus2.jpg";
const aboutus3 = "/_assets/aboutus3.jpg";
const aboutus4 = "/_assets/aboutus4.jpg";
const aboutus5 = "/_assets/aboutus5.jpg";

type VisionCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const visionCards: VisionCard[] = [
  {
    title: "Trust and Growth Approach",
    description: "Building the secure foundations where education and enterprise scale.",
    icon: ShieldCheck,
    iconBg: "bg-[#d8efce]",
    iconColor: "text-[#4b8b3f]",
  },
  {
    title: "Problem solver Approach",
    description: "Turning institutional complexity into operational clarity.",
    icon: Target,
    iconBg: "bg-[#d7ebfa]",
    iconColor: "text-[#2a78a8]",
  },
  {
    title: "Stakeholder Approach",
    description: "Connecting schools, parents and enterprises through reliable tech that works for everyone.",
    icon: UsersRound,
    iconBg: "bg-[#ffe6d7]",
    iconColor: "text-[#d2743f]",
  },
];

type WhyChooseCard = {
  title: string;
  description: string;
  highlight?: boolean;
};

const whyChooseCards: WhyChooseCard[] = [
  {
    title: "Scale with institutional growth",
    description:
      "Whether expanding intake, adding campuses, or digitising more processes, NetzerTech supports growth without system strain.",
  },
  {
    title: "Built for reliability",
    description: "Schools rely on systems that perform consistently across terms, exams and growing student population.",
  },
  {
    title: "Purpose driven execution",
    description:
      "Every feature is intentional and built through disciplined execution, continuous learning, and a focus on long term institutional value.",
    highlight: true,
  },
];

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-[#b6cddd] bg-[#f1f7fb] px-4 py-1 text-xs font-semibold text-[#245f89]">
      {label}
    </span>
  );
}

function VisionInfoCard({ card }: { card: VisionCard }) {
  const Icon = card.icon;

  return (
    <article className="rounded-[20px] bg-white px-6 py-5 shadow-[0_20px_35px_-30px_rgba(2,12,27,0.9)]">
      <div className="flex items-start gap-4">
        <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}>
          <Icon className={`h-5 w-5 ${card.iconColor}`} />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold leading-tight text-[#1a1a1a]">{card.title}</h3>
          <p className="mt-1 text-[11px] leading-5 text-[#5f6670]">{card.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function AboutUsPage() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#e8eef3] text-[#2f3a44]`}>
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
            <span className={`${logoFont.className} text-base font-semibold tracking-normal text-[#2b85bc] sm:text-[1.05rem]`}>
              NetzerTech
            </span>
          </Link>

          <nav className="hidden items-center gap-10 text-xs font-medium text-[#445766] md:flex">
            <Link className="transition hover:text-[#277cb3]" href="/">
              Home
            </Link>
            <Link className="relative text-[#277cb3]" href="/aboutus">
              About
              <span className="absolute left-1/2 top-full mt-1 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[7px] border-x-transparent border-t-[#277cb3]" />
            </Link>
            <Link className="transition hover:text-[#277cb3]" href="/#features">
              Features
            </Link>
            <Link className="transition hover:text-[#277cb3]" href="/#footer">
              Contact Us
            </Link>
          </nav>

          <Link
            href="/#footer-hero"
            className="rounded-2xl bg-[#2b85bc] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2475a6]"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="relative h-[220px] overflow-hidden sm:h-[290px] lg:h-[380px]">
        <Image src={heroImage} alt="Team collaboration" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#2a79ad]/58" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-2xl font-extrabold sm:text-4xl">About Us</h1>
          <p className="mt-3 text-base font-medium sm:text-lg">
            Home <span className="mx-2 text-white/70">&gt;</span> About Us
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1240px] space-y-14 px-4 py-11 sm:px-6 lg:space-y-16 lg:px-8 lg:py-16">
        <section id="about-us" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-[500px]">
            <SectionTag label="About Us" />
            <h2 className="mt-6 text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#2a79ad] sm:text-[43px]">
              Why we exist
            </h2>
            <p className="mt-6 text-[13px] leading-6 text-[#5d6570]">
              NetzerTech is a technology company building secure, and user centric digital solutions for education and
              enterprise management.
            </p>
            <p className="mt-5 text-[13px] leading-6 text-[#5d6570]">
              Founded to address real operational and learning challenges, NetzerTech designs platforms that improve
              academic delivery, administrative efficiency, data security and collaboration across secondary schools,
              universities, parents and institutions.
            </p>
          </div>

          <div className="relative mx-auto h-[350px] w-full max-w-[620px] sm:h-[430px] lg:h-[470px]">
            <div className="absolute inset-x-0 top-0 z-20 h-[80%] overflow-hidden rounded-[26px]">
              <Image src={aboutus1} alt="Team reviewing strategy" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
            </div>

            <div className="absolute bottom-0 left-[6%] z-30 h-[73%] w-[55%] overflow-hidden rounded-[20px] border-[5px] border-[#e8eef3] shadow-[0_20px_34px_-24px_rgba(10,19,34,0.75)]">
              <Image
                src={aboutus2}
                alt="Team hands in collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 62vw, 28vw"
              />
            </div>

            <div className="pointer-events-none absolute bottom-[8%] right-[11%] z-10 h-[48%] w-[33%] rounded-[18px] border-[5px] border-[#f5a862]" />
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#456894] via-[#274467] to-[#10253e] px-4 py-11 sm:px-7 lg:px-9 lg:py-12">
          <div className="mb-7 flex justify-center">
            <SectionTag label="Our Vision" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative mx-auto w-full max-w-[500px] min-h-[290px] overflow-hidden rounded-[24px] sm:min-h-[360px] lg:min-h-[420px]">
              <Image
                src={aboutus3}
                alt="Team discussion in conference room"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>

            <div className="text-white">
              <div className="flex items-center gap-3">
                <h2 className="text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[42px]">Our Approach</h2>
                <Sparkles className="h-10 w-10 text-white/90" />
              </div>
              <p className="mt-4 max-w-[58ch] text-[13px] leading-6 text-[#e5edf6]">
                To build reliable and be the architectural backbone of digital transformation, delivering secure,
                human centric solutions that bridge the gap between complex operations and seamless collaboration for
                institutions worldwide.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <VisionInfoCard card={visionCards[0]} />
                <VisionInfoCard card={visionCards[1]} />
                <div className="sm:col-span-2 sm:mx-auto sm:w-[66%]">
                  <VisionInfoCard card={visionCards[2]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-choose-us">
          <div className="mb-7 flex justify-center">
            <SectionTag label="Why choose us" />
          </div>

          <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-4">
              {whyChooseCards.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-[22px] border px-7 py-6 ${
                    item.highlight
                      ? "border-[#4f74a4] bg-[#3f6392] text-white"
                      : "border-[#d3e2ed] bg-[#eaf2f8] text-[#2f3a44]"
                  }`}
                >
                  <h3
                    className={`inline-flex rounded-2xl px-5 py-2.5 text-base font-semibold ${
                      item.highlight ? "bg-white text-[#2f5c8f]" : "bg-[#f8fcff] text-[#2f5c8f]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className={`mt-5 text-[13px] leading-6 ${item.highlight ? "text-[#ecf2fa]" : "text-[#5f6670]"}`}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative min-h-[390px] overflow-hidden rounded-[20px] sm:min-h-[520px]">
              <Image src={aboutus4} alt="Leadership team meeting" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
              <div className="absolute inset-0 bg-black/42" />
              <div className="absolute left-6 top-8 max-w-[18ch] sm:left-8">
                <h3 className="text-[32px] font-extrabold leading-[1.07] tracking-[-0.02em] text-white sm:text-[40px]">
                  We replace complexity with a single secure platform built for academics operation
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="mission" className="pb-2">
          <div className="mb-7 flex justify-center">
            <SectionTag label="Our Mission" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-[520px] overflow-visible">
              <div className="relative min-h-[310px] overflow-hidden rounded-[28px] sm:min-h-[380px] lg:min-h-[430px]">
                <Image
                  src={aboutus5}
                  alt="Hands joined in teamwork"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="absolute -bottom-3 right-4 flex h-[112px] w-[112px] items-center justify-center rounded-full border-[7px] border-white bg-[#c96d2c] p-2 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                BUILD * IMPACT * INNOVATION
              </div>
            </div>

            <div className="max-w-[560px]">
              <h2 className="max-w-[14ch] text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#2a79ad] sm:text-[43px]">
                Focused teams and purpose driven products.
              </h2>
              <p className="mt-5 text-[13px] leading-6 text-[#5f6670]">
                To design and deliver secure, user focused platforms through collaboration, disciplined execution, and
                continuous improvement while holding ourselves to the highest standards of integrity and accountability.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-[#3a5c88] text-white/90">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <Image src={logoImage} alt="NetzerTech" width={500} height={500} className="h-8 w-8" />
              <span className={`${logoFont.className} text-lg font-semibold text-[#58aee6]`}>NetzerTech</span>
            </div>
            <p className="mt-4 text-[13px] text-white/80">Empowering education through technology</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-2 text-[13px] text-white/80">
              <Link href="/aboutus" className="transition hover:text-white">
                About Us
              </Link>
              <Link href="/#features" className="transition hover:text-white">
                Features
              </Link>
              <Link href="/#footer-hero" className="transition hover:text-white">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1240px] px-4 pb-6 text-sm text-white/75 sm:px-6 lg:px-8">
          @2025 Netzertech All rights reserved.
        </div>
      </footer>
    </div>
  );
}
