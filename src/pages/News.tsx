import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, User, Clock, Tag } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import mentalHealthBg from "@/assets/mental-health-bg.jpg";
import campaignBg from "@/assets/campaign-bg.jpg";
import volunteerHero from "@/assets/volunteer-hero.jpg";
import portfolioCom1 from "@/assets/portfolio-community-1.jpg";
import portfolioCom2 from "@/assets/portfolio-community-2.jpg";
import portfolioCom3 from "@/assets/portfolio-community-3.jpg";
import portfolioEdu1 from "@/assets/portfolio-edu-1.jpg";
import portfolioWell1 from "@/assets/portfolio-wellness-1.jpg";
import portfolioWell2 from "@/assets/portfolio-wellness-2.jpg";

const articles = [
  {
    title: "South Africa Unites to Break Mental Health Stigma",
    date: "10 Oct 2025",
    category: "Mental Health",
    image: mentalHealthBg,
    excerpt: "SADAG's nationwide 'Together for Mental Health' campaign marks World Mental Health Day, revealing 1 in 3 South Africans will experience mental illness — yet 9 out of 10 go untreated.",
    readTime: "5 min",
  },
  {
    title: "Soweto Marches Together for Mental Health Awareness",
    date: "04 Nov 2025",
    category: "Community",
    image: portfolioCom1,
    excerpt: "SADAG closed Mental Health Awareness Month with a powerful march at Chris Hani Baragwanath Hospital, calling on the community to stand together for change.",
    readTime: "4 min",
  },
  {
    title: "Halfway House Clinic Champions Mental Health with Community Event",
    date: "26 Oct 2025",
    category: "Outreach",
    image: portfolioCom2,
    excerpt: "Over 200 community members converged for a vibrant Mental Health Awareness Day themed 'Mental Health Matters', hosted by the Johannesburg Metro District.",
    readTime: "3 min",
  },
  {
    title: "How Community Food Drives Are Transforming Lives",
    date: "15 Sep 2025",
    category: "Humanitarian",
    image: portfolioCom3,
    excerpt: "Our food distribution program has reached over 5,000 families across Gauteng and KwaZulu-Natal, providing nutritious meals and essential supplies.",
    readTime: "4 min",
  },
  {
    title: "Mental Health Education in Schools: Breaking the Cycle",
    date: "22 Aug 2025",
    category: "Education",
    image: portfolioEdu1,
    excerpt: "New peer counselling programs in schools are empowering learners to recognise signs of distress and seek help early, reducing dropout rates by 15%.",
    readTime: "6 min",
  },
  {
    title: "Golf Day Raises R500,000 for Youth Mental Health Programs",
    date: "18 Jul 2025",
    category: "Fundraising",
    image: portfolioWell1,
    excerpt: "The annual Mental Health Awareness Golf Day brought together corporate sponsors and community leaders, raising funds for youth therapy and counselling services.",
    readTime: "3 min",
  },
  {
    title: "The Rise of Workplace Wellness Programs in SA",
    date: "05 Jul 2025",
    category: "Wellness",
    image: aboutBg,
    excerpt: "Corporate South Africa is investing in employee wellbeing with on-site counsellors, mental health days, and stress management workshops showing 30% improvement in productivity.",
    readTime: "5 min",
  },
  {
    title: "Winter Blanket Drive Reaches 3,000 Homeless Individuals",
    date: "20 Jun 2025",
    category: "Charity",
    image: philanthropyBg,
    excerpt: "Volunteers braved the cold to distribute blankets, warm clothing, and hot meals to homeless communities across Johannesburg, Pretoria, and Cape Town.",
    readTime: "4 min",
  },
  {
    title: "Mindfulness and Traditional Healing: A South African Approach",
    date: "12 Jun 2025",
    category: "Mindfulness",
    image: portfolioWell2,
    excerpt: "Integrating indigenous healing practices with evidence-based mindfulness therapy is showing remarkable results in trauma recovery among rural communities.",
    readTime: "7 min",
  },
  {
    title: "New Crisis Hotline Saves Over 1,200 Lives in First Year",
    date: "01 May 2025",
    category: "Crisis Support",
    image: campaignBg,
    excerpt: "The 24/7 mental health crisis line launched by World Changers has handled over 45,000 calls, with trained counsellors providing immediate support and referrals.",
    readTime: "5 min",
  },
  {
    title: "Youth Art Therapy Program Expands to 5 New Provinces",
    date: "15 Apr 2025",
    category: "Youth",
    image: volunteerHero,
    excerpt: "Creative expression through art therapy is helping at-risk youth process trauma and build resilience, with the program now serving over 2,000 young people.",
    readTime: "4 min",
  },
  {
    title: "Disaster Relief: Rapid Response to KZN Flooding",
    date: "28 Mar 2025",
    category: "Disaster Relief",
    image: heroBg,
    excerpt: "Our humanitarian response team deployed within 24 hours, providing emergency shelter, food, and psychological support to over 800 affected families.",
    readTime: "6 min",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const News = () => (
  <div>
    <PageHero title="News & Articles" subtitle="Mental health resources, humanitarian stories, and community outreach updates" bgImage={heroBg} />

    {/* Featured Article */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Featured" title="Latest Headlines" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{articles[0].category}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{articles[0].title}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">{articles[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {articles[0].date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {articles[0].readTime} read</span>
            </div>
            <span className="text-sm font-medium text-accent flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
              Read Full Article <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* All Articles */}
    <section className="section-padding bg-muted pt-0">
      <div className="container mx-auto">
        <SectionHeading label="Blog & News" title="All Articles" description="Stay informed about mental health, humanitarian efforts, and community outreach across South Africa." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((a, i) => (
            <motion.article key={a.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group cursor-pointer hover:shadow-card transition-shadow">
              <div className="aspect-video overflow-hidden relative">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-lg">
                  {a.date}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium"><Tag className="w-3 h-3" /> {a.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{a.excerpt}</p>
                <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default News;
