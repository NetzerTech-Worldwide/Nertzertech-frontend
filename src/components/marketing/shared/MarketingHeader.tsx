import Image from "next/image";
import Link from "next/link";

type MarketingNavItem = {
  href: string;
  label: string;
};

type MarketingHeaderProps = {
  logoImage: string;
  navItems: MarketingNavItem[];
  ctaHref: string;
  ctaLabel?: string;
};

export default function MarketingHeader({
  logoImage,
  navItems,
  ctaHref,
  ctaLabel = "Get Started",
}: MarketingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d5e3ee] bg-[#f4f8fb]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImage} alt="NetzerTech" width={77} height={77} className="h-[58px] w-[58px]" priority />
          <span className="text-[22px] font-bold text-[#2b85bc]">NetzerTech</span>
        </Link>

        <nav className="hidden items-center gap-10 text-[15px] font-medium text-[#425e73] md:flex">
          {navItems.map((item) => (
            <Link key={item.href + item.label} className="transition hover:text-[#2b85bc]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={ctaHref}
          className="rounded-2xl bg-[#2b85bc] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#216b96]"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
