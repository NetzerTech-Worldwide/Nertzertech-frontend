import Image from "next/image";

type MarketingPageHeroProps = {
  image: string;
  title: string;
  breadcrumbLabel: string;
  sectionClassName: string;
  titleClassName: string;
  breadcrumbClassName: string;
  overlayClassName: string;
};

export default function MarketingPageHero({
  image,
  title,
  breadcrumbLabel,
  sectionClassName,
  titleClassName,
  breadcrumbClassName,
  overlayClassName,
}: MarketingPageHeroProps) {
  return (
    <section className={sectionClassName}>
      <Image src={image} alt="Team collaboration" fill priority className="object-cover" sizes="100vw" />
      <div className={overlayClassName} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className={titleClassName}>{title}</h1>
        <p className={breadcrumbClassName}>
          Home <span className="mx-2 text-white/70">&gt;</span> {breadcrumbLabel}
        </p>
      </div>
    </section>
  );
}
