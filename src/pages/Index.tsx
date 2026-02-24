import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Brain, HandHeart, ArrowRight, Shield, Sparkles, Globe, Phone, MapPin, Building, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const stats = [
  { icon: Building, value: "537+", label: "Local WCMHC Branches" },
  { icon: Users, value: "3,224+", label: "Total WCMHC Staff" },
  { icon: HandHeart, value: "6,882+", label: "Total Volunteers" },
];

const campaigns = [
  { title: "Help Youth Mental Health After Crisis", raised: "$85,946", goal: "$36,000", percent: 238, donations: 42 },
  { title: "Raise Funds for Rural Mental Health Clinics", raised: "$37,115", goal: "$62,000", percent: 60, donations: 17 },
  { title: "Counseling Support for Children in Need", raised: "$101,760", goal: "$38,000", percent: 268, donations: 7 },
  { title: "Free Therapy for Homeless Communities", raised: "$40,370", goal: "$82,000", percent: 49, donations: 13 },
  { title: "PTSD Recovery for Veterans & Families", raised: "$65,600", goal: "$65,000", percent: 101, donations: 19 },
  { title: "Mental Health Insurance for the Poor", raised: "$73,910", goal: "$52,000", percent: 142, donations: 7 },
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

const team = [
  { name: "Yoni Albert", role: "Supporter", image: prof1 },
  { name: "Christine Eve", role: "Consultant", image: prof2 },
  { name: "David Hardson", role: "Consultant", image: prof3 },
  { name: "Fred Andrew", role: "Consultant", image: prof1 },
  { name: "Jessica Brown", role: "Manager", image: prof2 },
];

const testimonials = [
  { name: "Kevin Smith", role: "Company Founder", text: "World Changers has transformed our community's approach to mental health. Their dedication and compassion are unmatched." },
  { name: "Jessica Brown", role: "Founder & CEO", text: "The impact of their programs is incredible. I've seen lives completely transformed through their care and support." },
  { name: "Christine Eve", role: "Founder & CEO", text: "Their holistic approach to mental health care sets them apart. Every family they touch is forever changed." },
];

const blogPosts = [
  { title: "Breaking the Stigma: Mental Health in the Workplace", date: "04 Nov", category: "Health", image: heroBg },
  { title: "A New Life Through Mental Health Support", date: "04 Nov", category: "Wellness", image: aboutBg },
  { title: "Top 8 Ways to Improve Community Mental Health", date: "04 Nov", category: "Community", image: prof1 },
];

const programs = [
  { icon: Brain, title: "Anxiety & Depression Care", description: "Comprehensive therapy programs offering evidence-based treatments for anxiety disorders and depression." },
  { icon: Shield, title: "Trauma Recovery", description: "Specialized care pathways helping survivors rebuild their lives through guided therapeutic sessions." },
  { icon: Users, title: "Youth Mental Health", description: "Early intervention programs designed for children and adolescents facing emotional challenges." },
  { icon: Sparkles, title: "Community Wellness", description: "Free workshops and group therapy fostering mental wellbeing across underserved communities." },
];

const marqueeItems = ["Mental Health", "Education", "Counseling", "Wellness", "Support", "Donation"];

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
              <Heart className="w-4 h-4" /> Change The World Together
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Lend A Helping Hand To Who Those Need It
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
                <Link to="/about">Explore More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base px-8">
                <Link to="/contact">Donate Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-0">
              {stats.map((stat, i) => (
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
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img src={aboutBg} alt="Support group session" className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-elevated hidden md:block">
                <p className="font-heading text-xl font-bold text-accent-foreground">90%</p>
                <p className="text-xs text-accent-foreground/80">Success Rate</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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

      {/* Campaigns with Progress */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            label="Our Campaigns"
            title="Help & Donate Our Campaigns"
            description="Support our mental health initiatives and make a real difference in the lives of those who need it most."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group"
              >
                <div className="aspect-video bg-primary/10 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-primary/30" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 line-clamp-2">{c.title}</h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Raised: <span className="text-primary font-semibold">{c.raised}</span></span>
                    <span className="text-accent font-semibold">{c.percent}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${Math.min(c.percent, 100)}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Goal: {c.goal}</span>
                    <span>{c.donations} Donations</span>
                  </div>
                  <Button asChild className="mt-4 w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    <Link to="/contact">Donate Now</Link>
                  </Button>
                </div>
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
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow group text-center"
              >
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

      {/* Team / Volunteers */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Our Team" title="Meet Our Volunteers" description="Passionate individuals who dedicate their time and skills to our mission." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-2xl overflow-hidden shadow-card group text-center">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-base font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-primary mt-1">{m.role}</p>
                  <Button asChild variant="outline" size="sm" className="mt-3 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs">
                    <Link to="/team">View Profile</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Case Studies */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Our Portfolio" title="Successful Projects" description="See the impact of our programs across the globe." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Help the Mental Health System", cats: ["Mental Health", "Medical Health"] },
              { title: "Clean Mind Initiatives", cats: ["Wellness", "Community"] },
              { title: "Healthy Living for All", cats: ["Counseling", "Support"] },
              { title: "Youth Mental Wellness Program", cats: ["Education", "Mental Health"] },
              { title: "Community Counseling Centers", cats: ["Community", "Medical Health"] },
              { title: "Better Lives Through Therapy", cats: ["Wellness", "Support"] },
            ].map((project, i) => (
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
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/gallery">Explore More <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Testimonials" title="What People Say About Us" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / News */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Blog & News" title="Latest News & Articles" />
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article key={post.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group">
                <div className="aspect-video overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-lg">
                    {post.date}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-3 line-clamp-2">{post.title}</h3>
                  <Link to="/news" className="text-sm font-medium text-accent flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/news">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
