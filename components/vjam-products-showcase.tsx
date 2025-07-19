"use client"

import { useState, useEffect, useRef } from "react"
import { Shield, Radio, ChevronRight, Antenna, Power } from "lucide-react"

type VJAMProduct = {
  id: string
  name: string
  model: string
  power: number
  antennas: number
  bands: string[]
  powerConsumption: string
  protection: string
  features: string[]
  tier: string
  highlight: boolean
}

const vjamProducts: VJAMProduct[] = [
  {
    id: "vjam300",
    name: "VJAM 300",
    model: "VJ-300",
    power: 350,
    antennas: 4,
    bands: ["VHF", "UHF", "ISM"],
    powerConsumption: "24 VDC, 30A",
    protection: "Standard",
    features: [
      "VHF, UHF and ISM bands sweep jamming",
      "10 Programmable Spots against known threats", 
      "Net output power is 350 Watts",
      "Number of Antennas is 4",
      "Operating Power 24 VDC, 30A",
      "Extra Protection Radius"
    ],
    tier: "entry",
    highlight: false
  },
  {
    id: "vjam600", 
    name: "VJAM 600",
    model: "VJ-600",
    power: 650,
    antennas: 7,
    bands: ["VHF", "UHF", "ISM", "GSM", "3G", "4G"],
    powerConsumption: "24 VDC, 55A",
    protection: "Enhanced",
    features: [
      "VHF, UHF, ISM, GSM, 3G and 4G bands sweep jamming",
      "10 Programmable Spots against known threats",
      "Net output power is 650 Watts", 
      "Number of Antennas - 7",
      "Operating Power 24 VDC, 55A",
      "Extra Protection Radius"
    ],
    tier: "professional",
    highlight: true
  },
  {
    id: "vjam800",
    name: "VJAM 800", 
    model: "VJ-800",
    power: 1000,
    antennas: 10,
    bands: ["20MHz-6GHz", "VHF", "UHF", "ISM", "GSM/LTE", "UAV"],
    powerConsumption: "24 VDC, 80A",
    protection: "Maximum",
    features: [
      "20 MHz-6 GHz (VHF, UHF, ISM, GSM/LTE, UAV) sweep jamming",
      "15 Programmable Spots against known threats",
      "Net output power is 1000 Watts",
      "Number of Antennas - 10", 
      "Operating Power 24 VDC, 80A",
      "Extra Protection Radius"
    ],
    tier: "enterprise",
    highlight: false
  }
]

const ProductCard = ({ product, index, isActive, onSelect, isVisible }: { product: VJAMProduct, index: number, isActive: boolean, onSelect: (product: VJAMProduct) => void, isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedPower, setAnimatedPower] = useState(0)
  const [animatedAntennas, setAnimatedAntennas] = useState(0)
  
  useEffect(() => {
    if (isVisible) {
      // Animate power value
      const powerTimer = setTimeout(() => {
        let current = 0
        const increment = product.power / 30
        const powerInterval = setInterval(() => {
          current += increment
          if (current >= product.power) {
            setAnimatedPower(product.power)
            clearInterval(powerInterval)
          } else {
            setAnimatedPower(Math.floor(current))
          }
        }, 50)
      }, index * 200)

      // Animate antenna count
      const antennaTimer = setTimeout(() => {
        let current = 0
        const antennaInterval = setInterval(() => {
          current++
          if (current >= product.antennas) {
            setAnimatedAntennas(product.antennas)
            clearInterval(antennaInterval)
          } else {
            setAnimatedAntennas(current)
          }
        }, 100)
      }, index * 200 + 500)

      return () => {
        clearTimeout(powerTimer)
        clearTimeout(antennaTimer)
      }
    }
  }, [isVisible, product.power, product.antennas, index])

  return (
    <div
      className={`product-card relative group cursor-pointer transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
      tabIndex={0}
      role="button"
      aria-label={`Select ${product.name} for detailed view`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(product)
        }
      }}
    >
      <div className={`
        relative overflow-hidden rounded-xl border transition-all duration-300
        ${product.highlight 
          ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 shadow-2xl shadow-cyan-500/20' 
          : 'border-cyan-300/30 bg-black/60 hover:border-cyan-400/60'
        }
        ${isActive ? 'ring-2 ring-cyan-400 scale-105' : ''}
        ${isHovered ? 'shadow-2xl shadow-cyan-500/30 scale-102' : 'shadow-xl shadow-black/50'}
        backdrop-blur-lg min-h-[320px] sm:min-h-[360px] lg:min-h-[380px] p-4 sm:p-5 lg:p-6
      `}>
        
        {/* Highlight Badge */}
        {product.highlight && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
        )}

        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">{product.name}</h3>
            <div className="text-xs text-cyan-400 font-mono">{product.model}</div>
          </div>
          <div className={`text-xs sm:text-sm capitalize ${product.tier === 'professional' ? 'text-cyan-300' : 'text-gray-300'}`}>
            {product.tier} Grade
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Power Output */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <Power className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-1 sm:mr-2" />
              <span className="text-xs text-gray-300">POWER</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {animatedPower}<span className="text-base sm:text-lg text-cyan-400">W</span>
            </div>
            {/* Power Bar */}
            <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
              <div 
                className="progress-bar h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                style={{ width: `${(animatedPower / 1000) * 100}%` }}
              />
            </div>
          </div>

          {/* Antennas */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <Antenna className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-1 sm:mr-2" />
              <span className="text-xs text-gray-300">ANTENNAS</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              {animatedAntennas}
            </div>
            {/* Antenna Indicators */}
            <div className="flex justify-center space-x-0.5 sm:space-x-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 h-3 sm:h-4 rounded-full transition-all duration-300 ${
                    i < animatedAntennas ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Frequency Bands */}
        <div className="mb-3 sm:mb-4">
          <div className="text-xs text-gray-300 mb-2">FREQUENCY BANDS</div>
          <div className="flex flex-wrap gap-1">
            {product.bands.map((band: string, i: number) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded border border-cyan-400/30"
              >
                {band}
              </span>
            ))}
          </div>
        </div>

        {/* Protection Level */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-300">PROTECTION LEVEL</span>
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
          </div>
          <div className={`text-sm font-semibold ${
            product.protection === 'Maximum' ? 'text-green-400' : 
            product.protection === 'Enhanced' ? 'text-cyan-400' : 'text-yellow-400'
          }`}>
            {product.protection}
          </div>
        </div>

        {/* Action Button */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <button className={`
            w-full py-2 px-3 sm:px-4 rounded-lg border transition-all duration-300 flex items-center justify-center text-sm
            ${product.highlight 
              ? 'border-cyan-400 bg-cyan-400 text-black hover:bg-cyan-300' 
              : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
            }
          `}>
            <span className="font-medium">View Details</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Hover Glow Effect */}
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 to-blue-500/5 
          transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
      </div>
    </div>
  )
}

const ComparisonChart = ({ isVisible }: { isVisible: boolean }) => {
  const maxPower = 1000
  const maxAntennas = 10

  return (
    <div className={`
      transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }
    `}>
      <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-cyan-300/30 p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
          Performance Comparison
        </h3>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Power Comparison */}
          <div>
            <div className="flex items-center mb-2 sm:mb-3">
              <Power className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-2" />
              <span className="text-white font-semibold text-sm sm:text-base">Power Output (Watts)</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {vjamProducts.map((product, index) => (
                <div key={product.id} className="flex items-center">
                  <div className="w-16 sm:w-20 text-xs sm:text-sm text-gray-300">{product.name}</div>
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className="bg-gray-700 rounded-full h-2 sm:h-3 relative overflow-hidden">
                      <div 
                        className={`progress-bar h-2 sm:h-3 rounded-full transition-all duration-1000 ${
                          product.highlight ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-500 to-cyan-600'
                        }`}
                        style={{ 
                          width: isVisible ? `${(product.power / maxPower) * 100}%` : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 sm:w-16 text-right text-xs sm:text-sm text-white font-mono">
                    {product.power}W
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Antenna Comparison */}
          <div>
            <div className="flex items-center mb-2 sm:mb-3">
              <Antenna className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-2" />
              <span className="text-white font-semibold text-sm sm:text-base">Antenna Count</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {vjamProducts.map((product, index) => (
                <div key={product.id} className="flex items-center">
                  <div className="w-16 sm:w-20 text-xs sm:text-sm text-gray-300">{product.name}</div>
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className="bg-gray-700 rounded-full h-2 sm:h-3 relative overflow-hidden">
                      <div 
                        className={`progress-bar h-2 sm:h-3 rounded-full transition-all duration-1000 ${
                          product.highlight ? 'bg-gradient-to-r from-green-400 to-cyan-500' : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ 
                          width: isVisible ? `${(product.antennas / maxAntennas) * 100}%` : '0%',
                          transitionDelay: `${index * 200 + 500}ms`
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 sm:w-16 text-right text-xs sm:text-sm text-white font-mono">
                    {product.antennas}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VJAMProductsShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(vjamProducts[1]) // VJAM 600 default
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="VJAM Series Products Showcase"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-drift 20s linear infinite"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Radio className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cyan-400 mr-2 sm:mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                VJAM SERIES
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Vehicle-Mounted Electronic Jammers for Critical Defense Operations
          </p>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-cyan-400 px-4">
            Advanced Countermeasure Systems • Multi-Band Protection • Mission Critical Performance
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {vjamProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isActive={selectedProduct?.id === product.id}
              onSelect={setSelectedProduct}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Comparison Chart */}
        <ComparisonChart isVisible={isVisible} />

        {/* Call to Action */}
        <div className={`
          text-center mt-8 sm:mt-10 lg:mt-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }
        `} style={{ transitionDelay: '800ms' }}>
          <button className="cta-button bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            Request Technical Specifications
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(50px, 50px, 0); }
        }

        /* Performance optimizations */
        .product-card {
          will-change: transform;
        }

        .product-card:hover {
          will-change: transform;
        }

        /* Touch optimizations for mobile */
        @media (hover: none) and (pointer: coarse) {
          .product-card:hover {
            transform: none;
          }
          
          .product-card:active {
            transform: scale(0.98);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .product-card,
          .comparison-chart,
          .section-header {
            animation: none !important;
            transition: none !important;
          }
          
          .product-card {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          .progress-bar {
            transition: width 0.3s ease !important;
          }
        }

        /* Better focus states for accessibility */
        .product-card:focus-within {
          outline: 2px solid #00ffff;
          outline-offset: 2px;
        }

        .cta-button:focus {
          outline: 2px solid #00ffff;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}