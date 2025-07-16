"use client"

import { useEffect, useRef } from "react"
import { Zap, Settings, Cpu, Wrench, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Zap,
    title: "RF & Microwave Systems",
    solutions: ["Power Amplifiers", "Filters", "Waveguides", "Communication Systems"],
    backgroundImage: "/images/rf-and-microwave-systems.webp",
  },
  {
    icon: Settings,
    title: "Electronic Solutions",
    solutions: ["Signal Processing", "Remote Control Systems", "Wireless Solutions", "Custom Electronics"],
    backgroundImage: "/images/electronic-solutions.webp",
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    solutions: ["Control Systems", "Monitoring Equipment", "Fire Control Radar", "Surveillance Systems"],
    backgroundImage: "/images/embedded-systems.webp",
  },
  {
    icon: Wrench,
    title: "Precision Engineering",
    solutions: ["CNC Machining", "Mechanical Components", "Custom Fabrication", "Heat Treatment"],
    backgroundImage: "/images/precision-engineering.webp",
  },
]

const ServiceCard = ({ service, index }: { service: (typeof services)[0]; index: number }) => {
  const Icon = service.icon
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`service-card group relative aspect-[4/3] min-h-[280px] sm:min-h-[320px] rounded-xl border border-cyan-300/30 overflow-hidden transition-all duration-700 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:scale-[1.02]`}
      style={{
        animationDelay: `${index * 150}ms`,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Optimized Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${service.backgroundImage})`,
          filter: 'brightness(0.4) contrast(1.1)',
        }}
      />

      {/* Simplified Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-cyan-900/30 transition-opacity duration-300 group-hover:from-black/40 group-hover:via-black/30 group-hover:to-cyan-900/40" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 lg:p-8">
        {/* Icon */}
        <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]">
          <Icon
            size={40}
            className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300"
          />
        </div>

        {/* Title */}
        <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-cyan-50 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Solutions List */}
        <ul className="mb-4 space-y-1 sm:space-y-1.5 flex-grow">
          {service.solutions.map((solution, idx) => (
            <li
              key={idx}
              className="flex items-center text-xs sm:text-sm lg:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300"
              style={{ animationDelay: `${index * 150 + idx * 100 + 300}ms` }}
            >
              <div className="mr-2 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-400 flex-shrink-0 transition-all duration-300 group-hover:bg-cyan-300 group-hover:shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
              {solution}
            </li>
          ))}
        </ul>

        {/* Learn More Link */}
        <a
          href="#"
          className="group/link inline-flex items-center text-xs sm:text-sm text-cyan-400 transition-all duration-300 hover:text-cyan-300 mt-auto self-start"
        >
          <span className="font-medium">Learn More</span>
          <ArrowRight size={14} className="ml-1.5 sm:ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

export default function ServicesOverview() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up')
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Optimized Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Simplified Background Effects */}
      <div className="absolute top-1/4 left-1/4 h-48 w-48 sm:h-64 sm:w-64 lg:h-96 lg:w-96 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-48 w-48 sm:h-64 sm:w-64 lg:h-96 lg:w-96 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-3xl animate-pulse-slow-delayed" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="header-section mb-8 sm:mb-12 lg:mb-16 text-center"
        >
          <h2 className="mb-3 sm:mb-4 lg:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Our Core Capabilities
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Engineering excellence across critical technology domains
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Initial states */
        .service-card {
          opacity: 0;
          transform: translateY(40px);
        }
        
        .header-section {
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1.1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-fade-up {
          animation: fade-up 1s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 10s ease-in-out infinite;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .grid {
            gap: 1rem;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .header-section {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          .animate-slide-up,
          .animate-fade-up,
          .animate-pulse-slow,
          .animate-pulse-slow-delayed {
            animation: none;
          }
          
          .animate-slide-up,
          .animate-fade-up {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}