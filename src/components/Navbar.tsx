import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Index", path: "/" },
    { name: "About", path: "/about" },
    { name: "Research", path: "/projects" },
    { name: "Awards", path: "/awards" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 border-b border-black bg-white/90 backdrop-blur-md z-[100] flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-5 h-5 bg-black group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-display font-bold text-xl tracking-tighter uppercase">SJ.</span>
        </Link>
        <div className="hidden lg:flex gap-1 border-l border-black/10 pl-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`px-4 py-1 font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${
                location.pathname === link.path ? "bg-black text-white" : "hover:text-accent"
              }`}
            >
              / {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8 font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-black/40">
        <div className="hidden md:block">STATUS // ACTIVE_RESEARCH</div>
        <div>PK // {time}</div>
      </div>
    </nav>
  );
}
