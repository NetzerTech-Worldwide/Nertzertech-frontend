import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Asterisk, Send, Sparkles } from "lucide-react";

type HomeHeroSectionProps = {
  homeHero1: string;
  homeHero2: string;
  homeHero3: string;
};

export default function HomeHeroSection({ homeHero1, homeHero2, homeHero3 }: HomeHeroSectionProps) {
  return (
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
              href="#roles"
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
              <Image src={homeHero1} alt="Student with folder" fill priority className="object-cover" sizes="(max-width: 1024px) 38vw, 16vw" />
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
  );
}
