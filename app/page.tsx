import Navigation from "../components/navigation"
import HeroSection from "../components/hero-section"

export default function Page() {
  return (
    <>
      <Navigation />
      <HeroSection />
      {/* Placeholder sections for navigation */}
      <section id="solutions" className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Solutions Section</h2>
      </section>
      <section id="technology" className="min-h-screen bg-gray-800 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Technology Section</h2>
      </section>
      <section id="about" className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">About Section</h2>
      </section>
      <section id="contact" className="min-h-screen bg-gray-800 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Contact Section</h2>
      </section>
    </>
  )
}
