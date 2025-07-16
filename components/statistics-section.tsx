"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, Rocket, Users, Settings, Target, Zap } from "lucide-react"

const statistics = [
  {
    id: "experience",
    title: "Years of Experience",
    value: 6,
    suffix: "+",
    icon: Trophy,
    description: "Since 2018"
  },
  {
    id: "projects",
    title: "Projects Delivered",
    value: 100,
    suffix: "+",
    icon: Rocket,
    description: "Successful Solutions"
  },
  {
    id: "clients",
    title: "Clients Served",
    value: 15,
    suffix: "+",
    icon: Users,
    description: "Trusted Partners"
  },
  {
    id: "quality",
    title: "Quality Standards",
    value: 100,
    suffix: "%",
    icon: Target,
    description: "Industrial Grade"
  },
  {
    id: "revenue",
    title: "Annual Growth",
    value: 25,
    suffix: "%",
    icon: Zap,
    description: "Year over Year",
    isHighlight: true
  }
]

const StatItem = ({ stat, index, isMobile = false }: { stat: typeof statistics[0], index: number, isMobile?: boolean }) => {
  const [currentValue, setCurrentValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const Icon = stat.icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = stat.value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const nextValue = Math.min(Math.round(increment * currentStep), stat.value)
      setCurrentValue(nextValue)

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, stat.value])

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-500 hover:scale-105 ${!isMobile ? 'w-full' : ''}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
              <div className={`
          ${stat.isHighlight 
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/25' 
            : 'bg-black/70 border border-cyan-300/30 shadow-xl shadow-black/50'
          }
          backdrop-blur-lg rounded-xl p-4 sm:p-5 lg:p-4 xl:p-5 text-center w-full
          hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300
          ${stat.isHighlight ? 'lg:min-h-[160px] xl:min-h-[180px]' : 'lg:min-h-[140px] xl:min-h-[160px]'}
        `}>
                  {/* Icon */}
          <div className="flex justify-center mb-2 lg:mb-3">
            <Icon 
              className={`w-8 h-8 lg:w-8 lg:h-8 xl:w-9 xl:h-9 ${stat.isHighlight ? 'text-cyan-300' : 'text-cyan-400'} 
                transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]`}
            />
          </div>

          {/* Value with Odometer Effect */}
          <div className="mb-1 lg:mb-2">
            <div className="flex items-center justify-center">
              <span className={`
                ${stat.isHighlight ? 'text-4xl sm:text-5xl lg:text-4xl xl:text-5xl' : 'text-3xl sm:text-4xl lg:text-3xl xl:text-4xl'} 
                font-bold text-white
                transition-all duration-300 hover:text-cyan-300
              `}>
                {currentValue}
              </span>
              <span className={`
                ${stat.isHighlight ? 'text-2xl sm:text-3xl lg:text-2xl xl:text-3xl' : 'text-xl sm:text-2xl lg:text-xl xl:text-2xl'} 
                font-bold text-cyan-400 ml-1
              `}>
                {stat.suffix}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className={`
            ${stat.isHighlight ? 'text-lg sm:text-xl lg:text-lg xl:text-xl' : 'text-base sm:text-lg lg:text-base xl:text-lg'} 
            font-semibold text-white mb-1
          `}>
            {stat.title}
          </h3>

          {/* Description */}
          <p className={`
            ${stat.isHighlight ? 'text-sm sm:text-base lg:text-sm xl:text-base' : 'text-xs sm:text-sm lg:text-xs xl:text-sm'} 
            text-gray-300 opacity-90
          `}>
          {stat.description}
        </p>
      </div>
    </div>
  )
}

export default function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen lg:min-h-[120vh] bg-gradient-to-br from-gray-900 via-gray-900 to-black py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Tech Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Globe Background - Full Width */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Desktop Globe Background */}
        <div className="hidden lg:block w-full h-full">
          <img 
            src="/images/globe-desktop.webp" 
            alt="Global Reach"
            className="w-full h-full object-contain opacity-15"
          />
        </div>
        
        {/* Mobile Globe Background */}
        <div className="block lg:hidden w-full h-full">
          <img 
            src="/images/globe-mobile.webp" 
            alt="Global Reach"
            className="w-full h-full object-contain opacity-15"
          />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content Wrapper for Desktop Centering */}
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-6">
          <h2 className={`
            text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-2 transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              RADCON
            </span>
          </h2>
          <p className={`
            text-base sm:text-lg lg:text-base text-gray-300 max-w-2xl mx-auto px-4 transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `} style={{ transitionDelay: '200ms' }}>
            Engineering excellence through innovation and quality
          </p>
        </div>

                {/* Statistics Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Desktop Layout - Grid-based positioning */}
                   <div className="hidden lg:block">
            <div className="grid grid-rows-3 gap-12 xl:gap-16 min-h-[800px] xl:min-h-[900px] max-w-5xl mx-auto py-8">
             {/* Top Row */}
             <div className="flex justify-between items-center">
               <div className="w-64 xl:w-72">
                 <StatItem stat={statistics[0]} index={0} />
               </div>
               <div className="w-64 xl:w-72">
                 <StatItem stat={statistics[1]} index={1} />
               </div>
             </div>
             
             {/* Center Highlight */}
             <div className="flex justify-center items-center">
               <div className="w-72 xl:w-80">
                 <StatItem stat={statistics[4]} index={4} />
               </div>
             </div>
             
             {/* Bottom Row */}
             <div className="flex justify-between items-center">
               <div className="w-64 xl:w-72">
                 <StatItem stat={statistics[2]} index={2} />
               </div>
               <div className="w-64 xl:w-72">
                 <StatItem stat={statistics[3]} index={3} />
               </div>
             </div>
           </div>
         </div>

        {/* Tablet Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6">
          {statistics.slice(0, 4).map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
          <div className="col-span-2 max-w-md mx-auto w-full">
            <StatItem stat={statistics[4]} index={4} />
          </div>
        </div>

        {/* Mobile Layout - Single Column */}
        <div className="grid sm:hidden grid-cols-1 gap-6 max-w-sm mx-auto">
          {statistics.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} isMobile={true} />
          ))}
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes odometer-roll {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }

        /* Ensure proper spacing on all devices */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  )
}