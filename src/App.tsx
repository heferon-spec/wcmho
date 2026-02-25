import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import MentalHealth from "./pages/MentalHealth";
import Philanthropy from "./pages/Philanthropy";
import Campaigns from "./pages/Campaigns";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Volunteers from "./pages/Volunteers";
import BecomeVolunteer from "./pages/BecomeVolunteer";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Shop from "./pages/Shop";
import News from "./pages/News";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/philanthropy" element={<Philanthropy />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/become-volunteer" element={<BecomeVolunteer />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
