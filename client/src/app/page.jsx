"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthContext";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import OfferSection from "@/components/OfferSection";
import Footer from "@/components/Footer";

export default function App() {
  const router = useRouter();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto mt-8 p-4">
          <HomeSection />
          <MenuSection />
          <OfferSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
