import { About } from "@/components/site/About";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Hero } from "@/components/site/Hero";
import { HowWeWork } from "@/components/site/HowWeWork";
import { Leadership } from "@/components/site/Leadership";
import { Preloader } from "@/components/site/Preloader";
import { RequestForm } from "@/components/site/RequestForm";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhyUs } from "@/components/site/WhyUs";

export default function Home() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Leadership />
        <Services />
        <WhyUs />
        <HowWeWork />
        <RequestForm />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
