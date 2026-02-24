import { motion } from "framer-motion";
import { Target, Eye, Heart, Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every person deserves kindness, empathy, and understanding in their journey toward mental wellness." },
  { icon: Target, title: "Excellence", desc: "We uphold the highest clinical standards and continually evolve our methods with the latest research." },
  { icon: Award, title: "Integrity", desc: "Transparency, honesty, and ethical practice guide every decision we make as an organisation." },
  { icon: Eye, title: "Inclusivity", desc: "Mental health care should be accessible to all, regardless of background, culture, or circumstance." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => (
  <div>
    <PageHero title="About Us" subtitle="Our mission, vision, and the values that drive us" bgImage={aboutBg} />

    {/* Mission & Vision */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-primary">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Mission</span>
            <h3 className="font-heading text-2xl font-bold text-foreground mt-3 mb-4">Healing Minds, Transforming Lives</h3>
            <p className="text-muted-foreground leading-relaxed">
              World Changers Mental Health Care Organisation is dedicated to providing comprehensive, compassionate mental health services to individuals and communities worldwide. We break down barriers to care through innovative programs, professional expertise, and community-driven philanthropy.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-accent">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Vision</span>
            <h3 className="font-heading text-2xl font-bold text-foreground mt-3 mb-4">A World Free of Mental Health Stigma</h3>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where mental health care is universally accessible, stigma-free, and integrated into every community. Through education, advocacy, and direct service, we strive to create lasting change that empowers individuals to lead fulfilling lives.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="Our Values" title="What We Stand For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 text-center shadow-soft">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
