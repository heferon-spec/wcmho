import { useState } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";
import portfolioEdu1 from "@/assets/portfolio-edu-1.jpg";
import portfolioEdu2 from "@/assets/portfolio-edu-2.jpg";
import portfolioEdu3 from "@/assets/portfolio-edu-3.jpg";
import portfolioCom1 from "@/assets/portfolio-community-1.jpg";
import portfolioCom2 from "@/assets/portfolio-community-2.jpg";
import portfolioCom3 from "@/assets/portfolio-community-3.jpg";
import portfolioWell1 from "@/assets/portfolio-wellness-1.jpg";
import portfolioWell2 from "@/assets/portfolio-wellness-2.jpg";
import portfolioWell3 from "@/assets/portfolio-wellness-3.jpg";

const portfolioProjects = [
  { title: "portfolio.seminarsTitle", cats: ["portfolio.catEducation", "portfolio.catMentalHealth"], desc: "portfolio.seminarsDesc", image: portfolioEdu1 },
  { title: "portfolio.campusWellnessTitle", cats: ["portfolio.catEducation", "portfolio.catWellness"], desc: "portfolio.campusWellnessDesc", image: portfolioEdu2 },
  { title: "portfolio.literacyTitle", cats: ["portfolio.catEducation", "portfolio.catYouth"], desc: "portfolio.literacyDesc", image: portfolioEdu3 },
  { title: "portfolio.foodDriveTitle", cats: ["portfolio.catCommunity", "portfolio.catFoodSecurity"], desc: "portfolio.foodDriveDesc", image: portfolioCom1 },
  { title: "portfolio.winterReliefTitle", cats: ["portfolio.catCommunity", "portfolio.catCharity"], desc: "portfolio.winterReliefDesc", image: portfolioCom2 },
  { title: "portfolio.outreachTitle", cats: ["portfolio.catCommunity", "portfolio.catHumanitarian"], desc: "portfolio.outreachDesc", image: portfolioCom3 },
  { title: "portfolio.golfDayTitle", cats: ["portfolio.catWellness", "portfolio.catFundraising"], desc: "portfolio.golfDayDesc", image: portfolioWell1 },
  { title: "portfolio.mindfulnessTitle", cats: ["portfolio.catWellness", "portfolio.catSelfCare"], desc: "portfolio.mindfulnessDesc", image: portfolioWell2 },
  { title: "portfolio.galaTitle", cats: ["portfolio.catWellness", "portfolio.catCommunity"], desc: "portfolio.galaDesc", image: portfolioWell3 },
];

const filters = ["portfolio.catAll", "portfolio.catEducation", "portfolio.catCommunity", "portfolio.catWellness"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("portfolio.catAll");
  const filtered = activeFilter === "portfolio.catAll" ? portfolioProjects : portfolioProjects.filter((p) => p.cats.some((c) => c === activeFilter));

  return (
    <div>

      <SEO title={t("portfolio.seoTitle")} description={t("portfolio.seoDescription")} path="/portfolio" />
      <PageHero title={t("portfolio.heroTitle")} subtitle={t("portfolio.heroSubtitle")} bgImage={aboutBg} />

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label={t("portfolio.sectionLabel")} title={t("portfolio.sectionTitle")} description={t("portfolio.sectionDescription")} />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "border border-border hover:bg-primary hover:text-primary-foreground"}`}>
                {t(f)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group">
                <div className="aspect-video overflow-hidden">
                  <img src={project.image} alt={t(project.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 sm:p-5">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {project.cats.map((c) => (
                      <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t(c)}</span>
                    ))}
                  </div>
                  <h3 className="font-heading text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 leading-tight">{t(project.title)}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">{t(project.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-hero-gradient text-primary-foreground hover:opacity-90">
              <Link to="/contact">{t("portfolio.startProjectButton")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
