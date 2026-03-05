import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Users, Sparkles, HeartPulse, Leaf, Activity, Stethoscope, BookOpen, HandHeart, Presentation, CalendarDays, Clock, X, Mic, Play, Phone } from "lucide-react";
import { format } from "date-fns";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import VoiceAgent from "@/components/VoiceAgent";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import mentalHealthBg from "@/assets/mental-health-bg.jpg";
import prof1 from "@/assets/professional-1.jpg";
import prof2 from "@/assets/professional-2.jpg";
import prof3 from "@/assets/professional-3.jpg";

const programs = [
  { icon: Brain, title: "Cognitive Behavioral Therapy", desc: "Evidence-based approach to treating anxiety, depression, and other mental health conditions through structured therapeutic sessions." },
  { icon: Shield, title: "Trauma & PTSD Recovery", desc: "Specialized programs using EMDR and trauma-focused therapy to help survivors reclaim their lives." },
  { icon: Users, title: "Family & Couples Counseling", desc: "Strengthening relationships through guided communication, conflict resolution, and emotional support." },
  { icon: Sparkles, title: "Mindfulness & Stress Relief", desc: "Meditation, breathing exercises, and mindfulness practices for daily mental wellness." },
  { icon: HeartPulse, title: "Substance Abuse Support", desc: "Holistic recovery programs addressing the root causes of addiction with compassion." },
  { icon: Leaf, title: "Youth & Adolescent Care", desc: "Age-appropriate interventions for children and teens navigating emotional and behavioral challenges." },
  { icon: Activity, title: "Crisis Intervention", desc: "24/7 emergency mental health support for individuals in acute distress or danger." },
  { icon: Stethoscope, title: "Psychiatric Evaluation", desc: "Comprehensive diagnostic assessments to identify conditions and create personalized treatment plans." },
  { icon: BookOpen, title: "Psychoeducation Workshops", desc: "Community-based educational programs to build awareness and reduce mental health stigma." },
  { icon: HandHeart, title: "Grief & Loss Counseling", desc: "Compassionate support helping individuals navigate bereavement and life transitions." },
  { icon: Presentation, title: "Conferencing", desc: "Professional conferencing for workspaces and educational institutions to foster collaboration and promote organizational wellbeing." },
  { icon: BookOpen, title: "Mental Health Seminars", desc: "Structured seminars for workspaces and educational institutions to promote mental wellbeing, resilience, and awareness in organizational settings." },
];

const professionals = [
  {
    name: "Dr. Sarah Mitchell", role: "Clinical Psychologist", specialty: "Anxiety & Depression", image: prof1,
    bio: "Dr. Sarah Mitchell is a registered Clinical Psychologist with over 12 years of experience specialising in anxiety disorders, clinical depression, and mood regulation. She holds a PhD in Clinical Psychology from the University of Cape Town and is trained in Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and Acceptance and Commitment Therapy (ACT). Dr. Mitchell has published extensively on anxiety management in African contexts and is passionate about culturally sensitive mental health care.",
    days: ["Monday", "Tuesday", "Wednesday"], times: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    name: "Dr. James Hartwell", role: "Psychiatrist", specialty: "Trauma & PTSD", image: prof2,
    bio: "Dr. James Hartwell is a board-certified Psychiatrist with 15 years of clinical experience in trauma recovery, PTSD, and complex dissociative disorders. He completed his medical degree at the University of the Witwatersrand and trained in psychopharmacology and trauma-focused interventions. Dr. Hartwell works extensively with survivors of violence, abuse, and displacement, combining medication management with evidence-based psychotherapy for holistic healing.",
    days: ["Monday", "Wednesday", "Friday"], times: ["09:00", "10:00", "11:00", "12:00"],
  },
  {
    name: "Dr. Amara Osei", role: "Licensed Counselor", specialty: "Family Therapy", image: prof3,
    bio: "Dr. Amara Osei is a Licensed Professional Counselor (LPC) with a Master's in Marriage and Family Therapy. With 10 years of experience, she specialises in systemic family therapy, couples counseling, and intergenerational trauma. Dr. Osei is certified in Emotionally Focused Therapy (EFT) and the Gottman Method, helping families and couples restore connection, trust, and communication in their relationships.",
    days: ["Tuesday", "Thursday", "Friday"], times: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  },
  {
    name: "Dr. Linda Khumalo", role: "Neuropsychologist", specialty: "Cognitive Disorders", image: prof1,
    bio: "Dr. Linda Khumalo is a Neuropsychologist specialising in cognitive assessment, brain injury rehabilitation, and neurodevelopmental disorders. With over 14 years of experience, she conducts comprehensive neuropsychological evaluations and designs cognitive rehabilitation programs. Dr. Khumalo holds a PhD from Stellenbosch University and is a member of the South African Clinical Neuropsychological Association.",
    days: ["Monday", "Tuesday", "Thursday"], times: ["09:00", "10:00", "11:00", "14:00"],
  },
  {
    name: "Dr. Michael Chen", role: "Child Psychiatrist", specialty: "Youth Mental Health", image: prof2,
    bio: "Dr. Michael Chen is a Child and Adolescent Psychiatrist with 11 years of experience treating ADHD, autism spectrum disorders, childhood anxiety, and behavioral challenges. He uses a developmental approach combining play therapy, family systems work, and pharmacological support when indicated. Dr. Chen is a strong advocate for early intervention and school-based mental health programs.",
    days: ["Monday", "Wednesday", "Thursday"], times: ["09:00", "10:00", "13:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Fatima Al-Rashid", role: "Clinical Psychologist", specialty: "OCD & Phobias", image: prof3,
    bio: "Dr. Fatima Al-Rashid is a Clinical Psychologist specialising in Obsessive-Compulsive Disorder (OCD), specific phobias, and anxiety-related conditions. She is extensively trained in Exposure and Response Prevention (ERP) therapy and Virtual Reality Exposure Therapy (VRET). With 9 years of clinical practice, Dr. Al-Rashid has helped hundreds of clients overcome debilitating fears and compulsions.",
    days: ["Tuesday", "Wednesday", "Friday"], times: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Robert Ndlovu", role: "Addiction Specialist", specialty: "Substance Abuse", image: prof1,
    bio: "Dr. Robert Ndlovu is a certified Addiction Medicine Specialist with over 16 years of experience in substance abuse treatment, detoxification management, and relapse prevention. He combines motivational interviewing, 12-step facilitation, and trauma-informed care to address the root causes of addiction. Dr. Ndlovu has established several community-based recovery programs across South Africa.",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"], times: ["09:00", "10:00", "11:00"],
  },
  {
    name: "Dr. Emily Torres", role: "Trauma Therapist", specialty: "EMDR Therapy", image: prof2,
    bio: "Dr. Emily Torres is a specialised Trauma Therapist and certified EMDR (Eye Movement Desensitization and Reprocessing) practitioner with 8 years of experience. She works with survivors of abuse, accident trauma, and combat-related PTSD. Dr. Torres also practices Somatic Experiencing and Brainspotting, offering clients multiple pathways to trauma resolution and emotional regulation.",
    days: ["Wednesday", "Thursday", "Friday"], times: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    name: "Dr. David Moyo", role: "Forensic Psychologist", specialty: "Behavioral Analysis", image: prof3,
    bio: "Dr. David Moyo is a Forensic Psychologist with 13 years of experience in criminal behavioural profiling, risk assessment, and court-mandated psychological evaluations. He holds a PhD in Forensic Psychology and works at the intersection of mental health and the justice system. Dr. Moyo also provides expert testimony and consultation for legal proceedings.",
    days: ["Monday", "Thursday", "Friday"], times: ["09:00", "11:00", "13:00", "14:00"],
  },
  {
    name: "Dr. Priya Sharma", role: "Psychiatrist", specialty: "Bipolar Disorder", image: prof1,
    bio: "Dr. Priya Sharma is a Psychiatrist with expertise in bipolar disorder, schizoaffective disorder, and treatment-resistant depression. With 12 years of clinical experience, she specialises in complex medication management, mood stabilisation, and psychoeducation for patients and their families. Dr. Sharma is known for her integrative approach combining pharmacotherapy with lifestyle interventions.",
    days: ["Tuesday", "Wednesday", "Thursday"], times: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Nathan Brooks", role: "Geriatric Psychiatrist", specialty: "Elderly Care", image: prof2,
    bio: "Dr. Nathan Brooks is a Geriatric Psychiatrist dedicated to the mental health of older adults. With 14 years of experience, he manages conditions including dementia-related behavioral issues, late-life depression, anxiety, and delirium. Dr. Brooks works closely with families and care facilities to ensure comprehensive, dignified mental health care for the elderly.",
    days: ["Monday", "Tuesday", "Friday"], times: ["09:00", "10:00", "11:00", "14:00"],
  },
  {
    name: "Dr. Grace Okonkwo", role: "Licensed Counselor", specialty: "Grief Counseling", image: prof3,
    bio: "Dr. Grace Okonkwo is a Licensed Grief Counselor with a Master's in Bereavement Studies and 10 years of experience. She specialises in helping individuals process loss through death, divorce, miscarriage, and significant life transitions. Dr. Okonkwo facilitates individual sessions, grief support groups, and workplace bereavement programs using narrative therapy and meaning-making approaches.",
    days: ["Monday", "Wednesday", "Thursday"], times: ["10:00", "11:00", "13:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Thomas Weber", role: "Clinical Psychologist", specialty: "Stress Management", image: prof1,
    bio: "Dr. Thomas Weber is a Clinical Psychologist specialising in occupational stress, burnout prevention, and corporate wellness. With 11 years of practice, he offers executive coaching, stress management workshops, and individual therapy for professionals under high pressure. Dr. Weber is certified in Mindfulness-Based Stress Reduction (MBSR) and biofeedback therapy.",
    days: ["Tuesday", "Thursday", "Friday"], times: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    name: "Dr. Aisha Patel", role: "Psychotherapist", specialty: "Eating Disorders", image: prof2,
    bio: "Dr. Aisha Patel is a Psychotherapist specialising in eating disorders including anorexia nervosa, bulimia, binge eating disorder, and body dysmorphia. With 9 years of clinical experience, she uses a multi-disciplinary approach combining CBT-E (Enhanced Cognitive Behavioral Therapy), nutritional counseling coordination, and body image work. Dr. Patel is passionate about recovery-focused care.",
    days: ["Monday", "Wednesday", "Friday"], times: ["10:00", "11:00", "12:00", "14:00"],
  },
  {
    name: "Dr. Carlos Rivera", role: "Psychiatrist", specialty: "Schizophrenia", image: prof3,
    bio: "Dr. Carlos Rivera is a Psychiatrist with 17 years of experience managing schizophrenia, psychotic disorders, and severe mental illness. He specialises in antipsychotic medication management, early psychosis intervention, and community-based psychiatric rehabilitation. Dr. Rivera is committed to reducing the stigma around psychotic disorders and improving patient autonomy.",
    days: ["Monday", "Tuesday", "Thursday"], times: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Hannah Müller", role: "Art Therapist", specialty: "Expressive Therapy", image: prof1,
    bio: "Dr. Hannah Müller is a registered Art Therapist with 8 years of experience using creative expression as a therapeutic tool. She works with trauma survivors, children, and individuals with developmental disabilities, using visual arts, music, and movement to facilitate healing. Dr. Müller holds a Master's in Art Therapy and is certified in Trauma-Informed Expressive Arts Therapy.",
    days: ["Tuesday", "Wednesday", "Friday"], times: ["10:00", "11:00", "13:00", "14:00"],
  },
  {
    name: "Dr. Solomon Adebayo", role: "Licensed Counselor", specialty: "Cultural Psychology", image: prof2,
    bio: "Dr. Solomon Adebayo is a Licensed Counselor specialising in cultural and cross-cultural psychology with 12 years of experience. He addresses the mental health needs of immigrant communities, refugees, and individuals navigating cultural identity challenges. Dr. Adebayo integrates indigenous African healing practices with Western psychotherapy approaches for culturally responsive care.",
    days: ["Monday", "Thursday", "Friday"], times: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    name: "Dr. Jessica Park", role: "Clinical Psychologist", specialty: "Sleep Disorders", image: prof3,
    bio: "Dr. Jessica Park is a Clinical Psychologist specialising in sleep disorders, insomnia, and circadian rhythm disturbances. With 10 years of experience, she is trained in Cognitive Behavioral Therapy for Insomnia (CBT-I) and collaborates with sleep medicine physicians for comprehensive care. Dr. Park helps clients improve their sleep quality through evidence-based behavioral interventions.",
    days: ["Tuesday", "Wednesday", "Thursday"], times: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    name: "Dr. André Dupont", role: "Psychopharmacologist", specialty: "Medication Management", image: prof1,
    bio: "Dr. André Dupont is a Psychopharmacologist with 15 years of experience in psychiatric medication management, drug interactions, and treatment-resistant conditions. He provides comprehensive medication consultations, reviews, and ongoing pharmacological management for complex psychiatric cases. Dr. Dupont works collaboratively with therapists to ensure integrated treatment plans.",
    days: ["Monday", "Wednesday", "Friday"], times: ["09:00", "10:00", "11:00", "12:00"],
  },
  {
    name: "Dr. Zara Mahlangu", role: "Community Psychologist", specialty: "Social Wellbeing", image: prof2,
    bio: "Dr. Zara Mahlangu is a Community Psychologist with 11 years of experience in social wellbeing, community mental health, and participatory action research. She develops and implements community-based mental health programs, facilitates support groups, and advocates for mental health policy reform. Dr. Mahlangu is dedicated to making psychology accessible to underserved populations across South Africa.",
    days: ["Tuesday", "Thursday", "Friday"], times: ["10:00", "11:00", "13:00", "14:00", "15:00"],
  },
];

const sessionTypes = ["Individual Counseling", "Couples Counseling", "Family Counseling", "Grief & Loss Counseling"];

const youtubeVideos = [
  { id: "ItqioUkMwNo", title: "Mental Health Awareness" },
  { id: "Ikzz2LWJytg", title: "Community Wellbeing" },
  { id: "Gg5fwSKUNqM", title: "Healing Through Care" },
  { id: "-NMrS9pg1ZY", title: "Mental Health Short" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const MentalHealth = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const selectedProfessional = professionals.find((p) => p.name === selectedProvider);
  const availableDays = selectedProfessional?.days || [];
  const availableTimes = selectedProfessional?.times || [];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div>
      <PageHero title="Mental Health Care" subtitle="Specialized programs and professionals dedicated to your wellbeing" bgImage={mentalHealthBg} />

      {/* Programs */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Our Programs" title="Comprehensive Care Pathways" description="We provide a full spectrum of mental health services tailored to individual needs." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <motion.div key={p.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all border border-border group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-hero-gradient transition-all">
                  <p.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call Now + Book Session - Side by Side */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Call Now */}
            <div className="text-center bg-muted rounded-2xl p-8 border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Call Now</h2>
              <p className="text-muted-foreground mb-6">Speak to our receptionist instantly for questions, scheduling, or support.</p>
              <VoiceAgent variant="button" />
            </div>

            {/* Book Session */}
            <div className="text-center bg-muted rounded-2xl p-8 border border-border">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Book a Session</h2>
              <p className="text-muted-foreground mb-6">Schedule a 60-minute counseling session with your preferred provider below.</p>
              <Button onClick={() => setBookingOpen(true)} size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <CalendarDays className="w-5 h-5 mr-2" /> Open Booking Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar Modal */}
      {bookingOpen && (
        <section className="section-padding bg-muted">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border relative">
              <button onClick={() => { setBookingOpen(false); setBookingSubmitted(false); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              {bookingSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">We'll send a confirmation to your email. Your 60-minute {sessionType} session with {selectedProvider} is scheduled for {date && format(date, "PPP")} at {time}.</p>
                  <Button onClick={() => { setBookingSubmitted(false); setDate(undefined); setTime(""); setSessionType(""); setSelectedProvider(""); }}
                    variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Book Another Session
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Schedule Your Session</h3>
                  <p className="text-sm text-muted-foreground mb-4">All sessions are 60 minutes. Select your preferred provider to see their availability.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                      <Input placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <Input type="email" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                    <Input type="tel" placeholder="+27 XX XXX XXXX" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Provider</label>
                    <Select value={selectedProvider} onValueChange={(val) => { setSelectedProvider(val); setDate(undefined); setTime(""); }}>
                      <SelectTrigger><SelectValue placeholder="Select a provider" /></SelectTrigger>
                      <SelectContent>
                        {professionals.map((p) => (
                          <SelectItem key={p.name} value={p.name}>{p.name} — {p.specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Session Type</label>
                    <Select value={sessionType} onValueChange={setSessionType} required>
                      <SelectTrigger><SelectValue placeholder="Select session type" /></SelectTrigger>
                      <SelectContent>
                        {sessionTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProvider && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Preferred Date <span className="text-xs text-muted-foreground">({selectedProfessional?.days.join(", ")})</span>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single" selected={date} onSelect={setDate}
                              disabled={(d) => {
                                if (d < new Date()) return true;
                                const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
                                return !availableDays.includes(dayName);
                              }}
                              initialFocus className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Time</label>
                        <div className="grid grid-cols-4 gap-2">
                          {availableTimes.map((slot) => (
                            <button key={slot} type="button" onClick={() => setTime(slot)}
                              className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                                time === slot ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"
                              )}>
                              <Clock className="w-3 h-3 inline mr-1" />{slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Brief Reason for Visit</label>
                    <Textarea placeholder="Please briefly describe the reason for your visit..." rows={3} required />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90"
                    disabled={!date || !time || !sessionType || !selectedProvider}>
                    Confirm Booking
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Professionals */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Our Professionals" title="Meet the Experts Who Care" description="Review our providers below and choose your preferred professional when booking." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((p, i) => (
              <motion.div key={p.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border group">
                <div className="flex items-start gap-4 p-5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-semibold text-foreground">{p.name}</h3>
                    <p className="text-primary text-sm font-medium mt-0.5">{p.role}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{p.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">Available:</span> {p.days.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <p className={cn("text-sm text-muted-foreground leading-relaxed", expandedBio !== p.name && "line-clamp-3")}>
                    {p.bio}
                  </p>
                  <button onClick={() => setExpandedBio(expandedBio === p.name ? null : p.name)}
                    className="text-xs text-primary font-medium mt-2 hover:underline">
                    {expandedBio === p.name ? "Show Less" : "Read Full Bio"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Watch & Learn" title="Mental Health Videos" description="Educational videos on mental health awareness and wellbeing." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeVideos.map((video, i) => (
              <motion.div key={video.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-xl overflow-hidden shadow-soft border border-border bg-card">
                <div className="aspect-video">
                  <iframe src={`https://www.youtube.com/embed/${video.id}`} title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2"><Play className="w-3.5 h-3.5 text-primary" /> {video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentalHealth;
