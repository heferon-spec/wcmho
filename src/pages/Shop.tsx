import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, X, ExternalLink, Star, Heart, Award, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  features: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string;
}

const products: Product[] = [
  {
    name: "Mindful Journal",
    price: 399,
    originalPrice: 499,
    desc: "A beautifully crafted guided journal with 365 daily prompts for reflection, gratitude, and emotional check-ins. Includes mood tracking pages, breathing exercise guides, and affirmation cards.",
    features: ["365 guided prompts", "Mood tracker", "Premium vegan leather cover"],
    rating: 4.9,
    reviewCount: 142,
    badge: "Best Seller",
    category: "Self-Care",
  },
  {
    name: "Calm Candle Set",
    price: 549,
    desc: "Hand-poured soy candles infused with lavender, sage, and chamomile essential oils. Designed to create a calming atmosphere for meditation and relaxation. Set of 3 candles, 45-hour burn time each.",
    features: ["100% soy wax", "Essential oils", "45hr burn time each"],
    rating: 4.8,
    reviewCount: 98,
    category: "Relaxation",
  },
  {
    name: "Hope Bracelet",
    price: 275,
    desc: "Handcrafted beaded bracelet symbolising hope and mental health awareness. Each bracelet is made by survivors and proceeds directly fund youth therapy sessions.",
    features: ["Handcrafted", "Adjustable size", "Awareness symbol"],
    rating: 4.7,
    reviewCount: 215,
    badge: "Popular",
    category: "Accessories",
  },
  {
    name: "WCMHC T-Shirt",
    price: 450,
    desc: "Premium 100% organic cotton tee featuring our 'Break the Stigma' mission statement. Available in unisex sizes. Comfortable, breathable, and perfect for spreading awareness.",
    features: ["Organic cotton", "Unisex fit", "Machine washable"],
    rating: 4.6,
    reviewCount: 67,
    category: "Apparel",
  },
  {
    name: "Wellness Tea Box",
    price: 329,
    desc: "A curated collection of 6 organic herbal teas — chamomile, rooibos, peppermint, lemon balm, passionflower, and ashwagandha — each chosen to promote calm, focus, and better sleep.",
    features: ["6 herbal blends", "Caffeine-free", "30 tea bags"],
    rating: 4.8,
    reviewCount: 89,
    category: "Nutrition",
  },
  {
    name: "Art Therapy Kit",
    price: 639,
    originalPrice: 749,
    desc: "Complete creative expression set including watercolours, coloured pencils, sketchpad, clay, and a guided art therapy workbook. Clinically inspired activities for stress relief and emotional processing.",
    features: ["Guided workbook", "Premium supplies", "Carry case"],
    rating: 4.9,
    reviewCount: 56,
    badge: "New",
    category: "Therapy",
  },
  {
    name: "Breathing Exercise Cards",
    price: 199,
    desc: "A deck of 52 beautifully illustrated cards, each featuring a different breathing or grounding technique. Perfect for anxiety management, panic attacks, and daily mindfulness practice.",
    features: ["52 techniques", "Illustrated guides", "Portable deck"],
    rating: 4.7,
    reviewCount: 134,
    category: "Self-Care",
  },
  {
    name: "Weighted Comfort Blanket",
    price: 1299,
    originalPrice: 1499,
    desc: "Therapeutic weighted blanket (7kg) with glass bead filling and ultra-soft minky cover. Clinically shown to reduce anxiety, improve sleep quality, and provide deep pressure stimulation.",
    features: ["7kg weight", "Removable cover", "Glass bead filling"],
    rating: 4.9,
    reviewCount: 203,
    badge: "Top Rated",
    category: "Sleep & Relaxation",
  },
  {
    name: "Affirmation Card Set",
    price: 249,
    desc: "100 positive affirmation cards covering self-worth, resilience, gratitude, and healing. Designed with clinical psychologists. Perfect for daily practice or group therapy sessions.",
    features: ["100 cards", "Clinician-designed", "Display stand"],
    rating: 4.6,
    reviewCount: 78,
    category: "Self-Care",
  },
  {
    name: "Meditation Cushion",
    price: 599,
    desc: "Ergonomically designed buckwheat hull meditation cushion with removable organic cotton cover. Supports proper posture for extended meditation and mindfulness sessions.",
    features: ["Buckwheat hull fill", "Organic cotton", "Adjustable height"],
    rating: 4.8,
    reviewCount: 45,
    category: "Meditation",
  },
  {
    name: "Stress Relief Essential Oil Set",
    price: 449,
    originalPrice: 549,
    desc: "Set of 6 therapeutic-grade essential oils — lavender, bergamot, ylang ylang, frankincense, vetiver, and sweet orange. Includes a bamboo diffuser and usage guide for stress management.",
    features: ["6 essential oils", "Bamboo diffuser", "Usage guide"],
    rating: 4.7,
    reviewCount: 112,
    badge: "Value Pack",
    category: "Aromatherapy",
  },
  {
    name: "Mental Health First Aid Book",
    price: 349,
    desc: "Comprehensive guide to recognising and responding to mental health crises. Covers depression, anxiety, PTSD, substance use, and suicidal ideation. Written by SA clinical psychologists.",
    features: ["SA-focused", "Evidence-based", "Resource directory"],
    rating: 4.9,
    reviewCount: 167,
    category: "Education",
  },
];

const reviews = [
  { name: "Thandiwe M.", product: "Mindful Journal", rating: 5, text: "This journal has completely transformed my mornings. The prompts are thoughtful and really help me start the day with intention.", date: "2 weeks ago" },
  { name: "Johan V.", product: "Weighted Comfort Blanket", rating: 5, text: "I've struggled with insomnia for years. This blanket is a game-changer — I fall asleep faster and wake up feeling rested.", date: "1 month ago" },
  { name: "Sipho N.", product: "Art Therapy Kit", rating: 5, text: "Bought this for my daughter who's been going through a tough time. The guided workbook is incredible. Highly recommend.", date: "3 weeks ago" },
  { name: "Lerato K.", product: "Calm Candle Set", rating: 4, text: "Beautiful candles with a lovely scent. Perfect for unwinding after a long day. The lavender one is my favourite.", date: "1 month ago" },
  { name: "Anele D.", product: "Hope Bracelet", rating: 5, text: "Love knowing my purchase goes to a good cause. I wear it every day as a reminder that hope is always present.", date: "2 months ago" },
  { name: "Fatima R.", product: "Breathing Exercise Cards", rating: 5, text: "These cards have been lifesaving during panic attacks. Easy to carry in my bag and the illustrations are calming.", date: "3 weeks ago" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
    ))}
  </div>
);

const Shop = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) return prev.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) => prev.map((item) => item.name === name ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter((item) => item.qty > 0));
  };

  const removeItem = (name: string) => setCart((prev) => prev.filter((item) => item.name !== name));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <PageHero title="Shop for a Cause" subtitle="Every purchase supports our mental health programs across South Africa" bgImage={philanthropyBg} />

      {/* Floating cart button */}
      <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-elevated hover:opacity-90 transition-opacity">
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
        )}
      </button>

      {/* Trust Badges */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Heart, label: "100% Goes to Charity" },
              { icon: Truck, label: "Free Shipping Over R500" },
              { icon: Shield, label: "Secure Payment" },
              { icon: RotateCcw, label: "30-Day Returns" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2">
                <b.icon className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Mental Health & Wellness" title="Shop & Support" description="100% of proceeds go directly to our mental health care initiatives." />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group hover:shadow-card transition-shadow">
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/20" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-lg">{p.badge}</span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-heading text-base font-semibold text-foreground mt-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={Math.round(p.rating)} />
                    <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {p.features.map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Award className="w-3 h-3 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">R{p.price.toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-2">R{p.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <Button size="sm" onClick={() => addToCart(p)} className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Testimonials" title="What Our Customers Say" description="Real reviews from people who shop with purpose." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={r.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-5 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{r.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <StarRating rating={r.rating} />
                <p className="text-xs text-accent font-medium mt-2 mb-1">Purchased: {r.product}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-elevated flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground mt-1">Add some items to get started</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 bg-muted rounded-lg p-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">R{item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(item.name, -1)} className="w-7 h-7 rounded bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.qty}</span>
                        <button onClick={() => updateQty(item.name, 1)} className="w-7 h-7 rounded bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.name)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-border space-y-3">
                  {totalPrice >= 500 && (
                    <p className="text-xs text-accent font-medium text-center">🎉 You qualify for free shipping!</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-lg font-semibold text-foreground">Total</span>
                    <span className="font-heading text-xl font-bold text-primary">R{totalPrice.toFixed(2)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    <a href="https://paystack.shop/pay/vt_8z5esxa2" target="_blank" rel="noopener noreferrer">
                      Checkout with Paystack <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Secure payment powered by Paystack</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
