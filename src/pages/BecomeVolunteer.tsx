import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Clock, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const benefits = [
  { icon: Heart, title: "Make a Real Impact", desc: "Help transform lives in communities that need it most." },
  { icon: Users, title: "Join a Community", desc: "Connect with like-minded people passionate about mental health." },
  { icon: Clock, title: "Flexible Hours", desc: "Volunteer on your schedule — weekdays, weekends, or virtually." },
  { icon: Award, title: "Gain Experience", desc: "Build valuable skills and receive certification for your work." },
];

const BecomeVolunteer = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHero title="Become a Volunteer" subtitle="Join us in creating a world where mental health care is accessible to all" bgImage={philanthropyBg} />

      {/* Why Volunteer */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Why Volunteer" title="Be Part of the Change" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-soft">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Application Form */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeading label="Application Form" title="Volunteer Registration" description="Complete the form below and our team coordinator will contact you within 48 hours." />
            {submitted ? (
              <div className="bg-card rounded-2xl p-12 shadow-card text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground">Thank you for your interest. We'll review your application and get back to you shortly.</p>
              </div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="bg-card rounded-2xl p-8 shadow-card space-y-6">
                
                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3">Personal Information</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                    <Input placeholder="John" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address *</label>
                    <Input type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                    <Input type="tel" placeholder="+27 75 452 4052" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Date of Birth</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">City / Town</label>
                    <Input placeholder="Johannesburg" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
                  <Input placeholder="114 George Street, Kenilworth, Johannesburg, 2190" />
                </div>

                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3 pt-4">Volunteer Details</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Area of Interest *</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                      <option value="">Select an area</option>
                      <option>Mental Health Outreach</option>
                      <option>Community Counseling</option>
                      <option>Youth Programs</option>
                      <option>Fundraising & Events</option>
                      <option>Administrative Support</option>
                      <option>Social Media & Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Availability *</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                      <option value="">Select availability</option>
                      <option>Weekdays (Morning)</option>
                      <option>Weekdays (Afternoon)</option>
                      <option>Weekends</option>
                      <option>Evenings</option>
                      <option>Flexible / Remote</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Previous Volunteer Experience</label>
                  <Textarea placeholder="Describe any relevant experience..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Why do you want to volunteer with us? *</label>
                  <Textarea placeholder="Tell us about your motivation and what you hope to contribute..." rows={4} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Special Skills or Qualifications</label>
                  <Textarea placeholder="Languages spoken, certifications, etc." rows={3} />
                </div>

                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3 pt-4">Emergency Contact</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Emergency Contact Name</label>
                    <Input placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Emergency Contact Phone</label>
                    <Input type="tel" placeholder="+27 ..." />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" required className="mt-1 rounded border-input" />
                  <label className="text-sm text-muted-foreground">I agree to the terms and conditions and understand that my information will be used for volunteer coordination purposes only.</label>
                </div>

                <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                  Submit Application <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeVolunteer;
