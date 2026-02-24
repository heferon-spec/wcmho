import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const articles = [
  { title: "Journeys Are Best Measured With Friends", date: "04 Nov", category: "Health", image: heroBg, excerpt: "How community support networks are transforming mental health outcomes in rural areas.", comments: 0 },
  { title: "A Place Where Start New Life With Adventure", date: "04 Nov", category: "Wellness", image: aboutBg, excerpt: "Our new rehabilitation center offers hope and healing for those struggling with addiction.", comments: 0 },
  { title: "Top 8 Amazing Mental Health Resources", date: "04 Nov", category: "Resources", image: philanthropyBg, excerpt: "Curated list of the most impactful mental health tools and programs available today.", comments: 0 },
  { title: "The Power of Mindfulness in Recovery", date: "04 Nov", category: "Mindfulness", image: prof1, excerpt: "Evidence-based mindfulness practices that accelerate recovery from trauma and anxiety.", comments: 0 },
  { title: "Top 5 Community Outreach Strategies", date: "04 Nov", category: "Community", image: prof2, excerpt: "Proven approaches to bring mental health education to underserved communities.", comments: 0 },
  { title: "Breaking Barriers in Mental Health Care", date: "04 Nov", category: "Advocacy", image: prof3, excerpt: "How policy changes and grassroots movements are reshaping access to mental health services.", comments: 0 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const News = () => (
  <div>
    <PageHero title="News & Articles" subtitle="Mental health resources, stories, and updates" bgImage={heroBg} />
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Blog & News" title="Latest from World Changers" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article key={a.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group">
              <div className="aspect-video overflow-hidden relative">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-lg">
                  {a.date}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="text-primary font-medium">{a.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> Admin</span>
                  <span>•</span>
                  <span>{a.comments} Comments</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
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
