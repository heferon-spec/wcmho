import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Brain, HandHeart, ArrowRight, Shield, Sparkles, Building, Star, Eye, Target, Lightbulb, Globe, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import VoiceAgent from "@/components/VoiceAgent";
import volunteerHero from "@/assets/volunteer-hero.jpg";
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

const stats = [
  { icon: Building, value: "537+", label: "Local WCMHC Branches" },
  { icon: Users, value: "3,224+", label: "Total WCMHC Staff" },
  { icon: HandHeart, value: "6,882+", label: "Total Volunteers" },
];

const impactStats = [
  { value: "2,500+", label: "Total Happy Families" },
  { value: "270+", label: "Total Our Volunteers" },
  { value: "3,150+", label: "Our Products & Gifts" },
  { value: "8,700+", label: "Worldwide Donors" },
];

const features = [
  { icon: Shield, title: "Become A Volunteer", desc: "There are many ways you can help us in creating a world with better mental health care for all." },
  { icon: Heart, title: "Shelter For Homeless", desc: "Providing safe spaces and mental health support for the homeless and displaced communities." },
  { icon: Sparkles, title: "Make World Happier", desc: "Our programs bring joy and healing to thousands of people around the globe every year." },
  { icon: Brain, title: "Give Healthy Life", desc: "Through quality mental health care, we help people reclaim healthy, fulfilling lives." },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "We lead with empathy, treating every individual with dignity and care." },
  { icon: Users, title: "Collaboration", desc: "We believe in the power of partnership and community-driven solutions." },
  { icon: Shield, title: "Integrity", desc: "Transparency and accountability guide everything we do." },
  { icon: Lightbulb, title: "Innovation", desc: "We pioneer new approaches to mental health care and community support." },
  { icon: Globe, title: "Inclusivity", desc: "Mental health care should be accessible to everyone, regardless of background." },
  { icon: BookOpen, title: "Education", desc: "We empower communities through knowledge, awareness, and skills development." },
];

const boardMembers = [
  { name: "Nigel Jeche", role: "CEO (Founder)", image: nigelJeche },
  { name: "Teboho Nthoana", role: "Chairperson", image: tebohoNthoana },
  { name: "Kojo Hudson", role: "Vice Chairperson", image: kojoHudson },
  { name: "Lungelo Ntobongwana", role: "Board Member", image: lungeloNtobongwana },
  { name: "Thulisile P. Buthelezi", role: "Secretary", image: thulisileButhelezi },
  { name: "Thabang K. Mokaka", role: "Administrator", image: thabangMokaka },
];

const marqueeItems = ["Mental Health", "Education", "Counseling", "Wellness", "Support", "Donation"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={volunteerHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-overlay-gradient" />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="relative container mx-auto px-4 pt-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> Change The World Together
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-snug mb-6">
              Empowering Communities
              <br />
              Through Compassion,
              <br />
              Knowledge and Care
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
                <Link to="/about">Explore More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-10 font-bold shadow-elevated">
                <Link to="/become-volunteer">Become a Volunteer <HandHeart className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base px-8">
                <a href="https://paystack.shop/pay/87qgnu5n8o" target="_blank" rel="noopener noreferrer">Donate Now</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-0">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-accent/90 p-6 text-center first:rounded-tl-xl last:rounded-tr-xl">
                  <div className="w-12 h-12 rounded-full bg-accent-foreground/20 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-accent-foreground">{stat.value}</p>
                  <p className="text-xs md:text-sm text-accent-foreground/80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Inspired Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
              <img src={aboutBg} alt="Support group session" className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-elevated hidden md:block">
                <p className="font-heading text-xl font-bold text-accent-foreground">90%</p>
                <p className="text-xs text-accent-foreground/80">Success Rate</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
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
                  <Link to="/about">Explore More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <VoiceAgent variant="icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a world-class humanitarian and mental health organisation that transforms communities through counselling, therapy, skills development, crisis management, and sustainable care, making mental health care accessible, sustainable, and impactful, while fostering resilience and social empowerment by 2035.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver innovative, high-quality mental health services and humanitarian aid, driven by compassion, collaboration, and advocacy. We break stigma, provide accessible education and support, and build resilient communities through mental health advocacy, outreach, and storytelling, ensuring no one is left behind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="What We Stand For" title="Our Core Values" description="The principles that guide our work and define who we are." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow border border-border group text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-hero-gradient transition-all">
                  <v.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-24 overflow-hidden">
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

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow group text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-hero-gradient transition-all">
                  <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-6 bg-accent overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 font-heading text-xl font-bold text-accent-foreground flex items-center gap-3">
              <Star className="w-4 h-4" /> {item}
            </span>
          ))}
        </div>
      </section>

      {/* Team - Board Members Only with Team Photo */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Leadership" title="Meet Our Team" description="Passionate professionals committed to making a difference." />

          {/* Team Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl overflow-hidden shadow-elevated"
          >
            <img src={teamPhoto} alt="World Changers Team" className="w-full object-cover" />
          </motion.div>

          <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Board Members</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boardMembers.map((m, i) => (
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
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/team">View Full Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <SectionHeading label="Our Portfolio" title="Successful Projects" description="See the impact of our programs across the globe." />
          <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
            <Link to="/portfolio">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Introductory Video Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Watch Our Story" title="Our Impact in Action" description="A look into our community work and a message from our founder." />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-elevated aspect-video"
          >
            <iframe
              src="https://www.youtube.com/embed/UQM-mYx3qcY"
              title="World Changers - Our Impact"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-10 font-bold">
                <Link to="/become-volunteer">Become a Volunteer <HandHeart className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
