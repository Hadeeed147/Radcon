"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, 
  Radio, 
  Battery, 
  Cpu, 
  Smartphone, 
  Eye, 
  Navigation, 
  Plane, 
  Radar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Product data structure
const productCategories = [
  {
    id: 1,
    title: "Life-Saving Equipment",
    icon: "Shield",
    gradient: "from-red-500 to-orange-600",
    description: "Critical protection systems for high-risk operations",
    products: [
      "RCIED Counter Jammers for Convoy Protection",
      "VHF/UHF and HF Bands",
      "VHF/UHF ISM and GSM 3G/4G/LTE",
      "GPS Jammers",
      "Customized Jammers"
    ],
    bgImage: "/images/life-saving-bg.webp"
  },
  {
    id: 2,
    title: "RF and Microwave",
    icon: "Radio",
    gradient: "from-blue-500 to-cyan-600",
    description: "Advanced RF solutions and microwave systems",
    products: [
      "RF Amplifiers",
      "Phase Shifters",
      "Antennas",
      "RF Cable Assemblies"
    ],
    bgImage: "/images/rf-microwave-bg.webp"
  },
  {
    id: 3,
    title: "Power Systems",
    icon: "Battery",
    gradient: "from-yellow-500 to-amber-600",
    description: "High-performance power solutions and rectification",
    products: [
      "Design of Power Supplies (Customized Requirements)",
      "High Voltage Rectification (30 kV)"
    ],
    bgImage: "/images/power-systems-bg.webp"
  },
  {
    id: 4,
    title: "Embedded Systems",
    icon: "Cpu",
    gradient: "from-green-500 to-emerald-600",
    description: "Custom embedded solutions and control systems",
    products: [
      "Details coming soon"
    ],
    bgImage: "/images/embedded-systems-bg.webp"
  },
  {
    id: 5,
    title: "Communication Equipment",
    icon: "Smartphone",
    gradient: "from-purple-500 to-violet-600",
    description: "Professional communication and radio systems",
    products: [
      "VHF/UHF Walkie Talkie Sets"
    ],
    bgImage: "/images/communication-bg.webp"
  },
  {
    id: 6,
    title: "Optronics",
    icon: "Eye",
    gradient: "from-indigo-500 to-blue-600",
    description: "Advanced optical and photonic technologies",
    products: [
      "Details coming soon"
    ],
    bgImage: "/images/optronics-bg.webp"
  },
  {
    id: 7,
    title: "Navigation",
    icon: "Navigation",
    gradient: "from-teal-500 to-cyan-600",
    description: "Precision navigation and positioning systems",
    products: [
      "Details coming soon"
    ],
    bgImage: "/images/navigation-bg.webp"
  },
  {
    id: 8,
    title: "Aviation Industry",
    icon: "Plane",
    gradient: "from-sky-500 to-blue-600",
    description: "Aerospace and aviation technology solutions",
    products: [
      "Multi-Function Displays (MFD) for Helicopters",
      "Radar Altimeters",
      "Additional products available upon request"
    ],
    bgImage: "/images/aviation-bg.webp"
  },
  {
    id: 9,
    title: "Indigenous Development Of Radar Parts",
    icon: "Radar",
    gradient: "from-orange-500 to-red-600",
    description: "Locally developed radar components and tracking systems",
    products: [
      "Camera Modules for Optical Tracking",
      "TFT Displays",
      "Memory Units",
      "Video Amplifier Cards",
      "Control Cards"
    ],
    bgImage: "/images/radar-parts-bg.webp"
  }
]

// Icon mapping
const iconMap = {
  Shield, Radio, Battery, Cpu, Smartphone, Eye, Navigation, Plane, Radar
}

interface ProductShowcaseCarouselProps {
  autoScroll?: boolean
  autoScrollDelay?: number
  visibleCards?: {
    mobile: number
    tablet: number
    desktop: number
    large: number
  }
}

const ProductShowcaseCarousel: React.FC<ProductShowcaseCarouselProps> = ({
  autoScroll = true,
  autoScrollDelay = 5000,
  visibleCards = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4
  }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const [lastMoveTime, setLastMoveTime] = useState(0)
  const [lastMoveX, setLastMoveX] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Get current visible cards based on screen size
  const getVisibleCards = useCallback(() => {
    if (typeof window === 'undefined') return visibleCards.desktop

    const width = window.innerWidth
    if (width <= 768) return visibleCards.mobile
    if (width <= 1024) return visibleCards.tablet  
    if (width <= 1440) return visibleCards.desktop
    return visibleCards.large
  }, [visibleCards])

  const [visibleCardsCount, setVisibleCardsCount] = useState(getVisibleCards())

  // Handle resize with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setVisibleCardsCount(getVisibleCards())
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [getVisibleCards])

  // Intersection Observer for entrance animations
  useEffect(() => {
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )
      
      observerRef.current.observe(containerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Auto scroll functionality
  useEffect(() => {
    if (autoScroll && isInView && !isDragging && !isScrolling) {
      autoScrollTimeoutRef.current = setTimeout(() => {
        nextSlide()
      }, autoScrollDelay)
    }

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
  }, [currentIndex, autoScroll, autoScrollDelay, isInView, isDragging, isScrolling])

  // Momentum animation
  useEffect(() => {
    if (Math.abs(velocity) > 0.1 && !isDragging) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const newVelocity = velocity * 0.95 // Friction
        setVelocity(newVelocity)
        
        if (scrollRef.current) {
          const cardWidth = getCardWidth()
          const maxScroll = (productCategories.length - visibleCardsCount) * cardWidth
          const newScrollLeft = Math.max(0, Math.min(maxScroll, scrollLeft + velocity))
          setScrollLeft(newScrollLeft)
          
          // Update current index based on scroll position
          const newIndex = Math.round(newScrollLeft / cardWidth)
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex)
          }
        }
      })
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [velocity, isDragging, scrollLeft, currentIndex, visibleCardsCount])

  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 320
    
    const width = window.innerWidth
    const gap = 24
    const containerPadding = 48
    
    if (width <= 768) return 280 + gap
    return 320 + gap
  }, [])

  const nextSlide = useCallback(() => {
    if (isScrolling) return
    
    setIsScrolling(true)
    const nextIndex = (currentIndex + 1) % (productCategories.length - visibleCardsCount + 1)
    setCurrentIndex(nextIndex)
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [currentIndex, visibleCardsCount, isScrolling])

  const prevSlide = useCallback(() => {
    if (isScrolling) return
    
    setIsScrolling(true)
    const prevIndex = currentIndex === 0 ? productCategories.length - visibleCardsCount : currentIndex - 1
    setCurrentIndex(prevIndex)
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [currentIndex, visibleCardsCount, isScrolling])

  const goToSlide = useCallback((index: number) => {
    if (isScrolling) return
    
    setIsScrolling(true)
    setCurrentIndex(Math.max(0, Math.min(index, productCategories.length - visibleCardsCount)))
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [visibleCardsCount, isScrolling])

  // Touch and mouse event handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setDragDelta(0)
    setVelocity(0)
    setLastMoveTime(Date.now())
    setLastMoveX(clientX)
    
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return

    const now = Date.now()
    const deltaTime = now - lastMoveTime
    const deltaX = clientX - lastMoveX
    
    if (deltaTime > 0) {
      setVelocity(deltaX / deltaTime * 16) // Convert to pixels per frame (60fps)
    }
    
    setLastMoveTime(now)
    setLastMoveX(clientX)
    
    const delta = clientX - startX
    setDragDelta(delta)
  }

  const handleEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    
    const cardWidth = getCardWidth()
    const threshold = cardWidth * 0.2
    
    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else if (Math.abs(velocity) > 2) {
      // Momentum scrolling
      const direction = velocity > 0 ? -1 : 1
      const targetIndex = Math.max(0, Math.min(productCategories.length - visibleCardsCount, currentIndex + direction))
      goToSlide(targetIndex)
    }
    
    setDragDelta(0)
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd()
    }
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(productCategories.length - visibleCardsCount)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isInView, prevSlide, nextSlide, goToSlide])

  const cardWidth = getCardWidth()
  const translateX = isDragging 
    ? -currentIndex * cardWidth + dragDelta 
    : -currentIndex * cardWidth

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
        `
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0, 255, 255, 0.3) 1px, transparent 0)
            `,
            backgroundSize: "50px 50px",
            animation: "drift 30s linear infinite"
          }}
        />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Product
            </span>{" "}
            <span className="text-white">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of advanced technology solutions designed for critical applications
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg backdrop-blur-sm"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= productCategories.length - visibleCardsCount}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg backdrop-blur-sm"
          aria-label="Next products"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Track */}
        <div 
          ref={scrollRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ willChange: 'transform' }}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              willChange: 'transform'
            }}
          >
            {productCategories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              const isVisible = isInView && index <= currentIndex + visibleCardsCount
              
              return (
                <div
                  key={category.id}
                  className={`flex-shrink-0 px-3 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    width: `${cardWidth}px`,
                    transitionDelay: `${(index - currentIndex) * 100}ms`,
                    willChange: 'transform, opacity'
                  }}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative h-96 md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 ${
                      hoveredCard === category.id ? 'shadow-2xl shadow-cyan-500/20' : 'shadow-xl'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${category.gradient.replace('from-', '').replace(' to-', ', ')})`,
                      willChange: 'transform'
                    }}
                    onClick={() => goToSlide(index)}
                  >
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${category.bgImage})`,
                        willChange: 'opacity'
                      }}
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-sm" />
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${category.gradient.replace('from-', '').replace(' to-', ', ')} 0%, transparent 100%)`
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6 text-white">
                      {/* Top Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2 leading-tight">
                            {category.title}
                          </h3>
                          <p className="text-sm text-white/80 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Products List - Progressive Disclosure */}
                      <div className={`transition-all duration-500 transform ${
                        hoveredCard === category.id 
                          ? 'opacity-100 translate-y-0 max-h-60' 
                          : 'opacity-0 translate-y-4 max-h-0'
                      } overflow-hidden`}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium mb-3 text-white/90">Products & Services:</h4>
                          <ul className="space-y-2">
                            {category.products.map((product, productIndex) => (
                              <li 
                                key={productIndex}
                                className="text-xs text-white/80 flex items-start"
                                style={{
                                  transitionDelay: `${productIndex * 50}ms`
                                }}
                              >
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>{product}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center transition-all duration-300 ${
                        hoveredCard === category.id ? 'bg-white/20 scale-110' : 'bg-transparent'
                      }`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Active Card Indicator */}
                    {index === currentIndex && (
                      <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full shadow-lg animate-pulse" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, productCategories.length - visibleCardsCount + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Loading Shimmer for Images */}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  )
}

export default ProductShowcaseCarousel