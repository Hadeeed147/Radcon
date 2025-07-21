"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { 
  Cog, 
  Cpu, 
  User, 
  Mail, 
  ChevronDown, 
  Zap, 
  Settings, 
  Wrench, 
  Activity,
  Shield,
  Radio,
  Battery,
  Smartphone,
  Eye,
  Navigation as NavigationIcon,
  Plane,
  Radar,
  ChevronRight
} from "lucide-react"
import { useScrollDirection } from "../hooks/use-scroll-direction"

const navItems = [
  { 
    name: "Corporate", 
    icon: User,
    hasDropdown: true,
    dropdownItems: [
      { name: "About Us", href: "#about" },
      { name: "Vision & Mission", href: "#vision" },
      { name: "RADCON Ethical Principles", href: "#ethics" }
    ]
  },
  { 
    name: "Capabilities", 
    icon: Cog,
    hasDropdown: true,
    isMegaMenu: true,
    megaMenuData: {
      domains: [
        {
          title: "RF & Microwave Systems",
          icon: Zap,
          solutions: ["Power Amplifiers", "Filters", "Waveguides", "Communication Systems"]
        },
        {
          title: "Electronic Solutions", 
          icon: Settings,
          solutions: ["Signal Processing", "Remote Control Systems", "Wireless Solutions"]
        },
        {
          title: "Embedded Systems",
          icon: Cpu,
          solutions: ["Control Systems", "Monitoring Equipment", "Custom Electronics"]
        },
        {
          title: "Precision Engineering",
          icon: Wrench,
          solutions: ["CNC Machining", "Mechanical Components", "Custom Fabrication"]
        }
      ]
    }
  },
  { 
    name: "Products", 
    icon: Activity,
    hasDropdown: true,
    isMegaMenu: true,
    hasSubDropdowns: true,
    megaMenuData: {
      domains: [
        {
          title: "Life-Saving Equipment",
          icon: Shield,
          solutions: [
            "RCIED Counter Jammers for Convoy Protection",
            "VHF/UHF and HF Bands",
            "VHF/UHF ISM and GSM 3G/4G/LTE",
            "GPS Jammers",
            "Customized Jammers"
          ]
        },
        {
          title: "RF and Microwave",
          icon: Radio,
          solutions: [
            "RF Amplifiers",
            "Phase Shifters",
            "Antennas",
            "RF Cable Assemblies"
          ]
        },
        {
          title: "Power Systems",
          icon: Battery,
          solutions: [
            "Design of Power Supplies (Customized Requirements)",
            "High Voltage Rectification (30 kV)"
          ]
        },
        {
          title: "Embedded Systems",
          icon: Cpu,
          solutions: ["Details coming soon"]
        },
        {
          title: "Communication Equipment",
          icon: Smartphone,
          solutions: ["VHF/UHF Walkie Talkie Sets"]
        },
        {
          title: "Optronics",
          icon: Eye,
          solutions: ["Details coming soon"]
        },
        {
          title: "Navigation",
          icon: NavigationIcon,
          solutions: ["Details coming soon"]
        },
        {
          title: "Aviation Industry",
          icon: Plane,
          solutions: [
            "Multi-Function Displays (MFD) for Helicopters",
            "Radar Altimeters",
            "Additional products available upon request"
          ]
        },
        {
          title: "Indigenous Development Of Radar Parts",
          icon: Radar,
          solutions: [
            "Camera Modules for Optical Tracking",
            "TFT Displays",
            "Memory Units",
            "Video Amplifier Cards",
            "Control Cards"
          ]
        }
      ]
    }
  },
  { 
    name: "Media", 
    icon: Mail,
    hasDropdown: true,
    dropdownItems: [
      { name: "News & Updates", href: "#news" },
      { name: "Image Gallery", href: "#gallery" }
    ]
  },
  { name: "Contact", icon: Mail, href: "#contact" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Corporate")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
  const [activeMobileSubDropdown, setActiveMobileSubDropdown] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const {isVisible, scrollY } = useScrollDirection()
  const navRef = useRef<HTMLElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const subDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Optimized mouse tracking for spotlight effect using useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove)
      return () => nav.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  // Enhanced cleanup and body scroll management
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking inside the navigation
      if (navRef.current && navRef.current.contains(e.target as Node)) {
        return
      }
      
      if (isMenuOpen) setIsMenuOpen(false)
      setActiveDropdown(null)
      setActiveMobileDropdown(null)
      setActiveSubDropdown(null)
      setActiveMobileSubDropdown(null)
    }

    if (isMenuOpen || activeDropdown || activeMobileDropdown) {
      // Use a slight delay to avoid conflicts with click handlers
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside)
      }, 100)
    }

    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, activeDropdown, activeMobileDropdown])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveItem("Corporate")
  }, [])

  const handleNavClick = useCallback((item: string, href?: string) => {
    setActiveItem(item)
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setActiveMobileDropdown(null)
    setActiveSubDropdown(null)
    setActiveMobileSubDropdown(null)

    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (item === "Corporate") {
      scrollToTop()
    }
  }, [scrollToTop])

  const handleDropdownEnter = useCallback((itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemName)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubDropdown(null)
    }, 150)
  }, [])

  const handleSubDropdownEnter = useCallback((domainTitle: string) => {
    if (subDropdownTimeoutRef.current) {
      clearTimeout(subDropdownTimeoutRef.current)
    }
    setActiveSubDropdown(domainTitle)
  }, [])

  const handleSubDropdownLeave = useCallback(() => {
    subDropdownTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null)
    }, 150)
  }, [])

  const handleMobileDropdownToggle = useCallback((itemName: string) => {
    if (activeMobileDropdown === itemName) {
      setActiveMobileDropdown(null)
      setActiveMobileSubDropdown(null)
    } else {
      setActiveMobileDropdown(itemName)
      setActiveMobileSubDropdown(null) // Reset subdropdowns when switching main dropdowns
    }
  }, [activeMobileDropdown])

  const handleMobileSubDropdownToggle = useCallback((domainTitle: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setActiveMobileSubDropdown(activeMobileSubDropdown === domainTitle ? null : domainTitle)
  }, [activeMobileSubDropdown])

  const scrollProgress = typeof document !== 'undefined' 
    ? Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1) * 100 
    : 0

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ease-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%),
            rgba(0, 0, 0, ${scrollY > 100 ? 0.9 : 0.7})
          `,
          backdropFilter: `blur(${Math.min(scrollY / 10 + 12, 20)}px)`,
          borderImage: "linear-gradient(90deg, #00ffff, #3b82f6, #9333ea) 1",
          borderBottom: "1px solid",
          willChange: "transform, background, backdrop-filter",
        }}
      >
        {/* Animated grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            animation: "grid-move 20s linear infinite",
          }}
        />

        {/* Inner glow effect */}
        <div className="absolute inset-0 border border-cyan-400/20 rounded-none shadow-[inset_0_1px_0_rgba(0,255,255,0.1)]" />

        {/* Scroll progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full relative">
            {/* Enhanced Logo with Actual RADCON Image */}
            <div className="cursor-pointer group relative overflow-hidden" onClick={scrollToTop}>
              {/* Particle effects background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[
                  { left: 10, top: 20 },
                  { left: 80, top: 15 },
                  { left: 25, top: 70 },
                  { left: 60, top: 40 },
                  { left: 90, top: 60 },
                  { left: 40, top: 85 }
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 transition-all duration-300 group-hover:scale-105">
                {/* Actual RADCON Logo */}
                <Image 
                  src="/images/radcon-logo.png" 
                  alt="RADCON Technologies" 
                  width={120}
                  height={64}
                  className="h-16 w-auto filter brightness-0 invert group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300"
                />
                
                {/* Hidden text for SEO and accessibility */}
                <span className="sr-only">RADCON Technologies - RF & Microwave Systems</span>
              </div>

              {/* Breathing glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 animate-breathing" />
            </div>

            {/* Enhanced Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
                >
                  <button
                    onClick={() => handleNavClick(item.name, item.href)}
                    className={`relative text-base font-medium transition-all duration-300 group magnetic-hover flex items-center space-x-1 ${
                      activeItem === item.name ? "text-cyan-400" : "text-gray-300"
                    }`}
                    style={{
                      textShadow: activeItem === item.name ? "0 0 10px rgba(0, 255, 255, 0.5)" : "none",
                      willChange: "transform, color, text-shadow",
                    }}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`} 
                      />
                    )}

                    {/* Liquid gradient underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 ${
                        activeItem === item.name ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{
                        background:
                          activeItem === item.name
                            ? "linear-gradient(90deg, #00ffff, #3b82f6, #9333ea)"
                            : "linear-gradient(90deg, #00ffff, #3b82f6, #9333ea)",
                        animation: activeItem === item.name ? "liquid-flow 3s ease-in-out infinite" : "none",
                      }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute top-full mt-2 z-50"
                      style={{
                        // Centered positioning to prevent overflow
                        ...(item.isMegaMenu ? {
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: item.name === "Products" ? '95vw' : '80vw',
                          maxWidth: item.name === "Products" ? '1200px' : '900px',
                        } : {
                          left: '50%',
                          transform: 'translateX(-50%)',
                          minWidth: '14rem'
                        })
                      }}
                    >
                      {item.isMegaMenu ? (
                        // Enhanced Mega Menu with Sub-dropdowns
                        <div
                          className={`p-6 rounded-xl shadow-2xl border border-cyan-400/30 ${
                            item.name === "Products" ? "max-w-6xl" : "max-w-4xl"
                          }`}
                          style={{
                            background: `
                              linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%),
                              radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
                            `,
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <div className={`grid gap-6 ${
                            item.name === "Products" ? "grid-cols-3" : "grid-cols-2"
                          }`}>
                            {item.megaMenuData?.domains.map((domain) => {
                              const DomainIcon = domain.icon
                              return (
                                <div 
                                  key={domain.title} 
                                  className="group relative"
                                  onMouseEnter={() => item.hasSubDropdowns && handleSubDropdownEnter(domain.title)}
                                  onMouseLeave={() => item.hasSubDropdowns && handleSubDropdownLeave()}
                                >
                                  <div className={`flex items-center justify-between mb-3 p-2 rounded-lg transition-all duration-300 ${
                                    item.hasSubDropdowns ? 'cursor-pointer hover:bg-cyan-400/10' : ''
                                  }`}>
                                    <div className="flex items-center space-x-3">
                                      <DomainIcon className="w-5 h-5 text-cyan-400" />
                                      <h3 className="text-lg font-semibold text-cyan-400">{domain.title}</h3>
                                    </div>
                                    {item.hasSubDropdowns && (
                                      <ChevronRight 
                                        className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${
                                          activeSubDropdown === domain.title ? "rotate-90" : ""
                                        }`} 
                                      />
                                    )}
                                  </div>
                                  
                                  {/* Sub-dropdown for Products */}
                                  {item.hasSubDropdowns && activeSubDropdown === domain.title ? (
                                    <div
                                      className="absolute top-0 w-64 p-4 rounded-xl shadow-2xl border border-cyan-400/30"
                                      style={{
                                        background: `
                                          linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 30, 60, 0.98) 100%),
                                          radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)
                                        `,
                                        backdropFilter: "blur(25px)",
                                        zIndex: 60,
                                        // Smart positioning based on specific domain names and their positions
                                        ...((() => {
                                          // Domains that should open to the LEFT (getting cut off when opening right)
                                          const leftOpeningDomains = [
                                            "Power Systems", // User reported: opens right, gets cut off
                                            "Aviation Industry", 
                                            "Indigenous Development Of Radar Parts"
                                          ];
                                          // All other domains should open to the RIGHT (including Embedded Systems & Navigation per user request)
                                          
                                          if (leftOpeningDomains.includes(domain.title)) {
                                            // Open to the left
                                            return {
                                              right: '100%',
                                              left: 'auto',
                                              marginRight: '8px'
                                            };
                                          } else {
                                            // Open to the right (left and middle columns)
                                            return {
                                              left: '100%',
                                              right: 'auto',
                                              marginLeft: '8px'
                                            };
                                          }
                                        })())
                                      }}
                                    >
                                      <ul className="space-y-2">
                                        {domain.solutions.map((solution, index) => (
                                          <li key={solution}>
                                            <button
                                              onClick={() => handleNavClick(solution)}
                                              className="w-full text-left p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 text-sm group"
                                              style={{
                                                animationDelay: `${index * 50}ms`
                                              }}
                                            >
                                              <div className="flex items-center space-x-2">
                                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                                <span>{solution}</span>
                                              </div>
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : !item.hasSubDropdowns ? (
                                    // Regular mega menu items (for Capabilities)
                                    <ul className="space-y-2">
                                      {domain.solutions.map((solution) => (
                                        <li key={solution}>
                                          <button
                                            onClick={() => handleNavClick(solution)}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm text-left w-full"
                                          >
                                            {solution}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        // Regular Dropdown
                        <div
                          className="w-56 p-4 rounded-xl shadow-2xl border border-cyan-400/30"
                          style={{
                            background: `
                              linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%),
                              radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
                            `,
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <ul className="space-y-2">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <li key={dropdownItem.name}>
                                <button
                                  onClick={() => handleNavClick(dropdownItem.name, dropdownItem.href)}
                                  className="w-full text-left p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
                                >
                                  {dropdownItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group absolute right-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-3" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-3" : ""
                  }`}
                />
              </div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 scale-0 group-active:scale-150 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 transform ${
            isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
          }`}
          style={{
            background: `
              linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%),
              radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
            `,
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0, 255, 255, 0.3)",
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name}>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (item.hasDropdown) {
                        handleMobileDropdownToggle(item.name)
                      } else {
                        handleNavClick(item.name, item.href)
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden ${
                      activeItem === item.name || activeMobileDropdown === item.name
                        ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                        : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-4">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.hasDropdown && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeMobileDropdown === item.name ? "rotate-180" : ""
                          }`} 
                        />
                      )}
                    </div>
                  </button>

                  {/* Mobile Dropdown Content */}
                  {item.hasDropdown && activeMobileDropdown === item.name && (
                    <div
                      className="mt-2 ml-4 space-y-2 transition-all duration-300 transform opacity-100 translate-y-0"
                      style={{
                        maxHeight: item.isMegaMenu ? "600px" : "300px",
                        overflowY: "auto",
                        WebkitOverflowScrolling: "touch"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.isMegaMenu ? (
                        // Enhanced Mobile Mega Menu with Sub-dropdowns
                        <div className="space-y-3 pr-2">
                          {item.megaMenuData?.domains.map((domain) => {
                            const DomainIcon = domain.icon
                            return (
                              <div key={domain.title} className="bg-cyan-400/5 rounded-lg border border-cyan-400/20">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (item.hasSubDropdowns) {
                                      handleMobileSubDropdownToggle(domain.title, e)
                                    }
                                  }}
                                  className="w-full p-3 flex items-center justify-between hover:bg-cyan-400/10 transition-colors duration-200 rounded-lg"
                                >
                                  <div className="flex items-center space-x-2">
                                    <DomainIcon className="w-4 h-4 text-cyan-400" />
                                    <h4 className="text-sm font-semibold text-cyan-400">{domain.title}</h4>
                                  </div>
                                  {item.hasSubDropdowns && (
                                    <ChevronDown 
                                      className={`w-3 h-3 text-cyan-400 transition-transform duration-300 ${
                                        activeMobileSubDropdown === domain.title ? "rotate-180" : ""
                                      }`} 
                                    />
                                  )}
                                </button>
                                
                                {/* Mobile Sub-dropdown */}
                                {item.hasSubDropdowns && activeMobileSubDropdown === domain.title && (
                                  <div className="px-3 pb-3 space-y-1">
                                    {domain.solutions.map((solution) => (
                                      <button
                                        key={solution}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleNavClick(solution)
                                        }}
                                        className="block w-full text-left text-xs text-gray-400 hover:text-cyan-300 py-2 px-3 rounded transition-colors duration-200 hover:bg-cyan-400/5"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                                          <span>{solution}</span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Regular mobile mega menu items (for non-subdropdown items) */}
                                {!item.hasSubDropdowns && (
                                  <div className="px-3 pb-3 space-y-1">
                                    {domain.solutions.map((solution) => (
                                      <button
                                        key={solution}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleNavClick(solution)
                                        }}
                                        className="block w-full text-left text-xs text-gray-400 hover:text-cyan-300 py-1 px-2 rounded transition-colors duration-200"
                                      >
                                        {solution}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        // Regular Mobile Dropdown
                        <div className="space-y-1 pr-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem.name, dropdownItem.href)}
                              className="block w-full text-left p-3 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-200 text-sm"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-energy {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3);
            transform: scale(1.02);
          }
        }

        @keyframes breathing {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes liquid-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .magnetic-hover {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .magnetic-hover:hover {
          transform: translateY(-2px) scale(1.05);
        }

        /* Custom scrollbar for mobile menu */
        .mobile-menu-content::-webkit-scrollbar {
          width: 3px;
        }

        .mobile-menu-content::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }

        .mobile-menu-content::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.5);
          border-radius: 3px;
        }

        .mobile-menu-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </>
  )
}