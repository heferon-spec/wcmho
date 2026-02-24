import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const products = [
  { name: "Hope Bracelet", price: "$15.00", desc: "Handmade bracelet — proceeds fund youth therapy." },
  { name: "Mindful Journal", price: "$22.00", desc: "Guided journal for daily reflection and gratitude." },
  { name: "Calm Candle Set", price: "$30.00", desc: "Lavender & sage soy candles for relaxation." },
  { name: "WCMHC T-Shirt", price: "$25.00", desc: "Premium cotton tee with our mission statement." },
  { name: "Wellness Tea Box", price: "$18.00", desc: "Curated herbal teas to promote calm & clarity." },
  { name: "Art Therapy Kit", price: "$35.00", desc: "Creative expression set for stress relief." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Shop = () => (
  <div>
    <PageHero title="Shop for a Cause" subtitle="Every purchase supports our mental health programs" bgImage={philanthropyBg} />
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Fundraising" title="Shop & Support" description="100% of proceeds go directly to our mental health care initiatives." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={p.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{p.price}</span>
                  <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Shop;
