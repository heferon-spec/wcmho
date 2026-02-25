import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Heart, Users, ArrowRight, TrendingUp, DollarSign, Target, BarChart3, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const campaigns = [
  { title: "Help Youth Mental Health After Crisis", raised: "$85,946", goal: "$36,000", percent: 238, donations: 42, desc: "Emergency mental health support for young people affected by natural disasters and conflict." },
  { title: "Raise Funds for Rural Mental Health Clinics", raised: "$37,115", goal: "$62,000", percent: 60, donations: 17, desc: "Building accessible clinics in remote areas where mental health services don't exist." },
  { title: "Counseling Support for Children in Need", raised: "$101,760", goal: "$38,000", percent: 268, donations: 7, desc: "Free therapy and counseling for orphaned and vulnerable children across Africa." },
  { title: "Free Therapy for Homeless Communities", raised: "$40,370", goal: "$82,000", percent: 49, donations: 13, desc: "Bringing licensed therapists to shelters and homeless support centers." },
  { title: "PTSD Recovery for Veterans & Families", raised: "$65,600", goal: "$65,000", percent: 101, donations: 19, desc: "Comprehensive trauma recovery programs for military veterans and their families." },
  { title: "Mental Health Insurance for the Poor", raised: "$73,910", goal: "$52,000", percent: 142, donations: 7, desc: "Subsidizing mental health insurance for families living below the poverty line." },
  { title: "School Counselor Training Program", raised: "$28,400", goal: "$45,000", percent: 63, donations: 22, desc: "Training 500 school counselors in trauma-informed care across public schools." },
  { title: "Maternal Mental Health Initiative", raised: "$54,200", goal: "$70,000", percent: 77, donations: 31, desc: "Postnatal depression screening and support for new mothers in underserved areas." },
  { title: "Digital Mental Health Platform", raised: "$92,000", goal: "$100,000", percent: 92, donations: 56, desc: "Building a free mobile app providing mental health resources and crisis support." },
];

const topDonors = [
  { name: "The Mandela Foundation", amount: "$25,000", campaigns: 5, image: prof1 },
  { name: "Greenfield Corporation", amount: "$18,500", campaigns: 3, image: prof2 },
  { name: "Sarah & James Trust", amount: "$15,200", campaigns: 7, image: prof3 },
  { name: "African Unity Fund", amount: "$12,000", campaigns: 4, image: prof1 },
  { name: "Hope Springs Charity", amount: "$9,800", campaigns: 2, image: prof2 },
];

const dashboardStats = [
  { icon: DollarSign, value: "$579,301", label: "Total Funds Raised" },
  { icon: Target, value: "9", label: "Active Campaigns" },
  { icon: Users, value: "214", label: "Total Donors" },
  { icon: TrendingUp, value: "87%", label: "Avg. Completion" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Campaigns = () => (
  <div>
    <PageHero title="Our Campaigns" subtitle="Support our mental health initiatives and make a real difference" bgImage={heroBg} />

    {/* User Dashboard Stats */}
    <section className="relative -mt-16 z-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-elevated text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Campaign Grid */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Campaign Grid" title="Help & Donate Our Campaigns" description="Every contribution brings us closer to a world where mental health care is accessible to all." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c, i) => (
            <motion.div key={c.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group hover:shadow-card transition-shadow">
              <div className="aspect-video bg-primary/5 flex items-center justify-center relative">
                <Brain className="w-16 h-16 text-primary/20" />
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {c.percent}%
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.desc}</p>
                <div className="w-full bg-muted rounded-full h-2.5 mb-3">
                  <div className="bg-accent h-2.5 rounded-full transition-all" style={{ width: `${Math.min(c.percent, 100)}%` }} />
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-muted-foreground">Raised: <span className="text-primary font-semibold">{c.raised}</span></span>
                  <span className="text-muted-foreground">Goal: {c.goal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{c.donations} Donations</span>
                  <Button asChild size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                    <Link to="/contact">Donate Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Campaign Progress Overview */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Campaign Analytics</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mt-3">Real-Time Impact Dashboard</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <BarChart3 className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="font-heading text-3xl font-bold text-primary-foreground">$579K+</p>
            <p className="text-sm text-primary-foreground/70 mt-1">Total Raised Across All Campaigns</p>
          </div>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Heart className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="font-heading text-3xl font-bold text-primary-foreground">12,400+</p>
            <p className="text-sm text-primary-foreground/70 mt-1">Lives Positively Impacted</p>
          </div>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Star className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="font-heading text-3xl font-bold text-primary-foreground">6</p>
            <p className="text-sm text-primary-foreground/70 mt-1">Campaigns Fully Funded</p>
          </div>
        </div>
      </div>
    </section>

    {/* Donor Dashboard */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="Donor Dashboard" title="Our Top Supporters" description="Recognizing the generous individuals and organizations powering our mission." />
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] bg-hero-gradient text-primary-foreground text-sm font-semibold">
              <div className="p-4">Donor</div>
              <div className="p-4">Total Donated</div>
              <div className="p-4 hidden md:block">Campaigns</div>
            </div>
            {topDonors.map((d, i) => (
              <motion.div key={d.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="grid grid-cols-[1fr_auto_auto] border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center">
                <div className="p-4 flex items-center gap-3">
                  <img src={d.image} alt={d.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm font-medium text-foreground">{d.name}</span>
                </div>
                <div className="p-4 text-sm font-semibold text-primary">{d.amount}</div>
                <div className="p-4 hidden md:block text-sm text-muted-foreground">{d.campaigns} campaigns</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Extra Info / How It Works */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="How It Works" title="Your Donation Journey" description="Transparency is at the heart of everything we do." />
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Choose a Campaign", desc: "Browse our active campaigns and find one that resonates with you." },
            { step: "02", title: "Make a Donation", desc: "Contribute any amount — every rand and dollar makes a difference." },
            { step: "03", title: "Track Progress", desc: "Follow real-time updates on funding progress and milestones." },
            { step: "04", title: "See the Impact", desc: "Receive reports showing exactly how your donation changed lives." },
          ].map((item, i) => (
            <motion.div key={item.step} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-2xl font-bold text-accent">{item.step}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-accent-foreground mb-4">Ready to Make a Difference?</h2>
        <p className="text-accent-foreground/80 max-w-xl mx-auto mb-8">Start your own campaign or donate to an existing one. Together we can transform mental health care.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/contact">Start a Campaign <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
            <Link to="/volunteers">Become a Volunteer</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Campaigns;
