import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [time, setTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Index", path: "/" },
    { name: "About", path: "/about" },
    { name: "Research", path: "/projects" },
    { name: "Awards", path: "/awards" },
  ];

  // Detect whether the current page is a dark themed page or a light themed page
  const isDarkPage = location.pathname === "/" || location.pathname.startsWith("/projects");

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 border-b z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-300 backdrop-blur-md ${
      isDarkPage 
        ? "bg-[#050505]/90 border-white/10 text-white" 
        : "bg-[#f5f2ed]/90 border-black/10 text-black"
    }`}>
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Rotating Matrix Green tag logo */}
          <div className="w-8 h-8 bg-[#00FF41] text-black font-mono text-[11px] font-black flex items-center justify-center tracking-tighter shadow-[0_0_15px_rgba(0,255,65,0.4)] group-hover:rotate-12 transition-transform duration-300">
            SJ
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-tight leading-none">SABIR JAN</span>
            <span className="font-mono text-[8px] opacity-40 leading-none mt-1 hidden sm:inline">(33.6844° N, 73.0479° E)</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className={`hidden lg:flex gap-1 border-l pl-6 ${isDarkPage ? "border-white/10" : "border-black/10"}`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`px-5 py-2 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${
                  isActive 
                    ? isDarkPage 
                      ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]" 
                      : "bg-black text-white"
                    : isDarkPage
                      ? "text-white/60 hover:text-[#00FF41] hover:bg-white/5"
                      : "text-black/60 hover:text-accent hover:bg-black/5"
                }`}
              >
                / {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Clock, Status & Mobile Burger */}
      <div className="flex items-center gap-6 font-mono text-[10px] uppercase font-bold tracking-[0.15em]">
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
          </span>
          <span className={`${isDarkPage ? "text-white/40" : "text-black/40"}`}>STATUS // ACTIVE</span>
        </div>
        <div className={`${isDarkPage ? "text-white/60" : "text-black/60"} flex items-center gap-1.5`}>
          <span>PK //</span>
          <span className="font-mono tabular-nums font-black">{time || "00:00:00"}</span>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-md ${isDarkPage ? "hover:bg-white/5" : "hover:bg-black/5"}`}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={`absolute top-20 left-0 w-full py-6 border-b flex flex-col items-center gap-4 lg:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200 ${
          isDarkPage 
            ? "bg-[#050505] border-white/10 text-white" 
            : "bg-[#f5f2ed] border-black/10 text-black"
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-[85%] text-center py-3 font-mono text-xs uppercase font-black tracking-widest transition-all ${
                  isActive 
                    ? isDarkPage 
                      ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]" 
                      : "bg-black text-white"
                    : isDarkPage
                      ? "text-white/60 hover:text-[#00FF41] hover:bg-white/5"
                      : "text-black/60 hover:text-accent hover:bg-black/5"
                }`}
              >
                / {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
