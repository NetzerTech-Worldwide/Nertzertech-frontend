import Image from "next/image";
import Link from "next/link";
import type { PortalCard } from "./home-types";

type RolePortalsSectionProps = {
  cards: PortalCard[];
};

export default function RolePortalsSection({ cards }: RolePortalsSectionProps) {
  return (
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
        {cards.map((card) => (
          <article key={card.title} className="rounded-[28px] border border-[#c7d8e6] bg-white px-7 pb-7 pt-6 shadow-[0_18px_35px_-32px_rgba(15,48,77,0.7)]">
            <div className="mx-auto h-[86px] w-[86px] overflow-hidden rounded-full">
              <Image src={card.image} alt={`${card.title} icon`} width={86} height={86} className="h-full w-full object-cover" sizes="86px" />
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
  );
}
