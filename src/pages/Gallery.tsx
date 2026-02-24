import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const images = [
  { src: heroBg, alt: "Mindfulness session", span: "md:col-span-2 md:row-span-2" },
  { src: prof1, alt: "Team member", span: "" },
  { src: philanthropyBg, alt: "Community outreach", span: "md:col-span-2" },
  { src: prof2, alt: "Clinical session", span: "" },
  { src: aboutBg, alt: "Group therapy", span: "md:col-span-2" },
  { src: prof3, alt: "Counseling", span: "" },
];

const Gallery = () => (
  <div>
    <PageHero title="Gallery" subtitle="Moments that capture our impact" bgImage={philanthropyBg} />
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Visual Impact" title="Our Work in Pictures" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`rounded-xl overflow-hidden ${img.span} aspect-square`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Gallery;
