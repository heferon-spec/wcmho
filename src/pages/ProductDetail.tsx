import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
          setSelectedVariantId(data.data.productByHandle.variants.edges[0]?.node.id || null);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const selectedVariant = product.variants.edges.find((v: any) => v.node.id === selectedVariantId)?.node;
  const image = product.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: `${product.title} - ${selectedVariant.title}` });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate('/shop')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Button>

        <div className="fixed bottom-6 right-6 z-40">
          <CartDrawer />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            {image ? (
              <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-24 h-24 text-muted-foreground/20" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-3xl font-bold text-foreground">{product.title}</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">{product.description}</p>

            {/* Variant selector */}
            {product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-2">{product.options[0].name}</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v: any) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantId(v.node.id)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                        selectedVariantId === v.node.id
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

            <div className="mt-6">
              <span className="text-2xl font-bold text-primary">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant}
              className="mt-6 w-full md:w-auto"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
