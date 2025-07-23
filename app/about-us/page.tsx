"use client";

import { 
  Shield, Cpu, Radio, Wrench, ArrowRight, Calendar, Users, Award, Target, Zap, 
  Eye, Heart, Lightbulb, CheckCircle, Globe, Building, Rocket, Star, 
  Phone, Mail, MapPin, ExternalLink, TrendingUp, Layers, Cog, Sparkles,
  MousePointer, Play, ChevronDown, Factory, Microscope, Brain, Wifi
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Navigation from '../../components/navigation';
import Image from 'next/image';

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const heroRef = useRef<HTMLElement>(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  // Mouse tracking for hero parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
      return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Animated entrance
  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats with delay
    const timer = setTimeout(() => {
      setAnimatedStats([2018, 7, 50, 95]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: Shield,
      title: "Advanced Electronic Countermeasures",
      desc: "Deployed cutting-edge jamming systems for convoy protection",
      stat: "100+ Units",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "1KW Power Amplifier",
      desc: "Developed for YLC-6 Radar systems with 99.8% reliability",
      stat: "1000W Output",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Factory,
      title: "Precision Manufacturing",
      desc: "High-precision parts for critical defense applications",
      stat: "±0.01mm Tolerance",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Indigenous Development",
      desc: "Reducing dependency on foreign technology solutions",
      stat: "100% Local R&D",
      gradient: "from-pink-500 to-cyan-500"
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Foundation",
      desc: "RADCON Technologies established with a vision for indigenous defense solutions",
      icon: Rocket,
      image: "company-foundation"
    },
    {
      year: "2019-2020",
      title: "First Breakthroughs",
      desc: "Developed first-generation electronic jammers and RF components",
      icon: Zap,
      image: "first-products"
    },
    {
      year: "2021-2022",
      title: "Scaling Operations",
      desc: "Expanded manufacturing capabilities and established key partnerships",
      icon: TrendingUp,
      image: "manufacturing-facility"
    },
    {
      year: "2023-Present",
      title: "Innovation Leadership",
      desc: "Leading indigenous technology development with advanced R&D",
      icon: Brain,
      image: "innovation-lab"
    }
  ];

  const facilities = [
    {
      title: "R&D Laboratory",
      desc: "State-of-the-art research facility with advanced testing equipment",
      tech: ["RF Testing Chamber", "EMC Lab", "Signal Analysis"],
      image: "rd-lab"
    },
    {
      title: "Manufacturing Floor",
      desc: "Precision manufacturing with CNC machines and quality control",
      tech: ["CNC Machining", "3D/4D Processing", "Quality Assurance"],
      image: "manufacturing-floor"
    },
    {
      title: "Innovation Center",
      desc: "Collaborative workspace for breakthrough technology development",
      tech: ["Prototyping", "Design Studio", "Testing Facility"],
      image: "innovation-center"
    }
  ];

  return (
    <>
      <Navigation />
      
      <div className="pt-20 bg-slate-900 overflow-hidden">
        {/* Epic Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 30, 60, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)
            `
          }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transition: "transform 0.3s ease-out"
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-8 backdrop-blur-sm">
                  <Building className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 font-medium tracking-wide">ABOUT RADCON TECHNOLOGIES</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  Pioneering
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
                    Indigenous
                  </span>
                  <br />
                  Innovation
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                  Since 2018, we've been transforming Pakistan's defense landscape through 
                  cutting-edge indigenous technology solutions that rival global standards.
                </p>

                {/* Interactive Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {[
                    { label: "Established", value: animatedStats[0] || 2018, suffix: "" },
                    { label: "Years Strong", value: animatedStats[1] || 7, suffix: "+" },
                    { label: "Projects", value: animatedStats[2] || 50, suffix: "+" },
                    { label: "Success Rate", value: animatedStats[3] || 95, suffix: "%" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual */}
              <div className={`relative transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Main Image Container */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-cyan-400/30 backdrop-blur-sm bg-slate-800/50">
                    {/* Placeholder for hero image */}
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <Building className="w-24 h-24 text-cyan-400 mx-auto mb-4 opacity-50" />
                        <p className="text-slate-400 text-sm">Hero Image Placeholder</p>
                        <p className="text-slate-500 text-xs mt-2">See AI prompts below</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Achievement Cards */}
                  <div className="absolute -top-6 -right-6 bg-slate-800/90 backdrop-blur border border-cyan-400/30 rounded-xl p-4 animate-float">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-yellow-400" />
                      <div>
                        <div className="text-white font-bold text-lg">100%</div>
                        <div className="text-slate-400 text-xs">Indigenous R&D</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-slate-800/90 backdrop-blur border border-cyan-400/30 rounded-xl p-4 animate-float" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-green-400" />
                      <div>
                        <div className="text-white font-bold text-lg">2018</div>
                        <div className="text-slate-400 text-xs">Established</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="py-20 bg-slate-800/50 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-cyan-400">Journey</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                From a bold vision to industry leadership - the RADCON story of innovation and excellence
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden lg:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div 
                    key={index}
                    className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-slate-900 border-4 border-cyan-400 rounded-full flex items-center justify-center z-10 hidden lg:flex">
                      <item.icon className="w-8 h-8 text-cyan-400" />
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-4">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold text-sm">{item.year}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-slate-300 text-lg leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Image */}
                    <div className={`${index % 2 === 0 ? 'lg:order-last' : ''}`}>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-colors duration-300 group">
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                          <div className="text-center">
                            <item.icon className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
                            <p className="text-slate-400 text-sm">{item.image} Image</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Achievements Grid */}
        <section className="py-20 bg-slate-900 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Key <span className="text-cyan-400">Achievements</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Breakthrough innovations that are reshaping Pakistan's defense technology landscape
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`achievement-card relative h-64 sm:h-72 md:h-80 p-4 md:p-6 rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col ${
                    hoveredCard === index ? 'scale-105 border-cyan-400/50' : ''
                  }`}>
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${achievement.gradient} bg-opacity-20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0`}>
                        <achievement.icon className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
                      </div>

                      {/* Content - Flexible layout */}
                      <div className="flex-1 flex flex-col justify-between min-h-0">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                            {achievement.title}
                          </h3>
                          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 overflow-hidden">
                            {achievement.desc}
                          </p>
                        </div>
                        
                        {/* Stat - Fixed at bottom */}
                        <div className="mt-auto pt-2">
                          <div className="stat text-lg md:text-xl lg:text-2xl font-bold text-cyan-400 leading-tight">
                            {achievement.stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Showcase */}
        <section className="py-20 bg-slate-800/30 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                World-Class <span className="text-cyan-400">Facilities</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                State-of-the-art infrastructure supporting cutting-edge research and manufacturing
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {facilities.map((facility, index) => (
                <div key={index} className="group relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all duration-500 mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                      <div className="text-center">
                        <Factory className="w-20 h-20 text-cyan-400 mx-auto mb-4 opacity-50" />
                        <p className="text-slate-400 text-sm">{facility.image} Image</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Tech Tags */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-2">
                        {facility.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-medium backdrop-blur">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {facility.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision with Interactive Cards */}
        <section className="py-20 bg-slate-900 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              {/* Mission */}
              <div className="group">
                <div className="relative p-8 md:p-12 rounded-3xl border border-slate-700 bg-slate-800/50 backdrop-blur hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Target className="w-10 h-10 text-cyan-400" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        Our Mission
                      </h3>
                    </div>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                      To revolutionize Pakistan's defense technology landscape through indigenous innovation, 
                      delivering world-class solutions that ensure national security while fostering 
                      technological independence and excellence.
                    </p>

                    <div className="space-y-4">
                      {[
                        "Excellence in Engineering & Innovation",
                        "Indigenous Technology Development",
                        "Strategic National Partnership",
                        "Sustainable Defense Solutions"
                      ].map((point, index) => (
                        <div key={index} className="flex items-center gap-4 group/item">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full group-hover/item:scale-125 transition-transform duration-300" />
                          <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="group">
                <div className="relative p-8 md:p-12 rounded-3xl border border-slate-700 bg-slate-800/50 backdrop-blur hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Eye className="w-10 h-10 text-purple-400" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        Our Vision
                      </h3>
                    </div>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                      To be the leading indigenous defense technology powerhouse, recognized globally 
                      for breakthrough innovations that safeguard nations and inspire technological 
                      sovereignty across the developing world.
                    </p>

                    <div className="space-y-4">
                      {[
                        "Global Leadership in Defense Tech",
                        "Innovation Hub for Region",
                        "Technological Sovereignty Champion",
                        "Next-Gen Solution Provider"
                      ].map((point, index) => (
                        <div key={index} className="flex items-center gap-4 group/item">
                          <div className="w-3 h-3 bg-purple-400 rounded-full group-hover/item:scale-125 transition-transform duration-300" />
                          <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ISO Certifications Section */}
        <section className="py-20 bg-slate-800/50 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-8 backdrop-blur-sm">
                <Award className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-medium tracking-wide">CERTIFIED EXCELLENCE</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                International <span className="text-cyan-400">Standards</span> & Certifications
              </h2>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Our commitment to quality is validated through internationally recognized certifications and standards
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
                {[
                  { num: 1, title: "ISO 9001", subtitle: "Quality Management" },
                  { num: 2, title: "ISO 14001", subtitle: "Environmental" },
                  { num: 3, title: "ISO 45001", subtitle: "Health & Safety" },
                  { num: 4, title: "ISO 27001", subtitle: "Information Security" },
                  { num: 5, title: "ISO 13485", subtitle: "Medical Devices" },
                  { num: 6, title: "ISO 50001", subtitle: "Energy Management" }
                ].map((cert) => (
                  <div key={cert.num} className="group cursor-pointer">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl flex flex-col items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-slate-800/70 transition-all duration-300 group-hover:scale-110 p-2">
                      {/* Try SVG first, fallback to styled content */}
                      <img
                        src={`/images/ISO-logo-0${cert.num}.svg`}
                        alt={`${cert.title} Certification`}
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          // Fallback if SVG doesn't load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-content')) {
                            parent.innerHTML = `
                              <div class="fallback-content text-center">
                                <div class="w-8 h-8 mx-auto mb-1 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                                  <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                  </svg>
                                </div>
                                <div class="text-xs font-bold text-cyan-400 leading-tight">${cert.title}</div>
                                <div class="text-xs text-slate-400 leading-tight">${cert.subtitle}</div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-400 text-sm">
                  Committed to maintaining the highest international standards in quality, security, and operational excellence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive CTA Section */}
        <section className="py-20 bg-slate-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                  animation: "grid-move 20s linear infinite"
                }}
              />
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-20"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + Math.sin(i) * 60}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Floating Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-8 backdrop-blur-sm animate-float">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-medium tracking-wide">LET'S COLLABORATE</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Shape the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Future Together?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Join us in revolutionizing defense technology through indigenous innovation and excellence. 
                Let's discuss how we can meet your specific requirements.
              </p>
              
              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Mail className="w-6 h-6" />
                    <span>Email Us</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="group relative overflow-hidden bg-slate-800/50 backdrop-blur border-2 border-cyan-400/50 text-white hover:text-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:border-cyan-400 hover:bg-slate-800/70 w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Phone className="w-6 h-6" />
                    <span>Contact Us</span>
                  </span>
                </button>
              </div>

              {/* Contact Info Preview */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-500/30 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-medium">info@radcon.com.pk</p>
                  </div>
                  
                  <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-500/30 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+92 XXX XXXXXXX</p>
                  </div>
                  
                  <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-500/30 transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-medium">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        /* Responsive text handling */
        @media (max-width: 640px) {
          .achievement-card h3 {
            font-size: 0.9rem;
            line-height: 1.2;
            margin-bottom: 0.5rem;
          }
          
          .achievement-card p {
            font-size: 0.75rem;
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }
          
          .achievement-card .stat {
            font-size: 1rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .achievement-card h3 {
            font-size: 1rem;
            line-height: 1.3;
          }
          
          .achievement-card p {
            font-size: 0.8rem;
            line-height: 1.4;
          }
          
          .achievement-card .stat {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}