import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

const PageHero = ({ title, subtitle, bgImage }: PageHeroProps) => (
  <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
    {bgImage && (
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
    )}
    <div className="absolute inset-0 bg-overlay-gradient" />
    <div className="absolute inset-0 bg-primary/40" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative text-center px-4"
    >
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  </section>
);

export default PageHero;
