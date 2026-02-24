import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const team = [
  { name: "Dr. Sarah Mitchell", role: "Founder & Clinical Director", image: prof1 },
  { name: "Dr. James Hartwell", role: "Chief Psychiatrist", image: prof2 },
  { name: "Dr. Amara Osei", role: "Head of Counseling", image: prof3 },
  { name: "Marcus Chen", role: "Program Director", image: prof2 },
  { name: "Fatima Al-Rashid", role: "Philanthropy Lead", image: prof3 },
  { name: "David Okoro", role: "Community Outreach Manager", image: prof1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Team = () => (
  <div>
    <PageHero title="Our Team" subtitle="The dedicated people behind our mission" bgImage={aboutBg} />
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Leadership" title="Meet Our Team" description="Passionate professionals committed to making a difference." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((m, i) => (
            <motion.div key={m.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-2xl overflow-hidden shadow-card group">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm text-primary mt-1">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Team;
