import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
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

      {/* Trust Badges */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto">
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
              <p className="text-lg text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">Check back soon for new items!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p, i) => {
                const variant = getSelectedVariant(p);
                const image = p.node.images.edges[0]?.node;
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
                      <p className="text-xs text-muted-foreground mt-1 mb-3 line-clamp-2">{p.node.description}</p>

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
