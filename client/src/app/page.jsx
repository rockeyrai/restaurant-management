"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import OfferSection from "@/components/OfferSection";
import Footer from "@/components/Footer";

export default function App() {
  const router = useRouter();

  return (
      <div className="min-h-screen bg-background">

        <main className="container mx-auto mt-8 p-4">
          <HomeSection />
          <MenuSection />
          <OfferSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
  );
}
