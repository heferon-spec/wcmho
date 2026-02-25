import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";

const projects = [
  { title: "Help the Mental Health System", cats: ["Mental Health", "Medical Health"] },
  { title: "Clean Mind Initiatives", cats: ["Wellness", "Community"] },
  { title: "Healthy Living for All", cats: ["Counseling", "Support"] },
  { title: "Youth Mental Wellness Program", cats: ["Education", "Mental Health"] },
  { title: "Community Counseling Centers", cats: ["Community", "Medical Health"] },
  { title: "Better Lives Through Therapy", cats: ["Wellness", "Support"] },
  { title: "Veterans Trauma Recovery", cats: ["Mental Health", "Trauma"] },
  { title: "Rural Mental Health Clinics", cats: ["Community", "Medical Health"] },
  { title: "School-Based Counseling", cats: ["Education", "Youth"] },
];

const filters = ["All", "Mental Health", "Community", "Education", "Wellness"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Portfolio = () => (
  <div>
    <PageHero title="Our Portfolio" subtitle="Successful projects and case studies from our global mission" bgImage={aboutBg} />

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Case Studies" title="Successful Projects" description="See the impact of our programs across the globe." />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button key={f} className="px-5 py-2 rounded-full text-sm font-medium border border-border hover:bg-primary hover:text-primary-foreground transition-colors">
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group">
              <div className="aspect-[4/5] bg-primary/5 flex items-center justify-center">
                <Globe className="w-16 h-16 text-primary/20" />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-2">
                  {project.cats.map(c => (
                    <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
            <Link to="/contact">Start A Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Portfolio;
