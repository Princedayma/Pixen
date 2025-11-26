import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedGallery from "@/components/FeaturedGallery";
import UpcomingEvents from "@/components/UpcomingEvents";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <FeaturedGallery />
      <UpcomingEvents />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
