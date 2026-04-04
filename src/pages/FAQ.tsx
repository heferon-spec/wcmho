import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import aboutBg from "@/assets/about-bg.jpg";

const faqs = [
  { q: "What services does World Changers offer?", a: "We provide a full range of mental health services including individual therapy, group counseling, family therapy, trauma recovery, and community wellness programs." },
  { q: "How can I schedule a session?", a: "You can schedule a session through our Contact page, call us directly, or click 'Schedule a Session' on any professional's profile on our Mental Health page." },
  { q: "Do you offer free services?", a: "Yes! We offer free drop-in counseling, community workshops, and support groups. Our philanthropic initiatives ensure care is accessible to everyone." },
  { q: "How can I donate?", a: "Donations can be made through our Contact page or by reaching out directly. We accept one-time and recurring donations to support our programs." },
  { q: "Can I volunteer remotely?", a: "Absolutely! We have virtual volunteer opportunities including online peer support, content creation, and fundraising campaigns." },
  { q: "Is my information kept confidential?", a: "Yes. All client information is strictly confidential and protected under HIPAA regulations and international privacy standards." },
  { q: "Do you accept insurance?", a: "We work with various insurance providers. Please contact us with your insurance details and we'll help verify your coverage." },
  { q: "How can organizations partner with you?", a: "We welcome partnerships with schools, businesses, and NGOs. Reach out via our Contact page to discuss collaboration opportunities." },
];

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero title={t("faq.heroTitle")} subtitle={t("faq.heroSubtitle")} bgImage={aboutBg} />
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading label={t("faq.questionsLabel")} title={t("faq.questionsTitle")} />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6 shadow-soft">
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default FAQ;