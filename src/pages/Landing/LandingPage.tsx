import Navbar from "../../components/Landing/Navbar"
import Hero from "../../components/Landing/Hero"
import ProblemSection from "../../components/Landing/ProblemSection"
import MonitoringSection from "../../components/Landing/Monitoring"
import CTASection from "../../components/Landing/CTASection"
import FAQSection from "../../components/Landing/FAQSection"
import Footer from "../../components/Landing/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <Navbar />
        <Hero />
        <ProblemSection />
        <MonitoringSection />
        <CTASection />
        <FAQSection />
        <Footer />
    </div>
  )
}