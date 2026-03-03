import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Mental Health", path: "/mental-health" },
  { label: "Philanthropy", path: "/philanthropy" },
  { label: "Donor Dashboard", path: "/campaigns" },
  {
    label: "Pages",
    children: [
      { label: "Our Team", path: "/team" },
      { label: "Become a Volunteer", path: "/become-volunteer" },
      { label: "Events", path: "/events" },
      { label: "Portfolio", path: "/portfolio" },
      { label: "Gallery", path: "/gallery" },
      { label: "FAQ", path: "/faq" },
      { label: "Shop", path: "/shop" },
      { label: "News & Articles", path: "/news" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img alt="World Changers" className="h-20 w-auto mix-blend-multiply" src="/lovable-uploads/23ca8ce6-94a0-490f-b830-aa186f641c8c.png" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors rounded-lg">
                  {link.label} <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-card rounded-lg shadow-elevated border border-border py-2">
                      {link.children.map((child) => (
                        <Link key={child.path} to={child.path} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.path} to={link.path!}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"}`}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <Link to="/shop" className="p-2 text-foreground hover:text-primary transition-colors relative" title="Shop">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/login" className="p-2 text-foreground hover:text-primary transition-colors" title="Log In">
            <User className="w-5 h-5" />
          </Link>
          <Button asChild className="hidden md:inline-flex bg-hero-gradient hover:opacity-90 text-primary-foreground ml-2">
            <a href="https://paystack.shop/pay/87qgnu5n8o" target="_blank" rel="noopener noreferrer">Donate Now</a>
          </Button>

          {/* Mobile Menu - Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col py-6 px-4 gap-1 h-full overflow-y-auto">
                <div className="mb-4">
                  <img alt="World Changers" className="h-16 w-auto mix-blend-multiply" src="/lovable-uploads/23ca8ce6-94a0-490f-b830-aa186f641c8c.png" />
                </div>
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">{link.label}</p>
                      {link.children.map((child) => (
                        <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)}
                          className={`block px-6 py-2.5 text-sm rounded-lg transition-colors ${location.pathname === child.path ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:text-primary hover:bg-muted"}`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link key={link.path} to={link.path!} onClick={() => setMobileOpen(false)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"}`}>
                      {link.label}
                    </Link>
                  )
                )}
                <Button asChild className="mt-6 bg-hero-gradient text-primary-foreground">
                  <a href="https://paystack.shop/pay/87qgnu5n8o" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Donate Now</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
