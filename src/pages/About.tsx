import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, ArrowRight, Phone, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every person deserves kindness, empathy, and understanding in their journey toward mental wellness." },
  { icon: Target, title: "Excellence", desc: "We uphold the highest clinical standards and continually evolve our methods with the latest research." },
  { icon: Award, title: "Integrity", desc: "Transparency, honesty, and ethical practice guide every decision we make as an organisation." },
  { icon: Eye, title: "Inclusivity", desc: "Mental health care should be accessible to all, regardless of background, culture, or circumstance." },
];

const impactStats = [
  { value: "537+", label: "Local Branches" },
  { value: "3,224+", label: "Total Staff" },
  { value: "6,882+", label: "Volunteers" },
  { value: "100.5K", label: "Worldwide Donors" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => (
  <div>
    <PageHero title="About Us" subtitle="Our mission, vision, and the values that drive us" bgImage={aboutBg} />

    {/* Get Inspired Section */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative">
            <img src={heroBg} alt="Our team in action" className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-elevated hidden md:block">
              <p className="font-heading text-xl font-bold text-accent-foreground">90%</p>
              <p className="text-xs text-accent-foreground/80">Success Rate</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Get Inspired, Donate & Help</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
              Compassion-Driven Mental Health Advocacy
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">Start Helping Team</h4>
                  <p className="text-sm text-muted-foreground">There are many ways you can contribute to our mental health mission worldwide.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">Make Donations</h4>
                  <p className="text-sm text-muted-foreground">Your generosity funds life-changing mental health programs for those in need.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <Link to="/contact">Explore More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <a href="tel:+15551234567" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Call Any Time</span>
                  <span className="font-semibold">+1 (555) 123-4567</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-muted">
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

    {/* Impact Stats */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {impactStats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-heading text-3xl md:text-5xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm md:text-base text-primary-foreground/80 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
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
