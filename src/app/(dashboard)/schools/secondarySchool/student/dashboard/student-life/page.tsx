import {
  ClubStats,
  OverviewCard,
  SectionPills,
  StudentLifeHeader,
  overviewItems,
} from "./_components/student-life-ui";

export default function StudentLifePage() {
  return (
    <div className="space-y-7">
      <StudentLifeHeader />

      <SectionPills active="club" />
      <ClubStats />

      <section>
        <h2 className="text-lg font-semibold text-slate-950">Student Life</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {overviewItems.map((item) => (
            <OverviewCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
