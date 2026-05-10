import { Hero } from "@/components/sections/hero";
import { ReportMock } from "@/components/sections/report-mock";
import { ValueProps } from "@/components/sections/value-props";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhySwitch } from "@/components/sections/why-switch";
import { SocialProof } from "@/components/sections/social-proof";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ReportMock />
      <ValueProps />
      <HowItWorks />
      <WhySwitch />
      <SocialProof />
      <FinalCta />
    </>
  );
}
