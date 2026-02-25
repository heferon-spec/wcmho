import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHero from "@/components/PageHero";
import aboutBg from "@/assets/about-bg.jpg";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHero title={isSignUp ? "Create Account" : "Log In"} subtitle="Access your profile and manage your activities" bgImage={aboutBg} />

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 shadow-card">
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {isSignUp ? "Account Created!" : "Welcome Back!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isSignUp ? "Your account has been created successfully." : "You have been logged in successfully."}
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="font-heading text-2xl font-bold text-foreground">{isSignUp ? "Sign Up" : "Sign In"}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isSignUp ? "Create your free account" : "Welcome back to World Changers"}
                    </p>
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10" required />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="you@example.com" className="pl-10" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" required />
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90">
                    {isSignUp ? "Create Account" : "Sign In"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-primary font-medium hover:underline">
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
