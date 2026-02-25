import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

const Footer = () =>
<footer className="bg-foreground text-primary-foreground">
    {/* Top Bar */}
    <div className="border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm opacity-70">
        <span className="flex items-center gap-2">
          <span className="text-accent font-semibold">Welcome</span> to the Mental Health & Philanthropy
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-accent" /> 114 George Street, Kenilworth, Johannesburg, 2190
        </span>
        <div className="flex items-center gap-3">
          <span>Follow Us:</span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Twitter className="w-4 h-4" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Youtube className="w-4 h-4" /></a>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-heading text-lg font-bold">World Changers</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed mb-4">NGO REG :238-677
POB Number : 930084594
        </p>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors opacity-80"><Facebook className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {[
          { label: "About Us", path: "/about" },
          { label: "Mental Health", path: "/mental-health" },
          { label: "Philanthropy", path: "/philanthropy" },
          { label: "Campaigns", path: "/campaigns" },
          { label: "Our Team", path: "/team" },
          { label: "Portfolio", path: "/portfolio" },
          { label: "Contact", path: "/contact" }].
          map((l) =>
          <li key={l.path}>
                <Link to={l.path} className="hover:opacity-100 hover:text-accent transition-all">{l.label}</Link>
              </li>
          )}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Anxiety & Depression Care</li>
            <li>Youth Mental Health</li>
            <li>Community Outreach</li>
            <li>Volunteer Programs</li>
            <li>Fundraising Campaigns</li>
            <li>Trauma Recovery</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-accent" /> +27 75 452 4052
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0 text-accent" /> info@worldchangersmhc.org
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" /> 114 George Street, Kenilworth, Johannesburg, 2190
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <p>© 2026 World Changers Mental Health Care Organisation. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/faq">Privacy Policy</Link>
          <Link to="/faq">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>;


export default Footer;