import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Heart, ArrowRight, DollarSign, Target, BarChart3, Users, TrendingUp, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CreateCampaignDialog from "@/components/CreateCampaignDialog";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import campaignBg from "@/assets/campaign-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const fetchCampaigns = async () => {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const fetchDonations = async () => {
  const { data, error } = await supabase
    .from("campaign_donations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data;
};

const Campaigns = () => {
  const { user } = useAuth();

  const { data: campaigns = [], refetch: refetchCampaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  const { data: donations = [] } = useQuery({
    queryKey: ["campaign-donations"],
    queryFn: fetchDonations,
  });

  const totalRaised = campaigns.reduce((sum, c) => sum + Number(c.raised_amount), 0);
  const totalDonors = donations.length;
  const avgCompletion = campaigns.length
    ? Math.round(campaigns.reduce((sum, c) => sum + Math.min((Number(c.raised_amount) / Math.max(Number(c.goal_amount), 1)) * 100, 100), 0) / campaigns.length)
    : 0;
  const fullyFunded = campaigns.filter((c) => Number(c.raised_amount) >= Number(c.goal_amount)).length;

  const dashboardStats = [
    { icon: DollarSign, value: `R${totalRaised.toLocaleString()}`, label: "Total Funds Raised" },
    { icon: Target, value: String(campaigns.length), label: "Active Campaigns" },
    { icon: Users, value: String(totalDonors), label: "Total Donations" },
    { icon: TrendingUp, value: `${avgCompletion}%`, label: "Avg. Completion" },
  ];

  return (
    <div>
      <PageHero title="Donor Dashboard" subtitle="Support our mental health initiatives and make a real difference" bgImage={campaignBg} />

      {/* Donate Online + Create Campaign */}
      <section className="relative -mt-16 z-10 px-4 mb-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-elevated border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Donate Online</h3>
              <p className="text-sm text-muted-foreground mb-6">Make a secure online donation via Paystack to support our mental health programs.</p>
              <Button asChild size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90 w-full">
                <a href="https://paystack.shop/pay/87qgnu5n8o" target="_blank" rel="noopener noreferrer">
                  Donate Now <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-8 shadow-elevated border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Offline Donation</h3>
              <p className="text-sm text-muted-foreground mb-4">Prefer bank transfer? Use the details below.</p>
              <div className="text-left text-sm space-y-2">
                <p><span className="font-semibold">Bank:</span> Standard Bank</p>
                <p><span className="font-semibold">Acc:</span> 10169316864</p>
                <p><span className="font-semibold">Branch:</span> 051001</p>
                <p><span className="font-semibold">SWIFT:</span> SBZA ZA JJ</p>
                <p className="text-xs text-muted-foreground mt-2">PBO: 930084594 · Tax deductible</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardStats.map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-card rounded-xl p-6 shadow-elevated text-center border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Grid */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <SectionHeading label="Campaign Grid" title="Help & Donate Our Campaigns" description="Every contribution brings us closer to a world where mental health care is accessible to all." />
            {user && (
              <div className="mt-4 md:mt-0">
                <CreateCampaignDialog onCreated={() => refetchCampaigns()} />
              </div>
            )}
            {!user && (
              <div className="mt-4 md:mt-0">
                <Button asChild variant="outline">
                  <Link to="/login">Log in to create a campaign</Link>
                </Button>
              </div>
            )}
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-20">
              <Brain className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No campaigns yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c, i) => {
                const percent = Number(c.goal_amount) > 0 ? Math.round((Number(c.raised_amount) / Number(c.goal_amount)) * 100) : 0;
                const donateLink = c.paystack_link || "https://paystack.shop/pay/87qgnu5n8o";
                return (
                  <motion.div key={c.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="bg-card rounded-xl overflow-hidden shadow-soft border border-border group hover:shadow-card transition-shadow">
                    <div className="aspect-video bg-primary/5 flex items-center justify-center relative overflow-hidden">
                      {c.image_url ? (
                        <img src={c.image_url} alt={c.title} className="w-full h-full object-cover" />
                      ) : (
                        <Brain className="w-16 h-16 text-primary/20" />
                      )}
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {percent}%
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
                      <div className="w-full bg-muted rounded-full h-2.5 mb-3">
                        <div className="bg-accent h-2.5 rounded-full transition-all" style={{ width: `${Math.min(percent, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Raised: <span className="text-primary font-semibold">R{Number(c.raised_amount).toLocaleString()}</span></span>
                        <span className="text-muted-foreground">Goal: R{Number(c.goal_amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{c.donation_count} Donations</span>
                        <Button asChild size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                          <a href={donateLink} target="_blank" rel="noopener noreferrer">
                            Donate Now <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Campaign Progress Overview */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Campaign Analytics</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mt-3">Real-Time Impact Dashboard</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <BarChart3 className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold text-primary-foreground">R{totalRaised.toLocaleString()}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Total Raised Across All Campaigns</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold text-primary-foreground">{totalDonors}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Total Donations Received</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Star className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold text-primary-foreground">{fullyFunded}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Campaigns Fully Funded</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="How It Works" title="Your Donation Journey" description="Transparency is at the heart of everything we do." />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Choose a Campaign", desc: "Browse our active campaigns and find one that resonates with you." },
              { step: "02", title: "Make a Donation", desc: "Contribute any amount — every rand and dollar makes a difference." },
              { step: "03", title: "Track Progress", desc: "Follow real-time updates on funding progress and milestones." },
              { step: "04", title: "See the Impact", desc: "Receive reports showing exactly how your donation changed lives." },
            ].map((item, i) => (
              <motion.div key={item.step} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-2xl font-bold text-accent">{item.step}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Donation */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading label="Bank Transfer" title="Offline Donation" description="To make an offline donation toward the organization, please use the details below:" />
          <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-card p-8 border border-border">
            <div className="space-y-4 text-sm text-foreground">
              {[
                ["Account Name", "WORLD CHANGERS MENTAL HEALTH CARE ORGANISATION"],
                ["Bank Name", "Standard Bank"],
                ["Account Number", "10169316864"],
                ["Branch Code", "051001"],
                ["SWIFT Address", "SBZA ZA JJ"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-border pb-3">
                  <span className="font-semibold">{label}</span>
                  <span className="text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-accent/10 rounded-xl text-center">
              <p className="text-sm text-foreground">Your tax-deductible donation is greatly appreciated!</p>
              <p className="text-lg font-heading font-bold text-primary mt-2">PBO NUMBER: 930084594</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-accent-foreground mb-4">Ready to Make a Difference?</h2>
          <p className="text-accent-foreground/80 max-w-xl mx-auto mb-8">Start your own campaign or donate to an existing one. Together we can transform mental health care.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Start a Campaign <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
              <Link to="/volunteers">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
