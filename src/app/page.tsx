"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Modal from "@/components/layout/Modal";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import Programs from "@/components/sections/Programs";
import Trainings from "@/components/sections/Trainings";
import ApplyCTA from "@/components/sections/ApplyCTA";

// TopBar: hidden on mobile (0px), visible on sm+ (36px)
// Navbar: 64px always
// Total offset: mobile=64px, sm+=100px

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Fixed top chrome */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <Navbar onApply={() => setModalOpen(true)} />
      </div>

      {/* Push content below fixed header
          Mobile: TopBar hidden → only Navbar (64px)
          sm+:    TopBar (36px) + Navbar (64px) = 100px           */}
      <div className="pt-16 sm:pt-[100px]">
        <AnnouncementBar onApply={() => setModalOpen(true)} />

        <main>
          <Hero onApply={() => setModalOpen(true)} />
          <StatsStrip />
          <Programs />
          <Trainings />
          <ApplyCTA />
        </main>

        <Footer />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
