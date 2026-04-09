import Image from "next/image";
import Link from "next/link";

type AboutHighlightSectionProps = {
  aboutUsSectionImage: string;
};

export default function AboutHighlightSection({ aboutUsSectionImage }: AboutHighlightSectionProps) {
  return (
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
            <Image src={aboutUsSectionImage} alt="Team meeting in conference room" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
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
  );
}
