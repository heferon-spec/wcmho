import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Brain, HandHeart, ArrowRight, Shield, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";

const stats = [
  { icon: Users, value: "15,000+", label: "Lives Transformed" },
  { icon: Brain, value: "120+", label: "Mental Health Programs" },
  { icon: HandHeart, value: "2,500+", label: "Active Volunteers" },
  { icon: Globe, value: "35+", label: "Communities Served" },
];

const programs = [
  {
    icon: Brain,
    title: "Anxiety & Depression Care",
    description: "Comprehensive therapy programs offering evidence-based treatments for anxiety disorders and depression.",
  },
  {
    icon: Shield,
    title: "Trauma Recovery",
    description: "Specialized care pathways helping survivors rebuild their lives through guided therapeutic sessions.",
  },
  {
    icon: Users,
    title: "Youth Mental Health",
    description: "Early intervention programs designed for children and adolescents facing emotional challenges.",
  },
  {
    icon: Sparkles,
    title: "Community Wellness",
    description: "Free workshops and group therapy fostering mental wellbeing across underserved communities.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-overlay-gradient" />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="relative container mx-auto px-4 pt-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Heart className="w-4 h-4" /> Changing Lives Through Compassion
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Your Mental Health{" "}
              <span className="text-accent">Matters</span> to Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl"
            >
              World Changers Mental Health Care Organisation provides compassionate,
              accessible mental health services while driving philanthropic change
              across communities worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
                <Link to="/mental-health">Our Programs <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src={aboutBg} alt="Support group session" className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Who We Are</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
                Compassion-Driven Mental Health Advocacy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For over a decade, World Changers has been at the forefront of mental health care, breaking stigma and providing life-changing support to individuals and families around the world.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our integrated approach combines clinical expertise with community-driven philanthropy, ensuring that quality mental health care is never out of reach.
              </p>
              <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <Link to="/about">Learn More About Us <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            label="Our Programs"
            title="Specialized Care for Every Need"
            description="We offer a comprehensive range of mental health programs designed to support individuals at every stage of their journey."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-hero-gradient group-hover:text-primary-foreground transition-all">
                  <program.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{program.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/mental-health">View All Programs <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
              Together, We Can Change the World
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join our mission to make mental health care accessible to everyone.
              Every donation, every volunteer hour, every act of kindness makes a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
                <Link to="/contact">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                <Link to="/volunteers">Become a Volunteer</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
