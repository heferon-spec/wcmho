import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Users, Sparkles, HeartPulse, Leaf, Activity, Stethoscope, BookOpen, HandHeart, Presentation, CalendarDays, Clock, X, Mic } from "lucide-react";
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
{ icon: BookOpen, title: "Mental Health Seminars", desc: "Structured seminars for workspaces and educational institutions to promote mental wellbeing, resilience, and awareness in organizational settings." }];


const professionals = [
{ name: "Dr. Sarah Mitchell", role: "Clinical Psychologist", specialty: "Anxiety & Depression", image: prof1 },
{ name: "Dr. James Hartwell", role: "Psychiatrist", specialty: "Trauma & PTSD", image: prof2 },
{ name: "Dr. Amara Osei", role: "Licensed Counselor", specialty: "Family Therapy", image: prof3 },
{ name: "Dr. Linda Khumalo", role: "Neuropsychologist", specialty: "Cognitive Disorders", image: prof1 },
{ name: "Dr. Michael Chen", role: "Child Psychiatrist", specialty: "Youth Mental Health", image: prof2 },
{ name: "Dr. Fatima Al-Rashid", role: "Clinical Psychologist", specialty: "OCD & Phobias", image: prof3 },
{ name: "Dr. Robert Ndlovu", role: "Addiction Specialist", specialty: "Substance Abuse", image: prof1 },
{ name: "Dr. Emily Torres", role: "Trauma Therapist", specialty: "EMDR Therapy", image: prof2 },
{ name: "Dr. David Moyo", role: "Forensic Psychologist", specialty: "Behavioral Analysis", image: prof3 },
{ name: "Dr. Priya Sharma", role: "Psychiatrist", specialty: "Bipolar Disorder", image: prof1 },
{ name: "Dr. Nathan Brooks", role: "Geriatric Psychiatrist", specialty: "Elderly Care", image: prof2 },
{ name: "Dr. Grace Okonkwo", role: "Licensed Counselor", specialty: "Grief Counseling", image: prof3 },
{ name: "Dr. Thomas Weber", role: "Clinical Psychologist", specialty: "Stress Management", image: prof1 },
{ name: "Dr. Aisha Patel", role: "Psychotherapist", specialty: "Eating Disorders", image: prof2 },
{ name: "Dr. Carlos Rivera", role: "Psychiatrist", specialty: "Schizophrenia", image: prof3 },
{ name: "Dr. Hannah Müller", role: "Art Therapist", specialty: "Expressive Therapy", image: prof1 },
{ name: "Dr. Solomon Adebayo", role: "Licensed Counselor", specialty: "Cultural Psychology", image: prof2 },
{ name: "Dr. Jessica Park", role: "Clinical Psychologist", specialty: "Sleep Disorders", image: prof3 },
{ name: "Dr. André Dupont", role: "Psychopharmacologist", specialty: "Medication Management", image: prof1 },
{ name: "Dr. Zara Mahlangu", role: "Community Psychologist", specialty: "Social Wellbeing", image: prof2 }];


const sessionTypes = ["Individual Counseling", "Couples Counseling", "Family Counseling", "Grief & Loss Counseling"];

const timeSlots = [
"09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } })
};

const MentalHealth = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

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
            {programs.map((p, i) =>
            <motion.div key={p.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all border border-border group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-hero-gradient transition-all">
                  <p.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* AI Voice Agent */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Call Now (The Reception)</h2>
            <p className="text-muted-foreground mb-6">Have questions about our programs or need to schedule a session? Our receptionist is available to assist you instantly.</p>
            <VoiceAgent variant="button" />
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Book a Session" title="World Changers Org Booking Calendar" description="Schedule a 60-minute counseling session with our qualified professionals. One session per time slot." />

          {!bookingOpen ?
          <div className="text-center">
              <Button onClick={() => setBookingOpen(true)} size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <CalendarDays className="w-5 h-5 mr-2" /> Book a Session
              </Button>
            </div> :

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border relative">
              <button onClick={() => {setBookingOpen(false);setBookingSubmitted(false);}} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              {bookingSubmitted ?
            <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">We'll send a confirmation to your email. Your 60-minute {sessionType} session is scheduled for {date && format(date, "PPP")} at {time}.</p>
                  <Button onClick={() => {setBookingSubmitted(false);setDate(undefined);setTime("");setSessionType("");}}
              variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Book Another Session
                  </Button>
                </div> :

            <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Schedule Your Session</h3>
                  <p className="text-sm text-muted-foreground mb-4">All sessions are 60 minutes. Maximum 1 booking per time slot.</p>

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
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Session Type</label>
                    <Select value={sessionType} onValueChange={setSessionType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionTypes.map((t) =>
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                    )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")} />

                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) =>
                  <button key={slot} type="button" onClick={() => setTime(slot)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                    time === slot ?
                    "bg-primary text-primary-foreground border-primary" :
                    "bg-card border-border text-foreground hover:border-primary"
                  )}>
                          <Clock className="w-3 h-3 inline mr-1" />{slot}
                        </button>
                  )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Brief Reason for Visit</label>
                    <Textarea placeholder="Please briefly describe the reason for your visit..." rows={3} required />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90"
              disabled={!date || !time || !sessionType}>
                    Confirm Booking
                  </Button>
                </form>
            }
            </motion.div>
          }
        </div>
      </section>

      {/* Professionals */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Our Professionals" title="Meet the Experts Who Care" description="Our team of licensed professionals bring decades of experience and genuine compassion." />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {professionals.map((p, i) =>
            <motion.div key={p.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-card rounded-2xl overflow-hidden shadow-card group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
                  <p className="text-primary text-xs font-medium mt-1">{p.role}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{p.specialty}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default MentalHealth;