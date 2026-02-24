import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, centered = true, light = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${centered ? "text-center max-w-2xl mx-auto" : ""}`}
  >
    {label && (
      <span className={`inline-block text-sm font-semibold tracking-wider uppercase mb-3 ${light ? "text-accent" : "text-accent"}`}>
        {label}
      </span>
    )}
    <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
