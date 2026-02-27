import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const baseImages = [
  { src: heroBg, alt: "Mindfulness session" },
  { src: prof1, alt: "Team member" },
  { src: philanthropyBg, alt: "Community outreach" },
  { src: prof2, alt: "Clinical session" },
  { src: aboutBg, alt: "Group therapy" },
  { src: prof3, alt: "Counseling" },
  { src: heroBg, alt: "Wellness workshop" },
  { src: philanthropyBg, alt: "Outreach program" },
  { src: prof1, alt: "Professional support" },
  { src: aboutBg, alt: "Support group" },
];

// Generate 40 images by cycling through base images
const images = Array.from({ length: 40 }, (_, i) => ({
  ...baseImages[i % baseImages.length],
  alt: `${baseImages[i % baseImages.length].alt} ${Math.floor(i / baseImages.length) + 1}`,
}));

const Gallery = () => (
  <div>
    <PageHero title="Gallery" subtitle="Moments that capture our impact" bgImage={philanthropyBg} />
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Visual Impact" title="Our Work in Pictures" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.04, duration: 0.4 }}
              className="rounded-xl overflow-hidden shadow-soft border border-border aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Gallery;
