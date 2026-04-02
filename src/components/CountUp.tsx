import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

const CountUp = ({ value, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  // Extract numeric part, prefix, and suffix
  const match = value.match(/^([^\d]*)(\d[\d,.]*)([^\d]*)$/);
  const isTextOnly = !match;
  const prefix = match?.[1] || "";
  const numStr = match?.[2] || "0";
  const suffix = match?.[3] || "";
  const [display, setDisplay] = useState(isTextOnly ? value : "0");
  const target = parseFloat(numStr.replace(/,/g, ""));
  const hasDecimal = numStr.includes(".");
  const decimalPlaces = hasDecimal ? numStr.split(".")[1]?.replace(/[^\d]/g, "").length || 0 : 0;
  const hasCommas = numStr.includes(",");

  useEffect(() => {
    if (!isInView || isTextOnly) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      let formatted = hasDecimal ? current.toFixed(decimalPlaces) : Math.round(current).toString();
      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }
      setDisplay(formatted);
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(numStr);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, isTextOnly, target, numStr, hasDecimal, decimalPlaces, hasCommas]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {isTextOnly ? value : <>{prefix}{display}{suffix}</>}
    </motion.span>
  );
};

export default CountUp;
