import Image from "next/image";
import type { MomentumCard } from "./home-types";

type MomentumSectionProps = {
  startStrongSectionBg: string;
  momentumCards: MomentumCard[];
};

export default function MomentumSection({ startStrongSectionBg, momentumCards }: MomentumSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <Image src={startStrongSectionBg} alt="Students in school compound" fill className="object-cover" sizes="100vw" />
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
  );
}
