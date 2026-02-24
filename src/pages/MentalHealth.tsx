import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Shield, Users, Sparkles, HeartPulse, Leaf, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const programs = [
  { icon: Brain, title: "Cognitive Behavioral Therapy", desc: "Evidence-based approach to treating anxiety, depression, and other mental health conditions through structured therapeutic sessions." },
  { icon: Shield, title: "Trauma & PTSD Recovery", desc: "Specialized programs using EMDR and trauma-focused therapy to help survivors reclaim their lives." },
  { icon: Users, title: "Family & Couples Counseling", desc: "Strengthening relationships through guided communication, conflict resolution, and emotional support." },
  { icon: Sparkles, title: "Mindfulness & Stress Relief", desc: "Meditation, breathing exercises, and mindfulness practices for daily mental wellness." },
  { icon: HeartPulse, title: "Substance Abuse Support", desc: "Holistic recovery programs addressing the root causes of addiction with compassion." },
  { icon: Leaf, title: "Youth & Adolescent Care", desc: "Age-appropriate interventions for children and teens navigating emotional and behavioral challenges." },
];

const professionals = [
  { name: "Dr. Sarah Mitchell", role: "Clinical Psychologist", specialty: "Anxiety & Depression", image: prof1 },
  { name: "Dr. James Hartwell", role: "Psychiatrist", specialty: "Trauma & PTSD", image: prof2 },
  { name: "Dr. Amara Osei", role: "Licensed Counselor", specialty: "Family Therapy", image: prof3 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const MentalHealth = () => (
  <div>
    <PageHero title="Mental Health Care" subtitle="Specialized programs and professionals dedicated to your wellbeing" bgImage={heroBg} />

    {/* Programs */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Our Programs" title="Comprehensive Care Pathways" description="We provide a full spectrum of mental health services tailored to individual needs." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div key={p.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all border border-border group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-hero-gradient transition-all">
                <p.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Professionals */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="Our Professionals" title="Meet the Experts Who Care" description="Our team of licensed professionals bring decades of experience and genuine compassion." />
        <div className="grid md:grid-cols-3 gap-8">
          {professionals.map((p, i) => (
            <motion.div key={p.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-2xl overflow-hidden shadow-card group">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-heading text-xl font-semibold text-foreground">{p.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{p.role}</p>
                <p className="text-muted-foreground text-sm mt-1">{p.specialty}</p>
                <Button asChild className="mt-4 w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                  <Link to="/contact">
                    <Calendar className="w-4 h-4 mr-2" /> Schedule a Session
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default MentalHealth;
