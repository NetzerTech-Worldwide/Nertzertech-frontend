import Image from "next/image";
import type { PrincipleCard } from "./home-types";

type BuiltForSchoolsSectionProps = {
  builtForSchoolsImage: string;
  principleCards: PrincipleCard[];
};

export default function BuiltForSchoolsSection({ builtForSchoolsImage, principleCards }: BuiltForSchoolsSectionProps) {
  return (
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
              <div className={`rounded-[22px] px-5 pb-[3.24rem] pt-[1.92rem] text-center text-[15px] font-semibold leading-tight text-white sm:text-[14px] ${card.headerClass}`}>
                {card.title}
              </div>
              <div className="-mt-[2.2rem] rounded-[20px] border border-[#e2e7eb] bg-[#f8f8f9] px-6 py-6">
                <p className="text-center text-[15px] leading-8 text-[#67727d]">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
