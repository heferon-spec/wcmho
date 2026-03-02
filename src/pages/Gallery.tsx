import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import gallery30 from "@/assets/gallery-30.jpg";

const baseImages = [
  { src: gallery1, alt: "Men's Day Summit audience" },
  { src: gallery2, alt: "Volunteer registration" },
  { src: gallery3, alt: "EmpowaMen Speaker badge" },
  { src: gallery4, alt: "Depression and Mental Health panel" },
  { src: gallery5, alt: "Metro FM speaker session" },
  { src: gallery6, alt: "World Changers speaker" },
  { src: gallery7, alt: "Panel discussion on stage" },
  { src: gallery8, alt: "Community event audience" },
  { src: gallery9, alt: "Event attendees" },
  { src: gallery10, alt: "Youth at community event" },
  { src: gallery11, alt: "Guest speaker presentation" },
  { src: gallery12, alt: "Audience engagement" },
  { src: gallery13, alt: "Speaker addressing crowd" },
  { src: gallery14, alt: "Event attendees seated" },
  { src: gallery15, alt: "Community members at venue" },
  { src: gallery16, alt: "Youth audience" },
  { src: gallery17, alt: "Attendees at summit" },
  { src: gallery18, alt: "Community gathering" },
  { src: gallery19, alt: "Discussion session" },
  { src: gallery20, alt: "Crowd participation" },
  { src: gallery21, alt: "Golf Day team photo" },
  { src: gallery22, alt: "Mental Health Awareness Golf Day" },
  { src: gallery23, alt: "Golf Day ladies team" },
  { src: gallery24, alt: "Golfers on the course" },
  { src: gallery25, alt: "Golf Day at Lavo Wines" },
  { src: gallery26, alt: "Golf Day backdrop" },
  { src: gallery27, alt: "Golfers with umbrellas" },
  { src: gallery28, alt: "Community food distribution" },
  { src: gallery29, alt: "Humanitarian aid drive" },
  { src: gallery30, alt: "Community outreach event" },
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
