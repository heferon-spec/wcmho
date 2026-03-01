import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";
import nigelJeche from "@/assets/nigel-jeche.png";
import tebohoNthoana from "@/assets/teboho-nthoana.jpg";
import kojoHudson from "@/assets/kojo-hudson.jpg";
import lungeloNtobongwana from "@/assets/lungelo-ntobongwana.jpg";
import thulisileButhelezi from "@/assets/thulisile-buthelezi.jpg";
import thabangMokaka from "@/assets/thabang-mokaka.jpg";
import celiweRahlagane from "@/assets/celiwe-rahlagane.jpg";
import florenceMaleka from "@/assets/florence-maleka.jpg";
import vukaKhumalo from "@/assets/vuka-khumalo.png";
import boitumeloSedupane from "@/assets/boitumelo-sedupane.jpg";
import qhakazileMathebula from "@/assets/qhakazile-mathebula.jpg";
import luvuyoMncanca from "@/assets/luvuyo-mncanca.jpg";
import beaulahRose from "@/assets/beaulah-rose.jpg";
import patriciaMoloiwa from "@/assets/patricia-moloiwa.png";
import letlotloMoleko from "@/assets/letlotlo-moleko.jpg";
import kumariSukhdeo from "@/assets/kumari-sukhdeo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const boardMembers = [
  { name: "Nigel Jeche", role: "CEO (Founder)", image: nigelJeche },
  { name: "Teboho Nthoana", role: "Chairperson", image: tebohoNthoana },
  { name: "Kojo Hudson", role: "Vice Chairperson", image: kojoHudson },
  { name: "Lungelo Ntobongwana", role: "Board Member", image: lungeloNtobongwana },
  { name: "Thulisile P. Buthelezi", role: "Secretary", image: thulisileButhelezi },
  { name: "Thabang K. Mokaka", role: "Administrator", image: thabangMokaka },
];

const legalTeam = [
  { name: "Adv. Celiwe Nkosi-Rahlagane", role: "Governance and Legal Practitioner", image: celiweRahlagane },
  { name: "Adv. Florence Maleka", role: "Compliance Manager", image: florenceMaleka },
  { name: "Vuka Khumalo", role: "Internal Auditor", image: vukaKhumalo },
];

const headsOfDepartments = [
  { name: "Boitumelo Sedupane", role: "HR Executive", image: boitumeloSedupane },
  { name: "Qhakazile Mathebula", role: "HR Assistant", image: qhakazileMathebula },
  { name: "Luvuyo Mncanca", role: "Humanitarian Executive", image: luvuyoMncanca },
  { name: "Beaulah Rose", role: "Mental Health Executive", image: beaulahRose },
  { name: "Dr Talifhani Khubana", role: "CFO", image: prof1 },
  { name: "Patricia Moloiwa", role: "Chief Marketing Officer (CMO)", image: patriciaMoloiwa },
  { name: "Letlotlo K. Moleko", role: "Digital Marketing Officer", image: letlotloMoleko },
  { name: "Sibusiso Ndlovu", role: "Marketing Director", image: prof2 },
];

const consultants = [
  { name: "Prof. Kumari Sukhdeo", role: "Exec Business Consultant", image: kumariSukhdeo },
  { name: "Selu Msweli", role: "Stakeholder Manager", image: prof1 },
  { name: "Nicola M. Vlantis", role: "Stakeholder Manager", image: prof2 },
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
            <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
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
          <img src={teamPhoto} alt="World Changers Team" className="w-full object-cover" />
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
