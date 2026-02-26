import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-wc.png";

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
      { label: "Volunteers", path: "/volunteers" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="World Changers" className="h-16 w-auto" />
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
            <Link to="/contact">Donate Now</Link>
          </Button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden">
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{link.label}</p>
                    {link.children.map((child) => (
                      <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)}
                        className="block px-6 py-2 text-sm text-foreground hover:text-primary">{child.label}</Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path!} onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground"}`}>
                    {link.label}
                  </Link>
                )
              )}
              <Button asChild className="mt-2 bg-hero-gradient text-primary-foreground">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Donate Now</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
