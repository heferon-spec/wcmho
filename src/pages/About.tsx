import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, ArrowRight, Phone, Users, Globe, Brain, HandHeart, Shield, Megaphone } from "lucide-react";
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

    {/* Who We Are */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative">
            <img src={heroBg} alt="Our team in action" className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-elevated hidden md:block">
              <p className="font-heading text-xl font-bold text-accent-foreground">Since 2017</p>
              <p className="text-xs text-accent-foreground/80">Serving the Vulnerable</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Who We Are</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
              Founded in 2017 to Serve the Vulnerable
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              World Changers Mental Health Care Organisation was founded in 2017 with a singular purpose: to serve the most vulnerable members of our communities. Born out of a deep understanding that mental health is inseparable from overall well-being, we set out to bridge the gap between those in need and the care they deserve.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Today, we operate across multiple regions, delivering compassionate care, humanitarian aid, and life-changing programs that empower individuals to rebuild their lives with dignity and hope.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <Link to="/contact">Get In Touch <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <a href="tel:+27754524052" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Call Any Time</span>
                  <span className="font-semibold">+27 75 452 4052</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* What We Do */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="What We Do" title="Our Work & Impact" description="Addressing the intersection of poverty, mental health, and community empowerment." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Mental Health Services", desc: "We provide counselling, therapy, trauma recovery, and crisis intervention services to individuals and families, recognising the critical link between poverty and mental health." },
            { icon: HandHeart, title: "Humanitarian Aid & Charity", desc: "We deliver essential humanitarian aid to underserved communities, offering food, shelter support, and resources to those affected by poverty and displacement." },
            { icon: Globe, title: "Community Outreach", desc: "Our outreach programs connect with grassroots communities, providing education, skills development, and empowerment to break cycles of poverty and stigma." },
            { icon: Megaphone, title: "Human Rights Advocacy", desc: "We advocate for the rights of marginalised individuals, ensuring equitable access to healthcare, education, and social justice." },
            { icon: Shield, title: "Substance Abuse Prevention", desc: "Our prevention programs address substance abuse through education, early intervention, and rehabilitation support within vulnerable communities." },
            { icon: Users, title: "Skills Development", desc: "We equip individuals with vocational and life skills, enabling self-sufficiency and economic empowerment for sustainable change." },
          ].map((item, i) => (
            <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-primary">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Mission</span>
            <h3 className="font-heading text-2xl font-bold text-foreground mt-3 mb-4">Healing Minds, Transforming Lives</h3>
            <p className="text-muted-foreground leading-relaxed">
              To deliver innovative, high-quality mental health services and humanitarian aid, driven by compassion, collaboration, and advocacy. We break stigma, provide accessible education and support, and build resilient communities through mental health advocacy, outreach, and storytelling, ensuring no one is left behind.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-accent">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Vision</span>
            <h3 className="font-heading text-2xl font-bold text-foreground mt-3 mb-4">A World Free of Mental Health Stigma</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be a world-class humanitarian and mental health organisation that transforms communities through counselling, therapy, skills development, crisis management, and sustainable care, making mental health care accessible, sustainable, and impactful, while fostering resilience and social empowerment by 2035.
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
