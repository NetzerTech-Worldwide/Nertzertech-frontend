import Link from "next/link";

type FooterQuickLinksProps = {
  titleClassName: string;
  listClassName: string;
};

export default function FooterQuickLinks({ titleClassName, listClassName }: FooterQuickLinksProps) {
  return (
    <div>
      <h3 className={titleClassName}>Quick Links</h3>
      <div className={listClassName}>
        <Link href="/aboutus" className="transition hover:text-white">
          About Us
        </Link>
        <Link href="/features" className="transition hover:text-white">
          Features
        </Link>
        <Link href="/#roles" className="transition hover:text-white">
          Get Started
        </Link>
      </div>
    </div>
  );
}
