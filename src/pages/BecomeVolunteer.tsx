import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Clock, Award, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { useTranslation } from "react-i18next";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const BecomeVolunteer = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", date_of_birth: "", city: "", address: "",
    area_of_interest: "", availability: "", previous_experience: "", motivation: "", special_skills: "",
    emergency_contact_name: "", emergency_contact_phone: "",
  });

  const benefits = [
    { icon: Heart, title: t("volunteer.makeImpact"), desc: t("volunteer.makeImpactDesc") },
    { icon: Users, title: t("volunteer.joinCommunity"), desc: t("volunteer.joinCommunityDesc") },
    { icon: Clock, title: t("volunteer.flexibleHours"), desc: t("volunteer.flexibleHoursDesc") },
    { icon: Award, title: t("volunteer.gainExperience"), desc: t("volunteer.gainExperienceDesc") },
  ];

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("volunteer_applications").insert({
        first_name: form.first_name.trim(), last_name: form.last_name.trim(), email: form.email.trim(),
        phone: form.phone.trim(), date_of_birth: form.date_of_birth || null, city: form.city.trim() || null,
        address: form.address.trim() || null, area_of_interest: form.area_of_interest, availability: form.availability,
        previous_experience: form.previous_experience.trim() || null, motivation: form.motivation.trim(),
        special_skills: form.special_skills.trim() || null, emergency_contact_name: form.emergency_contact_name.trim() || null,
        emergency_contact_phone: form.emergency_contact_phone.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success(t("volunteer.applicationSubmitted"));
      supabase.functions.invoke("send-volunteer-notification", { body: form }).catch(console.warn);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to submit application. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div>
      <PageHero title={t("volunteer.heroTitle")} subtitle={t("volunteer.heroSubtitle")} bgImage={philanthropyBg} />

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label={t("volunteer.whyVolunteerLabel")} title={t("volunteer.whyVolunteerTitle")} />
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

      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeading label={t("volunteer.applicationLabel")} title={t("volunteer.applicationTitle")} description={t("volunteer.applicationDesc")} />
            {submitted ? (
              <div className="bg-card rounded-2xl p-12 shadow-card text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t("volunteer.applicationSubmitted")}</h3>
                <p className="text-muted-foreground">{t("volunteer.applicationSubmittedDesc")}</p>
              </div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-6">
                
                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3">{t("volunteer.personalInfo")}</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.fullName").split(" ")[0]} *</label>
                    <Input placeholder="John" required value={form.first_name} onChange={(e) => updateField("first_name", e.target.value)} maxLength={100} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                    <Input placeholder="Doe" required value={form.last_name} onChange={(e) => updateField("last_name", e.target.value)} maxLength={100} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.emailLabel")} *</label>
                    <Input type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => updateField("email", e.target.value)} maxLength={255} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.phone")} *</label>
                    <Input type="tel" placeholder="+27 75 452 4052" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} maxLength={30} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Date of Birth</label>
                    <Input type="date" value={form.date_of_birth} onChange={(e) => updateField("date_of_birth", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">City / Town</label>
                    <Input placeholder="Johannesburg" value={form.city} onChange={(e) => updateField("city", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.address")}</label>
                  <Input placeholder="114 George Street, Kenilworth, Johannesburg, 2190" value={form.address} onChange={(e) => updateField("address", e.target.value)} />
                </div>

                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3 pt-4">{t("volunteer.volunteerDetails")}</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Area of Interest *</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={form.area_of_interest} onChange={(e) => updateField("area_of_interest", e.target.value)}>
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
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={form.availability} onChange={(e) => updateField("availability", e.target.value)}>
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
                  <Textarea placeholder="Describe any relevant experience..." rows={3} value={form.previous_experience} onChange={(e) => updateField("previous_experience", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Why do you want to volunteer with us? *</label>
                  <Textarea placeholder="Tell us about your motivation..." rows={4} required value={form.motivation} onChange={(e) => updateField("motivation", e.target.value)} maxLength={2000} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Special Skills or Qualifications</label>
                  <Textarea placeholder="Languages spoken, certifications, etc." rows={3} value={form.special_skills} onChange={(e) => updateField("special_skills", e.target.value)} />
                </div>

                <h4 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3 pt-4">{t("volunteer.emergencyContact")}</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Emergency Contact Name</label>
                    <Input placeholder="Full name" value={form.emergency_contact_name} onChange={(e) => updateField("emergency_contact_name", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Emergency Contact Phone</label>
                    <Input type="tel" placeholder="+27 ..." value={form.emergency_contact_phone} onChange={(e) => updateField("emergency_contact_phone", e.target.value)} />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" required className="mt-1 rounded border-input" />
                  <label className="text-sm text-muted-foreground">I agree to the terms and conditions and understand that my information will be used for volunteer coordination purposes only.</label>
                </div>

                <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90" disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : <>{t("common.submitApplication")} <ArrowRight className="w-4 h-4 ml-2" /></>}
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