import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { label: "Instagram", url: "https://www.instagram.com/wc_mentalhealthcare", icon: "instagram" },
  { label: "Facebook", url: "https://www.facebook.com/worldchangers.organisation/", icon: "facebook" },
  { label: "X", url: "https://www.x.com/wcmentalhealth1", icon: "x" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/world-changers-mental-health-care-org", icon: "linkedin" },
  { label: "YouTube", url: "https://www.youtube.com/@worldchangersmentalhealthc3036", icon: "youtube" },
];

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">World Changers MHC</h4>
          <p className="text-sm opacity-70 leading-relaxed mb-4">
            NGO REG: 238-677<br />
            POB Number: 930084594<br /><br />
            Your donations are eligible for tax deduction.
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
              { label: "Donor Dashboard", path: "/campaigns" },
              { label: "Our Team", path: "/team" },
              { label: "Events", path: "/events" },
              { label: "Contact", path: "/contact" },
              { label: "Policies", path: "/policies" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="hover:opacity-100 hover:text-accent transition-all">{l.label}</Link>
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
            <li>Skills Development</li>
            <li>Humanitarian Aid</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-accent" />
              <span className="hover:opacity-100 hover:text-accent transition-all cursor-pointer" onClick={() => document.querySelector<HTMLButtonElement>('[title="Call now"]')?.click()}>Call Now (AI Agent)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0 text-accent" />
              <a href="mailto:info@worldchangersmh.org" className="hover:opacity-100 hover:text-accent transition-all">info@worldchangersmh.org</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
              <a href="https://maps.google.com/?q=114+George+Street,+Kenilworth,+Johannesburg,+2190" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-accent transition-all">114 George Street, Kenilworth, Johannesburg, 2190</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="border-t border-primary-foreground/20 mt-12 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-60">© 2026 World Changers Mental Health Care Organisation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
