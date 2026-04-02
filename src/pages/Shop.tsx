import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2, Heart, Truck, Shield, RotateCcw, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CATEGORIES = [
  { label: "All", query: "" },
  { label: "T-Shirts", query: "product_type:T-Shirts OR title:Tee OR title:T-Shirt" },
  { label: "Journals", query: "product_type:Journals OR title:Journal" },
  { label: "Workbooks", query: "product_type:Workbooks OR title:Workbook" },
  { label: "Affirmation Cards", query: "product_type:Affirmation Cards OR title:Affirmation" },
  { label: "Mugs", query: "product_type:Mugs OR title:Mug" },
  { label: "Stickers", query: "product_type:Stickers OR title:Sticker" },
  { label: "Wristbands", query: "product_type:Wristbands OR title:Wristband" },
  { label: "Keychains", query: "product_type:Keychains OR title:Keychain" },
  { label: "Books", query: "product_type:Books OR title:Book" },
  { label: "Caps", query: "product_type:Caps OR title:Cap OR title:Beanie" },
  { label: "Tote Bags", query: "product_type:Tote Bags OR title:Tote" },
  { label: "Puzzles", query: "product_type:Puzzles OR title:Puzzle" },
  { label: "Candles", query: "product_type:Candles OR title:Candle" },
  { label: "Phone Cases", query: "product_type:Phone Cases OR title:Phone Case" },
  { label: "Posters", query: "product_type:Posters OR title:Wall Art OR title:Poster" },
];

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [reviewStats, setReviewStats] = useState<Record<string, { avg: number; count: number }>>({});
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();
  const { selectedCurrency, currencies: currencyList, changeCurrency, formatPrice } = useCurrency();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const category = CATEGORIES.find(c => c.label === activeCategory);
        const variables: Record<string, unknown> = { first: 50 };
        if (category?.query) variables.query = category.query;
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, variables);
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  useEffect(() => {
    async function fetchReviewStats() {
      try {
        const { data, error } = await supabase
          .from("product_reviews")
          .select("product_handle, rating");
        if (error) throw error;
        const stats: Record<string, { avg: number; count: number }> = {};
        if (data) {
          for (const r of data) {
            if (!stats[r.product_handle]) stats[r.product_handle] = { avg: 0, count: 0 };
            stats[r.product_handle].count++;
            stats[r.product_handle].avg += r.rating;
          }
          for (const key in stats) {
            stats[key].avg = stats[key].avg / stats[key].count;
          }
        }
        setReviewStats(stats);
      } catch (error) {
        console.error("Failed to fetch review stats:", error);
      }
    }
    fetchReviewStats();
  }, []);

  const getSelectedVariant = (product: ShopifyProduct) => {
    const selectedId = selectedVariants[product.node.id];
    if (selectedId) {
      return product.node.variants.edges.find(v => v.node.id === selectedId)?.node;
    }
    return product.node.variants.edges[0]?.node;
  };

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = getSelectedVariant(product);
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: `${product.node.title} - ${variant.title}` });
  };

  return (
    <div>
      <PageHero title="Shop for a Cause" subtitle="Every purchase supports our mental health programs across South Africa" bgImage={philanthropyBg} />

      {/* Currency Selector + Trust Badges */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto">
          {/* Currency Selector */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary transition-colors"
              >
                {selectedCurrency.symbol} {selectedCurrency.code} <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {currencyOpen && (
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-56 bg-card rounded-lg shadow-elevated border border-border py-2 z-50">
                  {currencyList.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { changeCurrency(c); setCurrencyOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedCurrency.code === c.code ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:bg-muted hover:text-primary"
                      }`}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Heart, label: "100% Goes to Charity" },
              { icon: Truck, label: "Free Shipping Over R500" },
              { icon: Shield, label: "Secure Checkout" },
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

      {/* Floating Cart */}
      <div className="fixed bottom-6 right-6 z-40">
        <CartDrawer />
      </div>

      {/* Category Filter */}
      <section className="pt-10 pb-2">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors font-medium ${
                  activeCategory === cat.label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Mental Health & Wellness" title="Shop & Support" description="100% of proceeds go directly to our mental health care initiatives." />

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No products found in "{activeCategory}"</p>
              <p className="text-sm text-muted-foreground mt-1">Check back soon for new items!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p, i) => {
                const variant = getSelectedVariant(p);
                const image = p.node.images.edges[0]?.node;
                const stats = reviewStats[p.node.handle];
                return (
                  <motion.div key={p.node.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group hover:shadow-card transition-shadow">
                    <div
                      className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${p.node.handle}`)}
                    >
                      {image ? (
                        <img src={image.url} alt={image.altText || p.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/20" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-heading text-base font-semibold text-foreground mt-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => navigate(`/product/${p.node.handle}`)}
                      >
                        {p.node.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-2">{p.node.description}</p>

                      {/* Reviews */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-3.5 h-3.5 ${
                            stats && star <= Math.round(stats.avg)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground/30"
                          }`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {stats ? `${stats.avg.toFixed(1)} (${stats.count})` : "No reviews yet"}
                        </span>
                      </div>

                      {/* Size selector */}
                      {p.node.options.length > 0 && p.node.options[0].values.length > 1 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">{p.node.options[0].name}</p>
                          <div className="flex flex-wrap gap-1">
                            {p.node.variants.edges.map((v) => (
                              <button
                                key={v.node.id}
                                onClick={() => setSelectedVariants(prev => ({ ...prev, [p.node.id]: v.node.id }))}
                                className={`px-2 py-1 text-xs rounded border transition-colors ${
                                  (selectedVariants[p.node.id] === v.node.id || (!selectedVariants[p.node.id] && v.node.id === p.node.variants.edges[0]?.node.id))
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-muted-foreground hover:border-primary"
                                }`}
                              >
                                {v.node.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(p)}
                          disabled={isLoading}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
