"use client";

import { Shield, Cpu, Radio, Wrench, ArrowRight, Calendar, Users, Award, Target, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [floatingShapes, setFloatingShapes] = useState<Array<{top: string, left: string}>>([]);

  // Simple intersection observer simulation for scroll animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Generate floating shapes positions after hydration to avoid SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
    setFloatingShapes([
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }
    ]);
  }, []);

  const capabilities = [
    {
      icon: Radio,
      title: "Electronic Systems",
      desc: "Advanced jamming and countermeasure solutions",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "RF & Microwave",
      desc: "High-power amplifiers and precision components",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Cpu,
      title: "Embedded Solutions",
      desc: "Smart control systems and surveillance tech",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Wrench,
      title: "Precision Manufacturing",
      desc: "Custom fabrication and mechanical engineering",
      gradient: "from-pink-500 to-cyan-500"
    }
  ];

  const stats = [
    { number: "2018", label: "Founded", icon: Calendar },
    { number: "4", label: "Core Technologies", icon: Target },
    { number: "100%", label: "Indigenous R&D", icon: Award }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {/* Floating geometric shapes with subtle animation */}
        {isHydrated && floatingShapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute w-24 h-24 border border-cyan-400 rounded-lg transform rotate-45 animate-pulse`}
            style={{
              top: shape.top,
              left: shape.left,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
        
        {/* Circuit pattern lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Staggered Animation */}
        <div className="text-center mb-12 md:mb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30 mb-6 hover:bg-cyan-500/30 transition-colors duration-300">
              <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">ABOUT RADCON</span>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse">Indigenous</span><br />
              Technology Solutions
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Since 2018, we&apos;ve been transforming complex engineering challenges into innovative solutions, 
              specializing in cutting-edge electronics and precision manufacturing.
            </p>
          </div>
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16 md:mb-20">
          {/* Left: Mission & Values */}
          <div className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Mission Card */}
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 hover:border-cyan-400/50 hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <Target className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Our Mission</h3>
                  <p className="text-slate-400 text-sm md:text-base">Innovation Through Excellence</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                We drive technological advancement through indigenous development across critical domains 
                including electronics, embedded systems, RF engineering, and precision manufacturing.
              </p>
            </div>

            {/* Values Card */}
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 hover:border-cyan-400/50 hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <Users className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Our Values</h3>
                  <p className="text-slate-400 text-sm md:text-base">Quality & Reliability</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Committed to delivering world-class solutions with uncompromising quality standards, 
                serving industrial and technology sectors with proven expertise.
              </p>
            </div>
          </div>

          {/* Right: Interactive Capabilities Grid */}
          <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center lg:text-left">Core Capabilities</h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <div 
                  key={index}
                  className={`group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 cursor-pointer transition-all duration-500 hover:border-cyan-400/50 hover:bg-slate-800/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 ${hoveredCard === index ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${capability.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`} />
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${capability.gradient} bg-opacity-20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <capability.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 truncate">
                        {capability.title}
                      </h4>
                      <p className="text-slate-400 text-xs md:text-sm leading-tight">
                        {capability.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div className={`grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-2 md:mb-4 flex justify-center">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-slate-400 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive CTA Button */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/about-us">
            <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900">
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <span className="relative text-sm md:text-base">Discover Our Story</span>
              <ArrowRight className="relative w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}