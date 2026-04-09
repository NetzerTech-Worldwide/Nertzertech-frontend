import Image from "next/image";
import { Inter } from "next/font/google";
import RolePortalsSection from "@/components/marketing/home/RolePortalsSection";
import HomeFeaturesSection from "@/components/marketing/home/HomeFeaturesSection";
import WorkflowSection from "@/components/marketing/home/WorkflowSection";
import AboutHighlightSection from "@/components/marketing/home/AboutHighlightSection";
import BuiltForSchoolsSection from "@/components/marketing/home/BuiltForSchoolsSection";
import MomentumSection from "@/components/marketing/home/MomentumSection";
import FinalCtaSection from "@/components/marketing/home/FinalCtaSection";
import HomeHeroSection from "@/components/marketing/home/HomeHeroSection";
import {
  aboutUsSectionImage,
  builtForSchoolsImage,
  featureSectionImage,
  homeHero1,
  homeHero2,
  homeHero3,
  lastSectionBeforeFooterImage,
  logoImage,
  momentumCards,
  portalCards,
  principleCards,
  startStrongSectionBg,
  workflowSteps,
} from "@/components/marketing/home/home-data";
import FooterQuickLinks from "@/components/marketing/shared/FooterQuickLinks";
import MarketingHeader from "@/components/marketing/shared/MarketingHeader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const homeNavItems = [
  { href: "#home", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/features", label: "Features" },
  { href: "#contact", label: "Contact Us" },
];

export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#e9f0f5] text-[#294359]`}>
      <MarketingHeader logoImage={logoImage} navItems={homeNavItems} ctaHref="#roles" />

      <main id="home" className="pb-0">
        <HomeHeroSection homeHero1={homeHero1} homeHero2={homeHero2} homeHero3={homeHero3} />
        <RolePortalsSection cards={portalCards} />
        <HomeFeaturesSection featureSectionImage={featureSectionImage} />
        <WorkflowSection workflowSteps={workflowSteps} />
        <AboutHighlightSection aboutUsSectionImage={aboutUsSectionImage} />
        <BuiltForSchoolsSection builtForSchoolsImage={builtForSchoolsImage} principleCards={principleCards} />
        <MomentumSection startStrongSectionBg={startStrongSectionBg} momentumCards={momentumCards} />
        <FinalCtaSection image={lastSectionBeforeFooterImage} />
      </main>

      <footer id="contact" className="bg-[#3f5f8b] text-white/90">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Image src={logoImage} alt="NetzerTech logo" width={180} height={50} className="h-10 w-auto brightness-[1.28]" />
            <p className="mt-5 text-[16px] text-white/85">Empowering education through technology</p>
          </div>
          <FooterQuickLinks titleClassName="text-[20px] font-semibold text-white" listClassName="mt-4 flex flex-col gap-2 text-[16px] text-white/85" />
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-7 text-[15px] text-white/75 sm:px-6 lg:px-8">@2025 Netzertech All rights reserved.</div>
      </footer>
    </div>
  );
}
