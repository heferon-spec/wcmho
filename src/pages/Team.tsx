import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const boardMembers = [
  { name: "TBA", role: "CEO (Founder)", image: prof1 },
  { name: "TBA", role: "Chairperson", image: prof2 },
  { name: "TBA", role: "Vice Chairperson", image: prof3 },
  { name: "TBA", role: "Board Member", image: prof1 },
  { name: "TBA", role: "Secretary", image: prof2 },
  { name: "TBA", role: "Administrator", image: prof3 },
];

const legalTeam = [
  { name: "TBA", role: "Legal Team 1", image: prof1 },
  { name: "TBA", role: "Legal Team 2", image: prof2 },
  { name: "TBA", role: "Internal Auditor", image: prof3 },
];

const headsOfDepartments = [
  { name: "TBA", role: "HR Executive", image: prof1 },
  { name: "TBA", role: "HR Assistant", image: prof2 },
  { name: "TBA", role: "Humanitarian Executive", image: prof3 },
  { name: "TBA", role: "Mental Health Executive", image: prof1 },
  { name: "TBA", role: "CFO", image: prof2 },
  { name: "TBA", role: "CMO", image: prof3 },
  { name: "TBA", role: "Digital Marketing Officer", image: prof1 },
  { name: "TBA", role: "Marketing Director", image: prof2 },
];

const consultants = [
  { name: "TBA", role: "Business Consultant", image: prof1 },
  { name: "TBA", role: "Stakeholder Manager", image: prof2 },
  { name: "TBA", role: "Stakeholder Manager", image: prof3 },
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const TeamSection = ({ title: sectionTitle, members }: { title: string; members: TeamMember[] }) => (
  <div className="mb-16">
    <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">{sectionTitle}</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((m, i) => (
        <motion.div key={m.role + i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-card rounded-2xl overflow-hidden shadow-card group text-center">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-5">
            <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
            <p className="text-sm text-primary mt-1">{m.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Team = () => (
  <div>
    <PageHero title="Our Team" subtitle="The dedicated people behind our mission" bgImage={aboutBg} />

    {/* Full Landscape Team Photo */}
    <section className="px-4 -mt-10 relative z-10">
      <div className="container mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <img src={teamPhoto} alt="World Changers Team" className="w-full h-64 md:h-96 object-cover" />
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Leadership" title="Meet Our Team" description="Passionate professionals committed to making a difference." />
        <TeamSection title="Board Members" members={boardMembers} />
        <TeamSection title="Legal, Risks & Compliance" members={legalTeam} />
        <TeamSection title="Heads of Departments" members={headsOfDepartments} />
        <TeamSection title="Business Consultant & Stakeholder Management" members={consultants} />
      </div>
    </section>
  </div>
);

export default Team;
