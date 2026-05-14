import { useState } from "react";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TicketBookingDialog from "@/components/TicketBookingDialog";
import { useTranslation } from "react-i18next";
import aboutBg from "@/assets/about-bg.jpg";

const events = [
  { title: "Mental Health Awareness Walk", date: "2026-03-15", time: "08:00 AM", location: "Johannesburg CBD", price: "Free", category: "Awareness", spots: 200 },
  { title: "Youth Resilience Workshop", date: "2026-03-22", time: "10:00 AM", location: "Kenilworth Community Hall", price: "R50", category: "Workshop", spots: 50 },
  { title: "Annual Fundraising Gala", date: "2026-04-10", time: "06:00 PM", location: "Sandton Convention Centre", price: "R500", category: "Fundraising", spots: 300 },
  { title: "Trauma-Informed Care Training", date: "2026-04-18", time: "09:00 AM", location: "Online (Zoom)", price: "R150", category: "Training", spots: 100 },
  { title: "World Mental Health Day Celebration", date: "2026-10-10", time: "10:00 AM", location: "Constitution Hill, JHB", price: "Free", category: "Awareness", spots: 500 },
  { title: "Volunteer Appreciation Dinner", date: "2026-05-20", time: "06:30 PM", location: "Melrose Arch", price: "R200", category: "Social", spots: 80 },
  { title: "Mindfulness & Meditation Retreat", date: "2026-06-14", time: "07:00 AM", location: "Magaliesberg Mountains", price: "R1,200", category: "Retreat", spots: 30 },
  { title: "School Counselor Certification Program", date: "2026-07-05", time: "08:00 AM", location: "Wits University", price: "R2,500", category: "Training", spots: 40 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Events = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const categories = ["All", ...Array.from(new Set(events.map(e => e.category)))];
  const filtered = selectedCategory === "All" ? events : events.filter(e => e.category === selectedCategory);

  return (
    <div>

      <SEO title="Events & Workshops — World Changers MHCO" description="Upcoming mental health awareness walks, workshops, fundraising galas and trainings. Book your tickets online." path="/events" />
      <PageHero title={t("events.heroTitle")} subtitle={t("events.heroSubtitle")} bgImage={aboutBg} />

      {/* Calendar Overview */}
      <section className="relative -mt-16 z-10 px-4">
        <div className="container mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="font-heading text-3xl font-bold text-primary">{events.length}</p>
                <p className="text-sm text-muted-foreground">{t("events.upcomingEvents")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-accent">{events.filter(e => e.price === "Free").length}</p>
                <p className="text-sm text-muted-foreground">{t("events.freeEvents")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">{events.reduce((a, e) => a + e.spots, 0)}</p>
                <p className="text-sm text-muted-foreground">{t("events.totalSpots")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-accent">{categories.length - 1}</p>
                <p className="text-sm text-muted-foreground">{t("events.categories")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label={t("events.eventsLabel")} title={t("events.eventsTitle")} description={t("events.eventsDesc")} />

          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((event, i) => {
              const d = new Date(event.date);
              return (
                <motion.div key={event.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="bg-card rounded-xl shadow-soft border border-border overflow-hidden flex group hover:shadow-card transition-shadow">
                  <div className="w-24 shrink-0 bg-primary flex flex-col items-center justify-center text-primary-foreground p-4">
                    <span className="text-xs uppercase font-semibold">{months[d.getMonth()]}</span>
                    <span className="font-heading text-3xl font-bold">{d.getDate()}</span>
                    <span className="text-xs opacity-80">{d.getFullYear()}</span>
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-medium text-accent">{event.category}</span>
                        <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{event.title}</h3>
                      </div>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">{event.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                      <span className="flex items-center gap-1"><Ticket className="w-3.5 h-3.5" /> {event.spots} {t("events.spots")}</span>
                    </div>
                    <Button size="sm" className="mt-4 bg-hero-gradient text-primary-foreground hover:opacity-90"
                      onClick={() => { setSelectedEvent(event); setDialogOpen(true); }}>
                      {t("events.getTickets")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t("events.hostEventTitle")}</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">{t("events.hostEventDesc")}</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="/contact">{t("events.contactUs")} <ArrowRight className="w-4 h-4 ml-2" /></a>
          </Button>
        </div>
      </section>

      <TicketBookingDialog event={selectedEvent} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Events;