import Navigation from "../components/navigation"
import HeroSection from "../components/hero-section"
import ServicesOverview from "../components/services-overview"
import StatisticsSection from "../components/statistics-section"
import ProductShowcaseCarousel from "../components/product-showcase-carousel"
import AboutSection from "../components/about-us"

export default function Page() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ServicesOverview />
      <StatisticsSection />
      <ProductShowcaseCarousel />
      <AboutSection />
      <section id="contact" className="min-h-screen bg-gray-800 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Contact Section</h2>
      </section>
    </>
  )
}