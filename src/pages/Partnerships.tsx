import { useState } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Building2, Users, Heart, Handshake, Sparkles, Shield, ArrowRight, CheckCircle, Loader2, Send, Award, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import philanthropyBg from "@/assets/philanthropy-bg.jpg";

const DONATE_URL = "https://paystack.shop/pay/87qgnu5n8o";

const corporateOptions = [
  { value: "Corporate Sponsorship", key: "optCorporateSponsorship" },
  { value: "Strategic Collaboration", key: "optStrategicCollaboration" },
  { value: "Programme Funding", key: "optProgrammeFunding" },
  { value: "Strategic Alliances (Licensing & Co-Branding)", key: "optStrategicAlliances" },
  { value: "Workplace Giving & Employee Matching Gifts", key: "optWorkplaceGiving" },
  { value: "Cause-Related Marketing Campaigns", key: "optCauseRelatedMarketing" },
  { value: "Corporate Philanthropy", key: "optCorporatePhilanthropy" },
  { value: "Skills-Based Volunteering", key: "optSkillsBasedVolunteering" },
  { value: "Employee Wellness Partnerships", key: "optEmployeeWellness" },
  { value: "Other Partnership Opportunities", key: "optOtherPartnership" },
];

const individualOptions = [
  { icon: Heart, titleKey: "indMonthlyGivingTitle", descKey: "indMonthlyGivingDesc" },
  { icon: Users, titleKey: "indVolunteerTitle", descKey: "indVolunteerDesc" },
  { icon: Globe, titleKey: "indAmbassadorTitle", descKey: "indAmbassadorDesc" },
  { icon: TrendingUp, titleKey: "indFundraisingTitle", descKey: "indFundraisingDesc" },
  { icon: Sparkles, titleKey: "indEventSponsorshipTitle", descKey: "indEventSponsorshipDesc" },
  { icon: Award, titleKey: "indLegacyTitle", descKey: "indLegacyDesc" },
  { icon: Handshake, titleKey: "indPeerToPeerTitle", descKey: "indPeerToPeerDesc" },
  { icon: Shield, titleKey: "indSkillsTitle", descKey: "indSkillsDesc" },
  { icon: Building2, titleKey: "indAdvocacyTitle", descKey: "indAdvocacyDesc" },
];

const membershipBenefits = [
  "benefitSustainable",
  "benefitOutreach",
  "benefitEarlyAccess",
  "benefitDiscountedTickets",
  "benefitNewsletters",
  "benefitNetworking",
  "benefitRecognition",
];

const donationAmounts = [100, 200, 400, 500, 800, 1000];

const Partnerships = () => {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(500);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "", contact_person: "", email: "", phone: "", website: "",
    partnership_type: "", partnership_details: "", expected_outcomes: "",
  });

  const updateField = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleCorporateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const composedMessage =
        `Partnership Enquiry from ${form.company_name}\n\n` +
        `Company: ${form.company_name}\n` +
        `Contact Person: ${form.contact_person}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `Website: ${form.website || "—"}\n` +
        `Partnership Type: ${form.partnership_type}\n\n` +
        `Proposed Partnership Details:\n${form.partnership_details}\n\n` +
        `Expected Outcomes:\n${form.expected_outcomes}`;

      const payload = {
        full_name: `${form.contact_person} (${form.company_name})`.slice(0, 100),
        email: form.email.trim(),
        subject: `Corporate Partnership Enquiry — ${form.partnership_type}`.slice(0, 200),
        message: composedMessage,
      };

      const { error } = await supabase.from("contact_messages").insert(payload);
      if (error) throw error;
      setSubmitted(true);
      toast.success(t("partnerships.toastSuccess"));
      supabase.functions.invoke("send-contact-notification", { body: payload }).catch(console.warn);
    } catch (err: any) {
      console.error(err);
      toast.error(t("partnerships.toastError"));
    } finally {
      setLoading(false);
    }
  };

  const activeAmount = selectedAmount === "custom" ? Number(customAmount) || 0 : selectedAmount;

  return (
    <div>
      <SEO
        title={t("partnerships.seoTitle")}
        description={t("partnerships.seoDescription")}
        path="/partnerships"
      />
      <PageHero
        title={t("partnerships.heroTitle")}
        subtitle={t("partnerships.heroSubtitle")}
        bgImage={philanthropyBg}
      />

      {/* Intro */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are a business, foundation, community organisation, or individual supporter, your partnership helps us expand access to mental health services,
            community development programmes, education initiatives, and sustainable social change. Together, we can build healthier, stronger, and more empowered communities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
              <a href="#corporate-form">{t("partnerships.introBecomePartner")} <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="#individual">{t("partnerships.introSupportIndividual")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CORPORATE SECTION */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            label={t("partnerships.corporateLabel")}
            title={t("partnerships.corporateTitle")}
            description={t("partnerships.corporateDescription")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
            {corporateOptions.map((opt, i) => (
              <motion.div
                key={opt.value}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-card rounded-xl p-4 shadow-soft border border-border flex items-start gap-2"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{t(`partnerships.${opt.key}`)}</span>
              </motion.div>
            ))}
          </div>

          <div id="corporate-form" className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t("partnerships.formTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t("partnerships.formSubmitPrefix")}{" "}
                <a href="mailto:info@worldchangersmh.org" className="text-primary underline">info@worldchangersmh.org</a>.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-foreground mb-2">{t("partnerships.enquiryReceivedTitle")}</h4>
                  <p className="text-muted-foreground">{t("partnerships.enquiryReceivedText")}</p>
                </div>
              ) : (
                <form onSubmit={handleCorporateSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formCompanyLabel")}</label>
                      <Input required value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} maxLength={150} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formContactLabel")}</label>
                      <Input required value={form.contact_person} onChange={(e) => updateField("contact_person", e.target.value)} maxLength={100} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formEmailLabel")}</label>
                      <Input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} maxLength={255} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formPhoneLabel")}</label>
                      <Input type="tel" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} maxLength={30} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formWebsiteLabel")}</label>
                    <Input type="url" placeholder="https://" value={form.website} onChange={(e) => updateField("website", e.target.value)} maxLength={255} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formPartnershipTypeLabel")}</label>
                    <select
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={form.partnership_type}
                      onChange={(e) => updateField("partnership_type", e.target.value)}
                    >
                      <option value="">{t("partnerships.formSelectPlaceholder")}</option>
                      {corporateOptions.map((o) => (
                        <option key={o.value} value={o.value}>{t(`partnerships.${o.key}`)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formDetailsLabel")}</label>
                    <Textarea required rows={4} maxLength={3000} value={form.partnership_details} onChange={(e) => updateField("partnership_details", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.formOutcomesLabel")}</label>
                    <Textarea required rows={3} maxLength={2000} value={form.expected_outcomes} onChange={(e) => updateField("expected_outcomes", e.target.value)} />
                  </div>
                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("partnerships.formSubmitting")}</> : <>{t("partnerships.formSubmit")} <ArrowRight className="w-4 h-4 ml-2" /></>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INDIVIDUAL SECTION */}
      <section id="individual" className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            label={t("partnerships.individualLabel")}
            title={t("partnerships.individualTitle")}
            description={t("partnerships.individualDescription")}
          />

          {/* Membership */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Users className="w-6 h-6 text-primary" /></div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{t("partnerships.membershipTitle")}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t("partnerships.membershipIntro")}
              </p>
              <ul className="space-y-2 mb-6">
                {membershipBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {t(`partnerships.${b}`)}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">{t("partnerships.membershipCta")} <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Heart className="w-6 h-6 text-primary" /></div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{t("partnerships.oneTimeTitle")}</h3>
              </div>
              <p className="text-muted-foreground">
                {t("partnerships.oneTimeText")}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t("partnerships.oneTimeSubtext")}
              </p>
            </motion.div>
          </div>

          {/* Donation Interface */}
          <div className="max-w-3xl mx-auto bg-card rounded-3xl p-6 sm:p-10 shadow-elevated border border-border">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> {t("partnerships.donateSecureBadge")}
              </span>
              <h3 className="font-heading text-3xl font-bold text-foreground mt-3">{t("partnerships.donateTitle")}</h3>
              <p className="text-muted-foreground mt-2">{t("partnerships.donateSubtitle")}</p>
            </div>

            {/* Frequency toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-muted rounded-full p-1">
                {(["once", "monthly"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                      frequency === f ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f === "once" ? t("partnerships.freqOnce") : t("partnerships.freqMonthly")}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {donationAmounts.map((amt) => {
                const active = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`rounded-2xl border-2 py-6 px-4 text-center transition-all ${
                      active
                        ? "border-primary bg-primary/5 shadow-soft scale-[1.02]"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <p className={`font-heading text-2xl font-bold ${active ? "text-primary" : "text-foreground"}`}>R{amt.toLocaleString()}</p>
                    {amt === 500 && <p className="text-[10px] uppercase tracking-wider text-accent mt-1">{t("partnerships.amountMostPopular")}</p>}
                  </button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("partnerships.customAmountLabel")}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R</span>
                <Input
                  type="number"
                  min={1}
                  placeholder={t("partnerships.customAmountPlaceholder")}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount("custom"); }}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-muted rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("partnerships.summaryLabel")}</p>
                <p className="font-heading text-2xl font-bold text-foreground">
                  R{activeAmount.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ {frequency === "monthly" ? t("partnerships.summaryMonth") : t("partnerships.summaryOnce")}</span>
                </p>
              </div>
              <Shield className="w-8 h-8 text-primary/40" />
            </div>

            <Button asChild size="lg" disabled={activeAmount <= 0} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base">
              <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">
                {t("partnerships.continueCheckout")} <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              {t("partnerships.redirectNote")}
            </p>
          </div>

          {/* Individual partnership options */}
          <div className="mt-20">
            <SectionHeading label={t("partnerships.moreWaysLabel")} title={t("partnerships.moreWaysTitle")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {individualOptions.map((o, i) => (
                <motion.div
                  key={o.titleKey}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <o.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-2">{t(`partnerships.${o.titleKey}`)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`partnerships.${o.descKey}`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnerships;
