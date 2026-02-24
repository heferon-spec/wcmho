import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const articles = [
  { title: "Breaking the Stigma: Mental Health in the Workplace", date: "Feb 15, 2026", image: heroBg, excerpt: "How employers can create supportive environments that prioritize employee mental wellness and reduce burnout." },
  { title: "5 Daily Habits for Better Mental Health", date: "Feb 10, 2026", image: aboutBg, excerpt: "Simple, evidence-based practices you can integrate into your routine to improve emotional resilience." },
  { title: "Our New Community Center Opens in Nairobi", date: "Feb 5, 2026", image: philanthropyBg, excerpt: "A milestone in our mission — free mental health services are now available to 10,000 more families." },
  { title: "Understanding Childhood Anxiety", date: "Jan 28, 2026", image: heroBg, excerpt: "Recognizing early signs and how parents can support their children through anxious moments." },
  { title: "Volunteer Spotlight: Maria's Story", date: "Jan 20, 2026", image: aboutBg, excerpt: "How one volunteer's dedication changed the trajectory of an entire community's mental health outcomes." },
  { title: "The Science of Gratitude and Mental Wellness", date: "Jan 12, 2026", image: philanthropyBg, excerpt: "Research-backed insights on how practicing gratitude rewires the brain for positivity." },
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
              <div className="aspect-video overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <CalendarDays className="w-3 h-3" /> {a.date}
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{a.excerpt}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
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
