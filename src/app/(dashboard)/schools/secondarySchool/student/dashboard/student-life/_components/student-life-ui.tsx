import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  CalendarDays,
  Eye,
  Info,
  MapPin,
  Plus,
  Search,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const BASE = "/schools/secondarySchool/student/dashboard";

export const clubTabs = [
  { key: "browse", label: "Browse Clubs", href: `${BASE}/club?tab=browse` },
  { key: "my", label: "My Clubs", href: `${BASE}/club?tab=my` },
  { key: "leadership", label: "Leadership", href: `${BASE}/club?tab=leadership` },
] as const;

export type ClubTab = (typeof clubTabs)[number]["key"];

export const clubs = [
  {
    title: "Robotics Workshop",
    category: "Robotics Club",
    description: "Build and program robots, compete in regional competitions, and explore automation projects.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: true,
    credits: 12,
  },
  {
    title: "Debate Society",
    category: "Debate Club",
    description: "Develop critical thinking and public speaking skills through structured debates on current issues.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: false,
    credits: 6,
  },
  {
    title: "Environmental Club",
    category: "Environmental Club",
    description: "Promote sustainability, organize campus clean-ups, and raise awareness about conservation.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: true,
    credits: 8,
  },
  {
    title: "Drama Club",
    category: "Arts",
    description: "Participate in theatrical productions, develop acting skills, and contribute to stage design.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: false,
    credits: 5,
  },
  {
    title: "Math Olympiad",
    category: "Academic",
    description: "Solve challenging mathematical problems, prepare for competitions, and explore advanced concepts.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: false,
    credits: 7,
  },
  {
    title: "Art Society",
    category: "Art Society",
    description: "Express creativity through painting, sculpture, digital art, and school exhibition projects.",
    members: 18,
    meeting: "Meets Wednesday",
    joined: false,
    credits: 4,
  },
];

export const clubEvents = [
  {
    title: "Robotics Workshop",
    club: "Robotics Club",
    date: "Mar 20, 2026",
    location: "Engineering Lab",
  },
  {
    title: "Campus Clean-up Drive",
    club: "Environmental Club",
    date: "Mar 20, 2026",
    location: "Main Campus",
  },
  {
    title: "Spring Art Exhibition",
    club: "Art Society",
    date: "Apr 20, 2026",
    location: "School Gallery",
  },
];

export const forumDiscussions = [
  {
    title: "How to solve quadratic equation easily",
    author: "Alex",
    image: "/_assets/books.png",
  },
  {
    title: "Tips for upcoming Exam",
    author: "James",
    image: "/_assets/study-group-icon.svg",
  },
  {
    title: "Best study that worked for me",
    author: "Annie",
    image: "/_assets/landing-page-hero2.jpg",
  },
];

export function StudentLifeHeader({
  title = "Student Life",
  subtitle = "Join or create study groups with your classmates",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-4 bg-white px-4 py-4 sm:px-5 md:-mx-6 md:-mt-6 md:flex-row md:items-center md:justify-between md:px-9">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
      <label className="flex h-12 w-full items-center gap-3 rounded-md border border-slate-300 bg-white px-4 md:max-w-sm lg:max-w-md">
        <span className="sr-only">Search student life</span>
        <input
          placeholder="Search anything here"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
        />
        <Search className="h-5 w-5 shrink-0 text-[#0D6695]" />
      </label>
    </div>
  );
}

export function SectionPills({ active }: { active: "forum" | "club" | "events" }) {
  const items = [
    { key: "forum", label: "Forum", href: `${BASE}/forum` },
    { key: "club", label: "Club", href: `${BASE}/club` },
    { key: "events", label: "Events", href: `${BASE}/event` },
  ] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`inline-flex min-w-20 items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition ${
              isActive
                ? "border-[#17688E] bg-[#1F6D93] text-white"
                : "border-slate-200 bg-white text-slate-500 hover:border-sky-200 hover:text-[#17688E]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function ClubStats() {
  const stats = [
    { label: "Clubs Joined", value: "5", icon: UserRound, iconClass: "bg-[#155A78] text-white" },
    { label: "Participation Credits", value: "20", icon: Award, iconClass: "bg-[#FF8757] text-white" },
    { label: "Leadership Roles", value: "0", icon: Trophy, iconClass: "bg-[#28AD11] text-white" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, iconClass }) => (
        <div key={label} className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600">{label}</p>
              <p className="mt-1 text-3xl font-semibold text-black">{value}</p>
            </div>
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}>
              <Icon className="h-7 w-7" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ClubTabBar({ active }: { active: ClubTab }) {
  return (
    <div className="flex flex-col justify-between gap-3 border border-slate-200 bg-white sm:flex-row sm:items-center">
      <div className="flex flex-wrap">
        {clubTabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`border-b-2 px-5 py-5 text-sm transition sm:px-6 ${
              active === tab.key
                ? "border-[#1D7EB5] text-[#0E6797]"
                : "border-transparent text-slate-600 hover:text-[#0E6797]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {active === "browse" ? (
        <Link
          href={`${BASE}/club?tab=leadership`}
          className="mx-4 mb-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#2F8BBF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2477A6] sm:mb-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Club
        </Link>
      ) : null}
    </div>
  );
}

export function CreditsBanner() {
  return (
    <div className="rounded-lg border border-[#42A5DF] bg-[#EAF6FD] px-5 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Award className="h-4 w-4 text-[#1D7EB5]" />
        <span>Total Participation Credits: 20</span>
        <Info className="h-3.5 w-3.5 text-slate-500" />
      </div>
      <p className="mt-2 text-xs text-slate-600">
        Keep participating to earn more credits and unlock leadership opportunities
      </p>
    </div>
  );
}

export function EventCard({ event }: { event: (typeof clubEvents)[number] }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-950">{event.title}</h3>
      <p className="mt-1 text-sm text-black">Club: {event.club}</p>
      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#1D8BC9]" />
          {event.date}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#1D8BC9]" />
          {event.location}
        </span>
      </div>
      <button className="mt-5 w-full rounded-md bg-[#2F8BBF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2477A6]">
        Attend Event
      </button>
    </article>
  );
}

export function ClubCard({ club }: { club: (typeof clubs)[number] }) {
  return (
    <article className="flex min-h-44 flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-950">{club.title}</h3>
        {club.joined ? (
          <span className="rounded-full bg-[#D9F8D1] px-3 py-1 text-[10px] font-medium text-[#25A013]">
            Joined
          </span>
        ) : null}
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-800">{club.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-800">
        <span className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-[#1D8BC9]" />
          {club.members} members
        </span>
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#1D8BC9]" />
          {club.meeting}
        </span>
      </div>
      <Link
        href={`${BASE}/club?tab=${club.joined ? "my" : "browse"}`}
        className={`mt-auto inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-xs font-medium ${
          club.joined
            ? "border-[#2F8BBF] bg-white text-[#1B79AD] hover:bg-sky-50"
            : "border-[#2F8BBF] bg-[#2F8BBF] text-white hover:bg-[#2477A6]"
        }`}
      >
        {club.joined ? "View Club" : "Join Club"}
      </Link>
    </article>
  );
}

export function JoinedClubRow({ club }: { club: (typeof clubs)[number] }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-semibold text-slate-900">{club.category}</h3>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] text-slate-500">
            Member
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {club.members + (club.title === "Environmental Club" ? 16 : 6)} members
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            {club.credits} credits earned
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {club.title === "Environmental Club" ? "Meets Tuesday" : club.meeting}
          </span>
        </div>
      </div>
      <Link
        href={`${BASE}/club?tab=my`}
        className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-black hover:bg-slate-50"
      >
        View Club
      </Link>
    </article>
  );
}

export function EmptyLeadership() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-medium text-slate-950">Clubs I Lead</h2>
      <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-[#228DD1] bg-white px-4 py-8 text-center">
        <Trophy className="h-10 w-10 text-[#1D8BC9]" />
        <p className="mt-3 text-sm font-semibold text-slate-950">No leadership roles yet</p>
        <p className="mt-2 text-xs text-slate-500">
          Create a new club or apply for leadership positions to get started
        </p>
        <Link
          href={`${BASE}/club?tab=browse`}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#2F8BBF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2477A6]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Club
        </Link>
      </div>
    </section>
  );
}

export function ForumDiscussionCard({ discussion }: { discussion: (typeof forumDiscussions)[number] }) {
  return (
    <article className="relative h-36 overflow-hidden rounded-lg bg-slate-800 text-white shadow-sm">
      <Image
        src={discussion.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 260px, 100vw"
        className="object-cover opacity-50 blur-[1px]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/55" />
      <div className="relative flex h-full flex-col p-4">
        <h3 className="max-w-48 text-sm font-semibold leading-5">{discussion.title}</h3>
        <p className="mt-1 text-sm font-semibold">By {discussion.author}</p>
        <div className="mt-auto flex items-center justify-between gap-3 text-[11px]">
          <span className="inline-flex items-center gap-3">
            <span>342 View</span>
            <span>62 Replies</span>
          </span>
          <Link
            href={`${BASE}/forum`}
            className="rounded-md bg-white px-5 py-2 text-[11px] font-medium text-[#17688E]"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ForumAboutCard() {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-black">About This Group</h2>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-slate-500">
        A collaborative space for students studying advanced mathematics, calculus, algebra, and geometry. We discuss
        complex problems, share resources, and prepare together for exams.
      </p>
      <div className="mt-7">
        <p className="text-sm font-semibold text-black">Admin</p>
        <p className="mt-1 text-xs text-slate-500">Mr.Adewale Larry</p>
        <div className="mt-5 flex items-center">
          {["#D8B93F", "#182B3A", "#F6A10A", "#D942A2"].map((color, index) => (
            <span
              key={color}
              className="-ml-2 first:ml-0 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {index === 3 ? "99+" : ""}
            </span>
          ))}
          <span className="ml-3 text-xs text-black">76+ Members</span>
        </div>
      </div>
    </article>
  );
}

export function OverviewCard({
  title,
  description,
  href,
  cta,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-[#1D7EB5]">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#2F8BBF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2477A6]"
      >
        {cta}
      </Link>
    </article>
  );
}

export const overviewItems = [
  {
    title: "Forum",
    description: "Follow active discussions, ask questions, and share study tips with classmates.",
    href: `${BASE}/forum`,
    cta: "Open Forum",
    icon: Eye,
  },
  {
    title: "Clubs",
    description: "Browse school clubs, track your participation credits, and manage memberships.",
    href: `${BASE}/club`,
    cta: "Browse Clubs",
    icon: Users,
  },
  {
    title: "Events",
    description: "Find upcoming club activities and school events that count toward participation.",
    href: `${BASE}/event`,
    cta: "View Events",
    icon: CalendarDays,
  },
];
