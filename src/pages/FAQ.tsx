import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import aboutBg from "@/assets/about-bg.jpg";

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = Array.from({ length: 14 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>

      <SEO title="Frequently Asked Questions — World Changers MHCO" description="Answers to common questions about World Changers programs, donations, volunteering and mental health services." path="/faq" jsonLd={faqJsonLd} />
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
