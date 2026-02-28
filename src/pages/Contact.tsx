import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/PageHero";
import VoiceAgent from "@/components/VoiceAgent";
import aboutBg from "@/assets/about-bg.jpg";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+27 75 452 4052", href: "tel:+27754524052" },
  { icon: Mail, label: "Email", value: "info@worldchangersmh.org", href: "mailto:info@worldchangersmh.org" },
  { icon: MapPin, label: "Address", value: "114 George Street, Kenilworth, Johannesburg, 2190", href: "https://maps.google.com/?q=114+George+Street,+Kenilworth,+Johannesburg,+2190" },
  { icon: Clock, label: "Hours", value: "Mon – Fri: 8AM – 6PM", href: undefined },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you" bgImage={aboutBg} />

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-foreground">Get In Touch</h3>
              <p className="text-muted-foreground">Whether you need help, want to volunteer, or wish to donate, we're here for you.</p>
              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.label === "Address" ? "_blank" : undefined} rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Voice Agent */}
              <div className="mt-6 p-5 rounded-xl bg-muted border border-border">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-2">Talk to Our AI Agent</h4>
                <p className="text-sm text-muted-foreground mb-4">Get instant answers about our services, booking, and more.</p>
                <VoiceAgent variant="button" />
              </div>
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-3 bg-card rounded-2xl p-8 shadow-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                      <Input placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <Input type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                    <Input placeholder="How can we help?" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea placeholder="Tell us more..." rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-8">Stay updated with our latest news, events, and mental health resources delivered straight to your inbox.</p>
            {newsletterSubmitted ? (
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <p className="text-primary font-semibold">Thank you for subscribing! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-hero-gradient text-primary-foreground hover:opacity-90 px-8">
                  Subscribe <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="pb-0">
        <div className="container mx-auto px-4 mb-10">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Location</span>
            <h2 className="font-heading text-3xl font-bold text-foreground mt-2">Find Us On The Map</h2>
          </div>
        </div>
        <div className="w-full h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.4!2d28.0456!3d-26.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s114+George+Street%2C+Kenilworth%2C+Johannesburg%2C+2190!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="World Changers MHC Location"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
