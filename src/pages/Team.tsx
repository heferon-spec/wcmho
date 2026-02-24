import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const team = [
  { name: "Yoni Albert", role: "Supporter", image: prof1 },
  { name: "Christine Eve", role: "Consultant", image: prof2 },
  { name: "David Hardson", role: "Consultant", image: prof3 },
  { name: "Fred Andrew", role: "Consultant", image: prof1 },
  { name: "Jessica Brown", role: "Manager", image: prof2 },
  { name: "Dr. Sarah Mitchell", role: "Clinical Director", image: prof3 },
  { name: "Dr. James Hartwell", role: "Chief Psychiatrist", image: prof1 },
  { name: "Dr. Amara Osei", role: "Head of Counseling", image: prof2 },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name + i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-2xl overflow-hidden shadow-card group text-center">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm text-primary mt-1">{m.role}</p>
                <Button asChild variant="outline" size="sm" className="mt-3 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs">
                  <Link to="/contact">View Profile</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Team;
