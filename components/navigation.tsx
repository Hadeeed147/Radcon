"use client"

import { useState, useEffect, useRef } from "react"
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
  Radar
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const {isVisible, scrollY } = useScrollDirection()
  const navRef = useRef<HTMLElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const nav = navRef.current
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove)
      return () => nav.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Close mobile menu when clicking outside and handle body scroll
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false)
      setActiveDropdown(null)
      setActiveMobileDropdown(null)
    }

    if (isMenuOpen || activeDropdown || activeMobileDropdown) {
      document.addEventListener("click", handleClickOutside)
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveItem("Corporate")
  }

  const handleNavClick = (item: string, href?: string) => {
    setActiveItem(item)
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setActiveMobileDropdown(null)

    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (item === "Corporate") {
      scrollToTop()
    }
  }

  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleMobileDropdownToggle = (itemName: string) => {
    setActiveMobileDropdown(activeMobileDropdown === itemName ? null : itemName)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

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
          <div className="flex items-center justify-between h-full">
            {/* Enhanced Logo with Actual RADCON Image */}
            <div className="pl-6 cursor-pointer group relative overflow-hidden" onClick={scrollToTop}>
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

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
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
                    <div className="absolute top-full left-0 mt-2 z-50">
                      {item.isMegaMenu ? (
                        // Mega Menu for Capabilities and Products
                        <div
                          className={`p-6 rounded-xl shadow-2xl border border-cyan-400/30 ${
                            item.name === "Products" ? "w-[90vw] max-w-5xl" : "w-screen max-w-4xl"
                          }`}
                          style={{
                            background: `
                              linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%),
                              radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
                            `,
                            backdropFilter: "blur(20px)",
                            transform: item.name === "Products" ? "translateX(-75%)" : "translateX(-50%)",
                            left: item.name === "Products" ? "75%" : "50%"
                          }}
                        >
                          <div className={`grid gap-6 ${
                            item.name === "Products" ? "grid-cols-3" : "grid-cols-2"
                          }`}>
                            {item.megaMenuData?.domains.map((domain) => {
                              const DomainIcon = domain.icon
                              return (
                                <div key={domain.title} className="group">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <DomainIcon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="text-lg font-semibold text-cyan-400">{domain.title}</h3>
                                  </div>
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
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
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

        {/* Mobile Menu */}
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
                    onClick={() => {
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
                      className={`mt-2 ml-4 space-y-2 transition-all duration-300 transform ${
                        activeMobileDropdown === item.name ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      }`}
                      style={{
                        maxHeight: item.isMegaMenu ? "500px" : "300px",
                        overflowY: "auto",
                        WebkitOverflowScrolling: "touch"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.isMegaMenu ? (
                        // Mobile Mega Menu for Capabilities and Products
                        <div className="space-y-4 pr-2">
                          {item.megaMenuData?.domains.map((domain) => {
                            const DomainIcon = domain.icon
                            return (
                              <div key={domain.title} className="bg-cyan-400/5 rounded-lg p-3 border border-cyan-400/20">
                                <div className="flex items-center space-x-2 mb-2">
                                  <DomainIcon className="w-4 h-4 text-cyan-400" />
                                  <h4 className="text-sm font-semibold text-cyan-400">{domain.title}</h4>
                                </div>
                                <div className="space-y-1">
                                  {domain.solutions.map((solution) => (
                                    <button
                                      key={solution}
                                      onClick={() => handleNavClick(solution)}
                                      className="block w-full text-left text-xs text-gray-400 hover:text-cyan-300 py-1 px-2 rounded transition-colors duration-200"
                                    >
                                      {solution}
                                    </button>
                                  ))}
                                </div>
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
      `}</style>
    </>
  )
}