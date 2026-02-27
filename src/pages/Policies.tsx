import { motion } from "framer-motion";
import { Shield, FileText, Lock, Eye, Scale, UserCheck, BookOpen, Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutBg from "@/assets/about-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const policies = [
  {
    icon: Lock,
    title: "Cybersecurity Policy",
    desc: "Our commitment to protecting digital infrastructure, data integrity, and safeguarding all stakeholder information against cyber threats.",
  },
  {
    icon: Scale,
    title: "Ethics Policy",
    desc: "Guiding principles for ethical conduct, professional responsibility, and maintaining the highest standards of integrity across all operations.",
  },
  {
    icon: Eye,
    title: "Information Disclosure Policy",
    desc: "Transparent guidelines on how organisational information is disclosed, ensuring accountability while protecting sensitive data.",
  },
  {
    icon: FileText,
    title: "Permission & Licensing Policy",
    desc: "Policies governing the use of intellectual property, licensing agreements, and permissions for content and resource usage.",
  },
  {
    icon: UserCheck,
    title: "Prevention of Sexual Exploitation Policy",
    desc: "Zero-tolerance approach to sexual exploitation and abuse, with clear reporting mechanisms and protective measures for all beneficiaries.",
  },
  {
    icon: BookOpen,
    title: "Terms of Use",
    desc: "The terms and conditions governing the use of our website, services, and digital platforms.",
  },
  {
    icon: Shield,
    title: "POPIA Compliance",
    desc: "Our compliance with the Protection of Personal Information Act, ensuring your personal data is collected, processed, and stored lawfully.",
  },
];

const documents = [
  { name: "Annual Financial Report 2024", type: "PDF" },
  { name: "Audited Financial Statements 2024", type: "PDF" },
  { name: "NPO Compliance Certificate", type: "PDF" },
  { name: "PBO Registration Certificate", type: "PDF" },
  { name: "B-BBEE Certificate", type: "PDF" },
  { name: "Tax Exemption Certificate", type: "PDF" },
];

const Policies = () => (
  <div>
    <PageHero title="Site Policies" subtitle="Transparency, compliance, and governance" bgImage={aboutBg} />

    {/* Policies Grid */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Governance" title="Our Policies" description="We are committed to the highest standards of transparency, ethics, and compliance." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((p, i) => (
            <motion.div key={p.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Financial & Compliance Documents */}
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <SectionHeading label="Documents" title="Financial & Compliance Documents" description="Access our official financial reports and compliance certificates. Contact us for document access." />
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {documents.map((doc, i) => (
              <motion.div key={doc.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-center justify-between p-5 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground">{doc.type} Document</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Secure</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            To request access to any document, please email{" "}
            <a href="mailto:info@worldchangersmh.org" className="text-primary hover:underline font-medium">info@worldchangersmh.org</a>
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Policies;
