import Image from "next/image";
import Link from "next/link";

type FinalCtaSectionProps = {
  image: string;
};

export default function FinalCtaSection({ image }: FinalCtaSectionProps) {
  return (
    <section id="get-started" className="relative mt-8 min-h-[340px] overflow-hidden">
      <Image src={image} alt="Library background" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto flex min-h-[340px] w-full max-w-[1240px] flex-col items-center justify-center px-4 py-14 text-center text-white sm:px-6 lg:px-8">
        <h2 className="max-w-[24ch] text-[34px] font-extrabold leading-tight sm:text-[48px]">Ready for a More Connected School Experience?</h2>
        <p className="mt-4 max-w-[54ch] text-[16px] leading-7 text-white/90 sm:text-[18px] sm:leading-8">
          NetzerTech empowers admins, teachers, parents and students to work better together.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="#roles" className="rounded-2xl bg-white px-9 py-3 text-[16px] font-semibold text-[#2b85bc] transition hover:bg-[#edf6fc]">
            Get Started
          </Link>
          <Link href="#" className="rounded-2xl border border-white px-9 py-3 text-[16px] font-semibold text-white transition hover:bg-white/10">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
