import {
  ForumAboutCard,
  ForumDiscussionCard,
  SectionPills,
  StudentLifeHeader,
  forumDiscussions,
} from "../student-life/_components/student-life-ui";

export default function ForumPage() {
  return (
    <div className="space-y-7">
      <StudentLifeHeader />

      <SectionPills active="forum" />

      <section>
        <h2 className="text-lg font-semibold text-slate-950">Trending Discussions</h2>
        <p className="mt-1 text-xs text-slate-500">Most viewed and active discussions</p>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px] xl:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-5 md:grid-cols-3">
            {forumDiscussions.map((discussion) => (
              <ForumDiscussionCard key={discussion.title} discussion={discussion} />
            ))}
          </div>
          <aside className="hidden text-xs text-slate-800 lg:block">Categories</aside>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px] xl:grid-cols-[minmax(0,1fr)_220px]">
        <ForumAboutCard />
        <div />
      </div>
    </div>
  );
}
