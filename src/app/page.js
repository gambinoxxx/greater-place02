"use client";
import VideoGallery from "@/components/VideoGallery";
import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import MissionVision from "@/components/MissionVision";
import Gallery from "@/components/Gallery";
import Subscribe from "@/components/Subscribe";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import EventBooking from "@/components/EventBooking";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-32">
      <HeroSection />
      <About />
      <Gallery />
      <VideoGallery />
      <MissionVision />
      <Team />
      <EventBooking />
      <Testimonials />
      <Subscribe />
    </div>
  );
}
