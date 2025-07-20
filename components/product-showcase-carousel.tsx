"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Detect touch device and reduced motion preference
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Get current visible cards based on screen size
  const getVisibleCards = useCallback(() => {
    if (typeof window === 'undefined') return visibleCards.desktop

    const width = window.innerWidth
    if (width < 640) return visibleCards.mobile
    if (width < 1024) return visibleCards.tablet  
    if (width < 1536) return visibleCards.desktop
    return visibleCards.large
  }, [visibleCards])

  const [visibleCardsCount, setVisibleCardsCount] = useState(getVisibleCards())

  // Handle resize with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const newCount = getVisibleCards()
        setVisibleCardsCount(newCount)
        // Adjust current index if needed
        if (currentIndex > productCategories.length - newCount) {
          setCurrentIndex(Math.max(0, productCategories.length - newCount))
        }
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [getVisibleCards, currentIndex])

  // Intersection Observer for entrance animations
  useEffect(() => {
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      )
      
      observerRef.current.observe(containerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const nextSlide = useCallback(() => {
    if (isScrolling) return
    
    setIsScrolling(true)
    const maxIndex = Math.max(0, productCategories.length - visibleCardsCount)
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
    setCurrentIndex(nextIndex)
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [currentIndex, visibleCardsCount, isScrolling])

  const prevSlide = useCallback(() => {
    if (isScrolling) return
    
    setIsScrolling(true)
    const maxIndex = Math.max(0, productCategories.length - visibleCardsCount)
    const prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1
    setCurrentIndex(prevIndex)
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [currentIndex, visibleCardsCount, isScrolling])

  const goToSlide = useCallback((index: number) => {
    if (isScrolling) return
    
    setIsScrolling(true)
    setCurrentIndex(Math.max(0, Math.min(index, productCategories.length - visibleCardsCount)))
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [visibleCardsCount, isScrolling])

  // Auto scroll functionality
  useEffect(() => {
    if (autoScroll && isInView && !isDragging && !isScrolling && !hoveredCard && !isReducedMotion) {
      autoScrollTimeoutRef.current = setTimeout(() => {
        nextSlide()
      }, autoScrollDelay)
    }

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
  }, [currentIndex, autoScroll, autoScrollDelay, isInView, isDragging, isScrolling, hoveredCard, isReducedMotion, nextSlide])

  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 320
    
    const width = window.innerWidth
    const gap = width < 640 ? 16 : 24
    
    if (width < 640) return width - 32 // Full width on mobile with padding
    if (width < 1024) return 300 + gap
    return 320 + gap
  }, [])

  // Momentum animation
  useEffect(() => {
    if (Math.abs(velocity) > 0.1 && !isDragging && !isReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const newVelocity = velocity * 0.92 // Friction
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
  }, [velocity, isDragging, scrollLeft, currentIndex, visibleCardsCount, isReducedMotion, getCardWidth])

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
    const threshold = cardWidth * (isTouchDevice ? 0.15 : 0.2)
    
    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else if (Math.abs(velocity) > (isTouchDevice ? 1.5 : 2)) {
      // Momentum scrolling
      const direction = velocity > 0 ? -1 : 1
      const targetIndex = Math.max(0, Math.min(productCategories.length - visibleCardsCount, currentIndex + direction))
      goToSlide(targetIndex)
    }
    
    setDragDelta(0)
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchDevice) return
    e.preventDefault()
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    if (isTouchDevice) return
    handleEnd()
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    if (isDragging) {
      handleEnd()
    }
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
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
  }, [isInView, prevSlide, nextSlide, goToSlide, visibleCardsCount])

  const cardWidth = useMemo(() => getCardWidth(), [getCardWidth])
  
  const translateX = useMemo(() => {
    const offset = isDragging ? dragDelta : 0
    return -currentIndex * cardWidth + offset
  }, [currentIndex, cardWidth, isDragging, dragDelta])

  // Preload images for smoother transitions
  useEffect(() => {
    productCategories.forEach(category => {
      if (category.bgImage) {
        const img = new Image()
        img.src = category.bgImage
      }
    })
  }, [])

  const transitionDuration = isReducedMotion ? '0ms' : isDragging ? '0ms' : '500ms'

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
        `
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute inset-0 opacity-5 ${isReducedMotion ? '' : 'animate-drift'}`}
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0, 255, 255, 0.3) 1px, transparent 0)
            `,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Product
            </span>{" "}
            <span className="text-white">Categories</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our comprehensive range of advanced technology solutions designed for critical applications
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="hidden sm:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full items-center justify-center text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg backdrop-blur-sm"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= productCategories.length - visibleCardsCount}
          className="hidden sm:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full items-center justify-center text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg backdrop-blur-sm"
          aria-label="Next products"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Track */}
        <div 
          ref={scrollRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: `transform ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: isDragging ? 'transform' : 'auto'
            }}
          >
            {productCategories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              const isVisible = isInView && index >= currentIndex - 1 && index <= currentIndex + visibleCardsCount
              const isActive = index === currentIndex
              
              return (
                <div
                  key={category.id}
                  className={`flex-shrink-0 px-2 sm:px-3 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    width: `${cardWidth}px`,
                    transitionDelay: isReducedMotion ? '0ms' : `${Math.max(0, (index - currentIndex) * 50)}ms`
                  }}
                  onMouseEnter={() => !isTouchDevice && setHoveredCard(category.id)}
                  onMouseLeave={() => !isTouchDevice && setHoveredCard(null)}
                >
                  <div
                    className={`relative h-[420px] sm:h-96 md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 ${
                      !isTouchDevice && hoveredCard === category.id ? 'sm:scale-105 shadow-2xl shadow-cyan-500/30' : ''
                    } ${isActive ? 'shadow-xl' : 'shadow-lg'}`}
                    style={{
                      background: `linear-gradient(135deg, ${category.gradient.replace('from-', '').replace(' to-', ', ')})`,
                      transform: isTouchDevice || isReducedMotion ? 'none' : undefined
                    }}
                    onClick={() => isTouchDevice && goToSlide(index)}
                  >
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${category.bgImage})`,
                        opacity: hoveredCard === category.id ? 0.3 : 0.2
                      }}
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px]" />
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${category.gradient.replace('from-', '').replace(' to-', ', ')} 0%, transparent 100%)`
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-5 sm:p-6 text-white">
                      {/* Top Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl sm:text-lg font-semibold mb-2 leading-tight">
                            {category.title}
                          </h3>
                          <p className="text-sm text-white/80 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Products List - Always visible on mobile, hover on desktop */}
                      <div className={`transition-all duration-500 transform ${
                        isTouchDevice || hoveredCard === category.id 
                          ? 'opacity-100 translate-y-0 max-h-60' 
                          : 'opacity-0 translate-y-4 max-h-0 sm:opacity-0'
                      } overflow-hidden`}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium mb-3 text-white/90">Products & Services:</h4>
                          <ul className="space-y-2">
                            {category.products.slice(0, isTouchDevice ? 3 : category.products.length).map((product, productIndex) => (
                              <li 
                                key={productIndex}
                                className="text-xs text-white/80 flex items-start transition-all duration-300"
                                style={{
                                  transitionDelay: isReducedMotion ? '0ms' : `${productIndex * 50}ms`
                                }}
                              >
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                <span className="line-clamp-2">{product}</span>
                              </li>
                            ))}
                            {isTouchDevice && category.products.length > 3 && (
                              <li className="text-xs text-white/60 pl-3.5">
                                +{category.products.length - 3} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Hover Indicator - Desktop only */}
                      {!isTouchDevice && (
                        <div className={`hidden sm:flex absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-white/40 items-center justify-center transition-all duration-300 ${
                          hoveredCard === category.id ? 'bg-white/20 scale-110' : 'bg-transparent'
                        }`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Active Card Indicator - Mobile */}
                    {isActive && isTouchDevice && (
                      <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full shadow-lg animate-pulse" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 px-4">
          {Array.from({ length: Math.max(1, productCategories.length - visibleCardsCount + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 sm:w-10 h-2 sm:h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50' 
                  : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/30 hover:bg-white/50 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .animate-drift {
          animation: drift 30s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-drift {
            animation: none;
          }
        }
        
        /* Improve touch scrolling */
        @supports (-webkit-touch-callout: none) {
          .touch-pan-y {
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Optimize for mobile performance */
        @media (max-width: 640px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </section>
  )
}

export default ProductShowcaseCarousel