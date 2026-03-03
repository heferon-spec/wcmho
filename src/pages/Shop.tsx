import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

const products = [
  { name: "Hope Bracelet", price: 275, desc: "Handmade bracelet — proceeds fund youth therapy." },
  { name: "Mindful Journal", price: 399, desc: "Guided journal for daily reflection and gratitude." },
  { name: "Calm Candle Set", price: 549, desc: "Lavender & sage soy candles for relaxation." },
  { name: "WCMHC T-Shirt", price: 450, desc: "Premium cotton tee with our mission statement." },
  { name: "Wellness Tea Box", price: 329, desc: "Curated herbal teas to promote calm & clarity." },
  { name: "Art Therapy Kit", price: 639, desc: "Creative expression set for stress relief." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Shop = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: { name: string; price: number }) => {
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
      <PageHero title="Shop for a Cause" subtitle="Every purchase supports our mental health programs" bgImage={philanthropyBg} />

      {/* Floating cart button */}
      <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-elevated hover:opacity-90 transition-opacity">
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
        )}
      </button>

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
                    <span className="text-lg font-bold text-primary">R{p.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => addToCart(p)} className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                      Add to Cart
                    </Button>
                  </div>
                </div>
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
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 bg-muted rounded-lg p-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">R{item.price.toFixed(2)}</p>
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
                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-lg font-semibold text-foreground">Total</span>
                    <span className="font-heading text-xl font-bold text-primary">R{totalPrice.toFixed(2)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    <a href="https://paystack.shop/pay/vt_8z5esxa2" target="_blank" rel="noopener noreferrer">
                      Checkout with Paystack <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
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
