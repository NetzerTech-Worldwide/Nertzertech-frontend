import {
  ClubCard,
  ClubStats,
  ClubTab,
  ClubTabBar,
  CreditsBanner,
  EmptyLeadership,
  EventCard,
  JoinedClubRow,
  SectionPills,
  StudentLifeHeader,
  clubEvents,
  clubTabs,
  clubs,
} from "../student-life/_components/student-life-ui";

type ClubPageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

function normalizeTab(tab?: string): ClubTab {
  return clubTabs.some((item) => item.key === tab) ? (tab as ClubTab) : "browse";
}

export default async function ClubPage({ searchParams }: ClubPageProps) {
  const params = await searchParams;
  const activeTab = normalizeTab(params?.tab);
  const joinedClubs = clubs.filter((club) => club.joined);

  return (
    <div className="space-y-6">
      <StudentLifeHeader />

      <section className="space-y-6">
        <SectionPills active="club" />
        <ClubStats />
        <ClubTabBar active={activeTab} />
      </section>

      {activeTab === "browse" ? (
        <section className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-slate-950">Upcoming Club Events</h2>
              <a href="#all-clubs" className="text-xs font-medium text-[#1D7EB5] hover:underline">
                View All Events
              </a>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {clubEvents.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>

          <div id="all-clubs">
            <h2 className="text-lg font-medium text-slate-950">All Clubs</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {clubs.map((club) => (
                <ClubCard key={club.title} club={club} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "my" ? (
        <section className="space-y-4">
          <CreditsBanner />
          {joinedClubs.map((club) => (
            <JoinedClubRow key={club.title} club={club} />
          ))}
        </section>
      ) : null}

      {activeTab === "leadership" ? <EmptyLeadership /> : null}
    </div>
  );
}
