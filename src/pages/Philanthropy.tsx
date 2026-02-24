import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const projects = [
  { title: "Healing Hearts Initiative", location: "Nairobi, Kenya", goal: "$50,000", raised: "$38,500", progress: 77, desc: "Providing free counseling to 5,000 youth in underserved communities." },
  { title: "Mindful Schools Program", location: "São Paulo, Brazil", goal: "$35,000", raised: "$28,000", progress: 80, desc: "Training 200 teachers in mental health first aid across public schools." },
  { title: "Veterans' Peace Project", location: "Chicago, USA", goal: "$60,000", raised: "$42,000", progress: 70, desc: "PTSD and trauma recovery support for military veterans and families." },
  { title: "Rural Wellness Caravans", location: "Rajasthan, India", goal: "$25,000", raised: "$19,200", progress: 77, desc: "Mobile mental health clinics reaching remote villages with zero access to care." },
];

const schedule = [
  { time: "09:00 AM", event: "Community Mental Health Walk", date: "Every Saturday", location: "Central Park, NY" },
  { time: "11:00 AM", event: "Free Counseling Drop-in", date: "Weekdays", location: "WCMHC Main Center" },
  { time: "02:00 PM", event: "Youth Empowerment Workshop", date: "1st & 3rd Wednesday", location: "Community Hall B" },
  { time: "04:00 PM", event: "Family Support Group", date: "Every Tuesday", location: "WCMHC East Wing" },
  { time: "06:00 PM", event: "Volunteer Training Session", date: "Last Friday Monthly", location: "Virtual / Online" },
  { time: "10:00 AM", event: "Fundraising Gala Prep", date: "Quarterly", location: "Grand Ballroom, Hilton" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Philanthropy = () => (
  <div>
    <PageHero title="Philanthropy" subtitle="Our charitable projects and community outreach programs" bgImage={philanthropyBg} />

    {/* Ongoing Projects */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Ongoing Projects" title="Making an Impact Worldwide" description="Our charitable initiatives span continents, bringing mental health resources where they're needed most." />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-xl font-semibold text-foreground">{p.title}</h3>
                <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <MapPin className="w-3 h-3" /> {p.location}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                <div className="bg-hero-gradient h-2.5 rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Raised: <span className="text-primary font-semibold">{p.raised}</span></span>
                <span>Goal: {p.goal}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Support a Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Community Schedule */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="Information Schedule" title="Community Outreach Calendar" description="Join our regularly scheduled events and activities. Everyone is welcome." />
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_1fr_1fr] md:grid-cols-[120px_1fr_1fr_1fr] bg-hero-gradient text-primary-foreground text-sm font-semibold">
              <div className="p-4">Time</div>
              <div className="p-4">Event</div>
              <div className="p-4 hidden md:block">Schedule</div>
              <div className="p-4 hidden md:block">Location</div>
            </div>
            {schedule.map((s, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr_1fr_1fr] border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <div className="p-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <Clock className="w-3.5 h-3.5" /> {s.time}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">{s.event}</p>
                  <div className="md:hidden mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {s.date}</span>
                    <span className="flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {s.location}</span>
                  </div>
                </div>
                <div className="p-4 hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5" /> {s.date}
                </div>
                <div className="p-4 hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> {s.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Philanthropy;
