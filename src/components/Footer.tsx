import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    {/* Top Bar */}
    <div className="border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm opacity-70">
        <span className="flex items-center gap-2">
          <span className="text-accent font-semibold">Welcome</span> to the Mental Health & Philanthropy
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-accent" /> 123 Serenity Lane, New York, United States
        </span>
        <div className="flex items-center gap-3">
          <span>Follow Us:</span>
          <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
          <a href="#" className="hover:text-accent transition-colors"><Youtube className="w-4 h-4" /></a>
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
          <p className="text-sm opacity-70 leading-relaxed">
            Transforming lives through compassionate mental health care and meaningful philanthropic action across the globe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {[
              { label: "About Us", path: "/about" },
              { label: "Mental Health", path: "/mental-health" },
              { label: "Philanthropy", path: "/philanthropy" },
              { label: "Our Team", path: "/team" },
              { label: "Volunteers", path: "/volunteers" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="hover:opacity-100 hover:text-accent transition-all">
                  {l.label}
                </Link>
              </li>
            ))}
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
              <Phone className="w-4 h-4 shrink-0 text-accent" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0 text-accent" /> info@worldchangersmhc.org
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" /> 123 Serenity Lane, New York, NY 10001
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
  </footer>
);

export default Footer;
