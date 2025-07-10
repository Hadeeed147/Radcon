/* hero-section */
"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const taglines = [
  "Disrupting Threats, Enabling Defense",
  "Advanced Jamming Solutions for Mission Assurance",
  "Precision Engineered for Strategic Dominance",
  "RF & Microwave Expertise, Tactical Advantage",
  "Safeguarding Communications, Protecting Assets",
]

export default function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState("")
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  const [stats, setStats] = useState({ years: 0, projects: 0, isVisible: false })

  // Typewriter effect
  useEffect(() => {
    const currentText = taglines[taglineIndex]

    if (isTyping) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setCurrentTagline(currentText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentTagline(currentText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 40)
        return () => clearTimeout(timeout)
      } else {
        setTaglineIndex((prev) => (prev + 1) % taglines.length)
        setIsTyping(true)
      }
    }
  }, [charIndex, isTyping, taglineIndex])

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStats((prev) => ({ ...prev, isVisible: true }))

          // Animate years counter
          let yearsCount = 0
          const yearsInterval = setInterval(() => {
            yearsCount += 1
            setStats((prev) => ({ ...prev, years: yearsCount }))
            if (yearsCount >= 6) clearInterval(yearsInterval)
          }, 250)

          // Animate projects counter
          let projectsCount = 0
          const projectsInterval = setInterval(() => {
            projectsCount += 5
            setStats((prev) => ({ ...prev, projects: Math.min(projectsCount, 100) }))
            if (projectsCount >= 100) clearInterval(projectsInterval)
          }, 75)
        }
      },
      { threshold: 0.1 },
    )

    const statsElement = document.getElementById("stats-section")
    if (statsElement) observer.observe(statsElement)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/images/hero-section-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-950/70 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Animated Signal Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Wave 1 */}
        <div
          className="absolute rounded-full border-2 border-cyan-400/20 animate-[wave_4s_ease-out_infinite]"
          style={{
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
          }}
        />
        {/* Wave 2 */}
        <div
          className="absolute rounded-full border-2 border-cyan-400/25 animate-[wave_4s_ease-out_infinite_1.5s]"
          style={{
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
          }}
        />
        {/* Wave 3 */}
        <div
          className="absolute rounded-full border-2 border-cyan-400/20 animate-[wave_4s_ease-out_infinite_3s]"
          style={{
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
          }}
        />
        {/* Wave 4 */}
        <div
          className="absolute rounded-full border-2 border-cyan-400/25 animate-[wave_4s_ease-out_infinite_4.5s]"
          style={{
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent animate-[glow_3s_ease-in-out_infinite] tracking-wide"
          style={{ fontFamily: "'Orbitron', 'Oxanium', monospace" }}
        >
          RADCON TECHNOLOGIES
        </h1>

        {/* Dynamic Tagline with Typewriter Effect */}
        <div className="h-16 flex items-center justify-center mb-8">
          <p
            className="text-lg sm:text-xl text-white/90 font-medium"
            style={{ fontFamily: "'Rajdhani', 'Share Tech Mono', monospace" }}
          >
            {currentTagline}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* CTA Button */}
        <Button
          className="mb-20 sm:mb-16 py-4 px-8 rounded-full border-2 border-cyan-400 bg-transparent text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 text-base font-medium"
          variant="outline"
        >
          Explore Solutions
        </Button>
      </div>

      {/* Statistics Row */}
      <div id="stats-section" className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-16">
            <div
              className={`text-center transition-all duration-1000 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] cursor-pointer ${
                stats.isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1">{stats.years}+</div>
              <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider">Years</div>
            </div>
            <div
              className={`text-center transition-all duration-1000 delay-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] cursor-pointer ${
                stats.isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1">{stats.projects}+</div>
              <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider">Projects</div>
            </div>
            <div
              className={`text-center transition-all duration-1000 delay-600 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] cursor-pointer ${
                stats.isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">Defense</div>
              <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider">Grade</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800;900&family=Oxanium:wght@400;600;700;800&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        
        @keyframes wave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(150);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4);
          }
        }
      `}</style>
    </section>
  )
}
