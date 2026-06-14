import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FillShiftsSection } from "@/components/FillShiftsSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FillShiftsSection />
      <StatsSection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
