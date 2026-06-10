import {
  EventCard,
  SectionPills,
  StudentLifeHeader,
  clubEvents,
} from "../student-life/_components/student-life-ui";

export default function EventPage() {
  return (
    <div className="space-y-7">
      <StudentLifeHeader subtitle="Find school events and club activities you can attend" />

      <SectionPills active="events" />

      <section>
        <h2 className="text-lg font-semibold text-slate-950">Upcoming Events</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {clubEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
