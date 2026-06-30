import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Download, 
  ExternalLink, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles,
  Award as AwardIcon,
  X,
  XCircle,
  Eye
} from "lucide-react";
import data from "../data.json";
import { PDFViewer } from "../components/PDFViewer";

export default function About() {
  const { education, experience, profile } = data;

  // Modal State
  const [modalAsset, setModalAsset] = useState<{
    file: string;
    title: string;
    org: string;
    year: string;
    type?: string;
  } | null>(null);

  const [hasLoadError, setHasLoadError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when modal is open (preserves exact scroll position)
  useEffect(() => {
    if (modalAsset) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAsset]);

  // Reset load error state when modal content changes
  useEffect(() => {
    setHasLoadError(false);
  }, [modalAsset]);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalAsset(null);
      }
    };
    if (modalAsset) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalAsset]);

  // Focus trap
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Direct focus inside modal when it opens
  useEffect(() => {
    if (modalAsset && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll('button, [href]');
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [modalAsset]);

  const certificates = [
    {
      title: "Cisco Python Essentials 1",
      issuer: "Cisco Networking Academy",
      date: "Issued May 28, 2026",
      link: "https://www.credly.com/badges/c530d7d8-eb17-41e9-b8b2-21dd5e1c290e/linked_in?t=tfrs8p",
    },
    {
      title: "Microsoft Azure AI Fundamentals (AI-900)",
      issuer: "Microsoft Certified",
      date: "Issued May 23, 2026",
      link: "https://learn.microsoft.com/en-us/users/sabirjan-0562/credentials/7985d58103f74859",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI & Andrew Ng",
      date: "Issued May 2026",
      link: `${import.meta.env.BASE_URL}assets/NEW_CERTIFICATES.pdf`,
    }
  ];

  const competencies = [
    {
      category: "Machine Learning",
      icon: <Cpu className="w-5 h-5 text-[#00FF41]" />,
      details: "Designing and training deep neural networks for advanced regression, classification, and predictive tasks."
    },
    {
      category: "Agentic AI Systems",
      icon: <Layers className="w-5 h-5 text-[#00FF41]" />,
      details: "Architecting autonomous, goal-driven multi-agent frameworks capable of complex decision-making loops."
    },
    {
      category: "FastAPI Development",
      icon: <Sparkles className="w-5 h-5 text-[#00FF41]" />,
      details: "Building high-performance, asynchronous REST APIs with auto-generated documentation and strict type validation."
    },
    {
      category: "LangGraph Workflows",
      icon: <Layers className="w-5 h-5 text-[#00FF41]" />,
      details: "Orchestrating stateful, cyclic multi-agent graph architectures for specialized logical reasoning workflows."
    },
    {
      category: "LLM Applications",
      icon: <Cpu className="w-5 h-5 text-[#00FF41]" />,
      details: "Integrating advanced LLM logic for intelligent data synthesis, quiz generation, and personalized learning."
    },
    {
      category: "Computer Vision",
      icon: <Sparkles className="w-5 h-5 text-[#00FF41]" />,
      details: "Deploying edge image/video tracking pipelines and optimizing convolutional architectures for local processing."
    },
    {
      category: "Wi-Fi CSI Research",
      icon: <Award className="w-5 h-5 text-[#00FF41]" />,
      details: "Capturing and pre-processing wireless telemetry signals for non-intrusive human activity and emotion classification."
    },
    {
      category: "Educational AI Systems",
      icon: <GraduationCap className="w-5 h-5 text-[#00FF41]" />,
      details: "Developing adaptive learning platforms featuring recall mechanics and automated performance diagnostics."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 bg-[#08080A] text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* MOBILE HERO BLOCK (visible only on screens < md) */}
        <div className="block md:hidden mb-8">
          <div className="grid grid-cols-12 gap-3 items-stretch">
            
            {/* Left compact profile card */}
            <div className="col-span-5 sm:col-span-4 border border-white/10 p-3 bg-[#0E0E12] rounded-lg relative overflow-hidden flex flex-col justify-between">
              {/* Subtle Tech grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />
              
              {/* Glowing decorative corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]" />
              
              <div className="relative z-10 flex flex-col items-center h-full justify-between">
                {/* Cybernetic Biometric Portrait Container */}
                <div className="relative w-full aspect-[1/1] sm:aspect-[3/4] mx-auto bg-black border border-white/5 overflow-hidden mb-2 rounded">
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/Profie_Picture.JPG`} 
                    alt="Sabir Jan Portrait" 
                    className="w-full h-full object-cover object-top grayscale opacity-85"
                  />
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-[1.5px] bg-[#00FF41]/40 shadow-[0_0_8px_#00FF41] pointer-events-none"
                  />
                </div>

                <div className="text-center w-full mt-1">
                  <h2 className="font-display text-sm sm:text-lg font-black uppercase tracking-tight text-white leading-tight">
                    Sabir Jan
                  </h2>
                  <p className="font-mono text-[7px] sm:text-[8px] text-accent uppercase tracking-wider font-bold leading-none mt-0.5">
                    AI/ML Engineer
                  </p>
                </div>

                <div className="w-full border-t border-white/5 pt-1.5 mt-2 flex flex-col gap-1 font-mono text-[6px] sm:text-[8px] text-white/60">
                  <div className="flex justify-between items-center">
                    <span>LOC:</span>
                    <span className="text-white text-right">Islamabad</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>STATUS:</span>
                    <span className="text-[#00FF41] font-bold text-right">OPEN</span>
                  </div>
                </div>

                {/* Social Anchors Compact */}
                <div className="flex gap-1 mt-2 w-full justify-center">
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-1 bg-white/5 border border-white/10 rounded text-white hover:text-[#00FF41]">
                    <Github className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </a>
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 bg-white/5 border border-white/10 rounded text-white hover:text-[#00FF41]">
                    <Linkedin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </a>
                  <a href={`mailto:${profile.email}`} className="p-1 bg-white/5 border border-white/10 rounded text-white hover:text-[#00FF41]">
                    <Mail className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right WHO I AM */}
            <div className="col-span-7 sm:col-span-8 flex flex-col justify-center pl-2">
              <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-white/40 mb-1">
                <span>01 // THE SYNTHESIS</span>
                <span className="w-4 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight text-white mb-2 leading-none">
                Who I Am
              </h3>
              
              <div className="font-sans text-[#9CA3AF] space-y-1.5 sm:space-y-3 text-[10px] sm:text-sm leading-relaxed">
                <p className="text-white/95 font-medium leading-relaxed">
                  I am <span className="text-white font-black">Sabir Jan</span>, a Computer Engineering graduate from <span className="text-white">COMSATS Islamabad</span>. I build intelligent apps combining modern AI models with practical engineering to solve real-world problems.
                </p>
                <p className="leading-relaxed">
                  Specializing in <span className="text-white font-semibold">Agentic AI</span>, <span className="text-white font-semibold">ML</span>, and <span className="text-white font-semibold">Computer Vision</span>. Developed <span className="text-[#00FF41] font-semibold">EmotiFi</span> (contactless Wi-Fi CSI emotion recognition) and <span className="text-[#00FF41] font-semibold">AI Study Assistant</span>.
                </p>
                <p className="hidden sm:block leading-relaxed">
                  Outside engineering, I am an award-winning choreographer. I blend technical problem-solving with creative expression to build highly intelligent, human-centered systems.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Asymmetrical Split Grid Layout (12 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDEBAR COLUMN: Sticky Profile/Metadata Card (Col-Span 4 or 5) */}
          <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-32 space-y-4 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block border border-white/10 p-4 md:p-6 bg-[#0E0E12] shadow-2xl relative overflow-hidden group rounded-lg"
            >
              {/* Subtle Tech grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />
              
              {/* Glowing decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00FF41]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF41]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF41]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00FF41]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-full flex justify-between items-center text-[9px] font-mono text-white/40 mb-3 md:mb-4 tracking-widest uppercase">
                  <span>SYS_PORTRAIT // SP_2026</span>
                  <span className="text-[#00FF41] animate-pulse">● CONNECTED</span>
                </div>

                {/* Cybernetic Biometric Portrait Container */}
                <div className="relative w-[150px] sm:w-[180px] md:w-full h-[180px] sm:h-[220px] md:h-auto md:aspect-[3/4] mx-auto bg-black border border-white/5 overflow-hidden mb-4 md:mb-6 group-hover:border-[#00FF41]/40 group-hover:shadow-[0_0_25px_rgba(0,255,65,0.25)] transition-all duration-500 rounded-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/Profie_Picture.JPG`} 
                    alt="Sabir Jan Portrait" 
                    className="w-full h-full object-cover object-top grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 font-sans"
                    onError={(e) => {
                      // Fallback if image doesn't render
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className = "absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-[#00FF41]/20";
                        fallback.innerHTML = `<span class='font-display text-5xl font-black text-white'>SJ</span><span class='font-mono text-[9px] text-[#00FF41] mt-2 tracking-widest'>AMB_CORPS</span>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  
                  {/* Active Scanning Laser Line Simulation */}
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-[2px] bg-[#00FF41]/40 shadow-[0_0_8px_#00FF41] pointer-events-none"
                  />
                  
                  {/* Overlay technical labels */}
                  <div className="absolute bottom-2 left-2 bg-black/80 px-1.5 py-0.5 border border-white/10 font-mono text-[7px] md:text-[8px] text-white/50 tracking-wider">
                    TARGET: COMSATS_GRAD
                  </div>
                </div>

                {/* Meta details */}
                <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white text-center leading-none mb-1 md:mb-2">
                  Sabir Jan
                </h2>
                <p className="font-mono text-[9px] md:text-[10px] text-accent uppercase tracking-widest font-bold mb-3 md:mb-6 text-center">
                  AI & Machine Learning Engineer
                </p>

                {/* Structured Metadata diagnostics */}
                <div className="w-full border-t border-b border-white/5 py-2.5 md:py-4 my-1 md:my-2 space-y-1.5 md:space-y-2.5 font-mono text-[9px] md:text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">LOCATION:</span>
                    <span className="flex items-center gap-1 text-white/90">
                      <MapPin className="w-3 h-3 text-[#00FF41]" /> Islamabad, PK
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">SPECIALTY:</span>
                    <span className="text-white/90 uppercase tracking-tight text-right">Machine Learning & AI</span>
                  </div>
                  <div className="hidden md:flex justify-between items-center">
                    <span className="text-white/40">FRAMEWORK:</span>
                    <span className="text-white/90 font-black">LANGGRAPH / FASTAPI</span>
                  </div>
                  <div className="hidden md:flex justify-between items-center">
                    <span className="text-white/40">FOCUS:</span>
                    <span className="text-white/90">ADAPTIVE LEARNING SYSTEMS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">STATUS:</span>
                    <span className="text-[#00FF41] font-bold text-right">OPEN TO OPPORTUNITIES</span>
                  </div>
                </div>

                {/* Social Anchors */}
                <div className="flex gap-3 mt-4 md:mt-6 w-full justify-center">
                  <a 
                    href={profile.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 md:p-3 bg-white/5 hover:bg-[#00FF41]/10 border border-white/10 hover:border-[#00FF41]/30 transition-all rounded text-white hover:text-[#00FF41]"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                  <a 
                    href={profile.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 md:p-3 bg-white/5 hover:bg-[#00FF41]/10 border border-white/10 hover:border-[#00FF41]/30 transition-all rounded text-white hover:text-[#00FF41]"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="p-2 md:p-3 bg-white/5 hover:bg-[#00FF41]/10 border border-white/10 hover:border-[#00FF41]/30 transition-all rounded text-white hover:text-[#00FF41]"
                    title="Email Sabir"
                  >
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Metrics Diagnostics Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="border border-white/5 p-3 md:p-4 bg-[#0A0A0E] rounded">
                <div className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">Active Trace</div>
                <div className="font-display text-base md:text-xl font-bold text-white tracking-tight">2018 – 2026</div>
              </div>
              <div className="border border-white/5 p-3 md:p-4 bg-[#0A0A0E] rounded">
                <div className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">CSI Accuracy</div>
                <div className="font-display text-base md:text-xl font-bold text-[#00FF41] tracking-tight">90% +</div>
              </div>
              <div className="border border-white/5 p-3 md:p-4 bg-[#0A0A0E] rounded">
                <div className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">Agent Pipelines</div>
                <div className="font-display text-base md:text-xl font-bold text-white tracking-tight">Production</div>
              </div>
              <div className="border border-white/5 p-3 md:p-4 bg-[#0A0A0E] rounded">
                <div className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">Creative Union</div>
                <div className="font-display text-base md:text-xl font-bold text-[#00FF41] tracking-tight">Dual-Identity</div>
              </div>
            </div>

            {/* Curriculum Dossier Instant Download */}
            <div className="border border-white/5 p-3 md:p-4 bg-[#0A0A0E] rounded">
              <div className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mb-1.5 md:mb-2">Curriculum Dossier</div>
              <a 
                href={profile.socials.cv} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-white text-black hover:bg-[#00FF41] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all font-mono font-black py-2.5 md:py-3 text-center uppercase text-[9px] md:text-[10px] tracking-widest flex items-center justify-center gap-1.5 md:gap-2 rounded"
              >
                <Download className="w-3 h-3 md:w-3.5 md:h-3.5" /> Download CV PDF
              </a>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT COLUMN: Rich Personal/Engineering Narrative (Col-Span 7 or 8) */}
          <div className="md:col-span-7 lg:col-span-8 space-y-12 md:space-y-20 lg:pl-6">
            
            {/* WHO I AM */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:block space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/40">
                <span>01 // THE SYNTHESIS</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Who I Am
              </h3>
              
              <div className="font-sans text-[#9CA3AF] space-y-5 md:space-y-6">
                {/* Introduction */}
                <div className="space-y-1.5 md:space-y-2 border-l border-white/5 pl-4 hover:border-[#00FF41]/20 transition-colors">
                  <div className="font-mono text-[8px] md:text-[9px] text-[#00FF41] uppercase tracking-widest font-black">// INTRODUCTION</div>
                  <p className="text-white/95 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                    I am <span className="text-white font-black">Sabir Jan</span>, a Computer Engineering graduate from <span className="text-white">COMSATS University Islamabad</span>. I build intelligent applications combining modern AI models with practical software engineering to solve real-world problems.
                  </p>
                </div>

                {/* Technical Focus */}
                <div className="space-y-1.5 md:space-y-2 border-l border-white/5 pl-4 hover:border-[#00FF41]/20 transition-colors">
                  <div className="font-mono text-[8px] md:text-[9px] text-[#00FF41] uppercase tracking-widest font-black">// TECHNICAL FOCUS</div>
                  <p className="text-[#9CA3AF] text-xs sm:text-sm md:text-base leading-relaxed">
                    My research focuses on <span className="text-white font-semibold">Agentic AI</span>, <span className="text-white font-semibold">Machine Learning</span>, <span className="text-white font-semibold">Computer Vision</span>, and <span className="text-white font-semibold">Multi-Agent Systems</span>. I design efficient, scalable, and user-centered architectures that can better understand and assist human activity.
                  </p>
                </div>

                {/* Recent Projects */}
                <div className="space-y-1.5 md:space-y-2 border-l border-white/5 pl-4 hover:border-[#00FF41]/20 transition-colors">
                  <div className="font-mono text-[8px] md:text-[9px] text-[#00FF41] uppercase tracking-widest font-black">// RECENT PROJECTS</div>
                  <p className="text-[#9CA3AF] text-xs sm:text-sm md:text-base leading-relaxed">
                    My recent work includes <span className="text-[#00FF41] font-semibold">EmotiFi</span> (contactless Wi-Fi CSI emotion recognition preserving privacy) and an <span className="text-[#00FF41] font-semibold">AI Study Assistant</span> (stateful multi-agent system powered by LangGraph, FastAPI, and Gemini).
                  </p>
                </div>

                {/* Creative Background */}
                <div className="space-y-1.5 md:space-y-2 border-l border-white/5 pl-4 hover:border-[#00FF41]/20 transition-colors">
                  <div className="font-mono text-[8px] md:text-[9px] text-[#00FF41] uppercase tracking-widest font-black">// CREATIVE BACKGROUND</div>
                  <p className="text-[#9CA3AF] text-xs sm:text-sm md:text-base leading-relaxed">
                    Outside engineering, I am an award-winning cultural performer and choreographer. I blend technical problem-solving with creative expression to build systems that are both highly intelligent and deeply human-centered.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* CORE COMPETENCIES */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white/40">
                <span>02 // CAPABILITIES METRICS</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Core Competencies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competencies.map((comp, idx) => (
                  <div 
                    key={idx}
                    className="border border-white/5 p-8 bg-[#0E0E12] hover:border-[#00FF41]/20 transition-all duration-300 rounded"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 bg-[#00FF41]/5 rounded border border-[#00FF41]/10">
                        {comp.icon}
                      </div>
                      <h4 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                        {comp.category}
                      </h4>
                    </div>
                    <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">
                      {comp.details}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* VERIFIED CREDENTIALS */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white/40">
                <span>03 // PROFESSIONAL CERTIFICATION LOGS</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Verified Credentials
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {certificates.map((cert, idx) => {
                  const isLocal = cert.link.includes("/assets") || cert.link.includes("assets");
                  if (isLocal) {
                    return (
                      <button 
                        key={idx}
                        onClick={() => {
                          setModalAsset({
                            file: cert.link,
                            title: cert.title,
                            org: cert.issuer,
                            year: cert.date.replace("Issued ", ""),
                            type: cert.link.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                          });
                        }}
                        className="group w-full text-left border border-white/5 hover:border-[#00FF41]/30 p-6 bg-[#0E0E12] hover:bg-[#121217] transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="p-2 bg-[#00FF41]/10 rounded shrink-0 border border-[#00FF41]/30 mt-1">
                            <ShieldCheck className="w-4 h-4 text-[#00FF41]" />
                          </div>
                          <div>
                            <h4 className="font-display text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#00FF41] transition-colors leading-snug">
                              {cert.title}
                            </h4>
                            <p className="font-mono text-[10px] text-white/50 uppercase mt-1 tracking-wider">
                              Issuer: {cert.issuer}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                          <span className="font-mono text-[10px] text-white/40 hover:text-white group-hover:text-white uppercase">
                            {cert.date}
                          </span>
                          <div className="p-2 border border-white/10 rounded group-hover:border-[#00FF41] group-hover:text-[#00FF41] transition-all flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-white/70 group-hover:text-[#00FF41]" />
                          </div>
                        </div>
                      </button>
                    );
                  }
                  return (
                    <a 
                      key={idx}
                      href={cert.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group border border-white/5 hover:border-[#00FF41]/30 p-6 bg-[#0E0E12] hover:bg-[#121217] transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2 bg-[#00FF41]/10 rounded shrink-0 border border-[#00FF41]/30 mt-1">
                          <ShieldCheck className="w-4 h-4 text-[#00FF41]" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#00FF41] transition-colors leading-snug">
                            {cert.title}
                          </h4>
                          <p className="font-mono text-[10px] text-white/50 uppercase mt-1 tracking-wider">
                            Issuer: {cert.issuer}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <span className="font-mono text-[10px] text-white/40 hover:text-white group-hover:text-white uppercase">
                          {cert.date}
                        </span>
                        <div className="p-2 border border-white/10 rounded group-hover:border-[#00FF41] group-hover:text-[#00FF41] transition-all flex items-center justify-center">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-[#00FF41]" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.section>

            {/* OPERATIONAL TRACE */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white/40">
                <span>04 // CAREER EVENT STREAMS</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Operational Trace
              </h3>

              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div 
                    key={i} 
                    className="p-8 border border-white/5 bg-[#0E0E12] hover:border-white/10 group transition-all duration-400 rounded relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                      <div>
                        <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest font-black block mb-2">
                          // EXP_{i+1}
                        </span>
                        <h4 className="font-display text-2xl font-black uppercase text-white leading-none mb-2">
                          {exp.role}
                        </h4>
                        <div className="font-serif italic text-base text-white/60">
                          {exp.company} // <span className="text-white/40 not-italic uppercase font-mono text-[10px] tracking-widest">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] px-3 py-1 bg-white/5 border border-white/10 text-white/70 tracking-widest uppercase rounded">
                          {exp.period}
                        </span>
                        {exp.certificate && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: exp.certificate,
                                title: `${exp.role} Verification Certificate`,
                                org: exp.company,
                                year: exp.period,
                                type: exp.certificate.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="p-2 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all rounded flex items-center justify-center min-h-[38px] min-w-[38px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                            title="View Verification Certificate"
                            aria-label={`View Verification Certificate for ${exp.role}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.details.map((detail, di) => (
                        <li key={di} className="flex gap-3 items-start text-[#9CA3AF]">
                          <span className="w-1.5 h-1.5 bg-[#00FF41] mt-2 shrink-0 rounded-full" />
                          <span className="text-sm font-light leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SCHOLASTIC TRACE */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white/40">
                <span>05 // ACADEMIC REGISTER ARCHIVES</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                Scholastic Trace
              </h3>

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div 
                    key={i}
                    className="p-6 md:p-8 border border-white/5 bg-[#0E0E12] hover:border-white/10 transition-all duration-400 rounded relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                      <div>
                        <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest font-black block mb-2">
                          // REG_{i+1}
                        </span>
                        <h4 className="font-display text-xl md:text-2xl font-black uppercase text-white leading-none mb-2">
                          {edu.degree}
                        </h4>
                        <div className="font-serif italic text-sm md:text-base text-white/60">
                          {edu.institution}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start">
                        <span className="font-mono text-[9px] md:text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-[#00FF41] tracking-widest uppercase rounded">
                          {edu.period}
                        </span>
                        <span className="font-mono text-[8px] md:text-[9px] px-2 py-1 bg-white/5 border border-white/10 text-white/40 tracking-widest uppercase rounded">
                          {edu.location}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-light leading-relaxed text-[#9CA3AF]">
                      {edu.details}
                    </p>
                    
                    {/* Scholastic Assets Buttons */}
                    {(edu.certificate || edu.transcript || edu.resultCard || edu.englishCertificate || edu.characterCertificate) && (
                      <div className="mt-5 pt-5 border-t border-white/5 flex flex-wrap gap-2 md:gap-3">
                        {edu.certificate && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: edu.certificate,
                                title: "Certificate of Graduation",
                                org: edu.institution,
                                year: edu.period,
                                type: edu.certificate.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="px-4 py-2.5 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all text-[10px] font-mono uppercase font-black tracking-wider rounded flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none min-h-[48px]"
                            aria-label={`View Certificate for ${edu.degree}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Certificate
                          </button>
                        )}
                        {edu.transcript && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: edu.transcript,
                                title: "Academic Transcript",
                                org: edu.institution,
                                year: edu.period,
                                type: edu.transcript.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="px-4 py-2.5 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all text-[10px] font-mono uppercase font-black tracking-wider rounded flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none min-h-[48px]"
                            aria-label={`View Transcript for ${edu.degree}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Transcript
                          </button>
                        )}
                        {edu.resultCard && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: edu.resultCard,
                                title: "Academic Result Card",
                                org: edu.institution,
                                year: edu.period,
                                type: edu.resultCard.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="px-4 py-2.5 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all text-[10px] font-mono uppercase font-black tracking-wider rounded flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none min-h-[48px]"
                            aria-label={`View Result Card for ${edu.degree}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Result Card
                          </button>
                        )}
                        {edu.englishCertificate && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: edu.englishCertificate,
                                title: "English Language Proficiency Certificate",
                                org: edu.institution,
                                year: edu.period,
                                type: edu.englishCertificate.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="px-4 py-2.5 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all text-[10px] font-mono uppercase font-black tracking-wider rounded flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none min-h-[48px]"
                            aria-label={`View English Proficiency Certificate for ${edu.degree}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> English Cert
                          </button>
                        )}
                        {edu.characterCertificate && (
                          <button 
                            onClick={() => {
                              setModalAsset({
                                file: edu.characterCertificate,
                                title: "Character Certificate",
                                org: edu.institution,
                                year: edu.period,
                                type: edu.characterCertificate.toLowerCase().endsWith(".pdf") ? "pdf" : "image"
                              });
                            }}
                            className="px-4 py-2.5 border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] text-white/70 hover:bg-[#00FF41]/5 transition-all text-[10px] font-mono uppercase font-black tracking-wider rounded flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none min-h-[48px]"
                            aria-label={`View Character Certificate for ${edu.degree}`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Character Cert
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* RECOGNITIONS SUMMARY */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white/40">
                <span>06 // DISTINGUISHED ACCOMLISHMENTS</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                  Recognitions
                </h3>
                <Link 
                  to="/awards" 
                  className="group flex items-center gap-2 font-mono text-[10px] uppercase font-black tracking-widest text-[#00FF41] hover:shadow-sm"
                >
                  VIEW FULL ARCHIVES <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-white/5 p-6 bg-[#0E0E12] rounded">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-2">2019 // MULTIDISCIPLINARY PERFORMER</span>
                  <h4 className="font-display text-lg font-bold uppercase text-white mb-2 leading-tight">
                    Jubilee Arts International Selection
                  </h4>
                  <p className="font-mono text-[10px] text-accent uppercase font-bold text-[#00FF41]">
                    Issued by AKES,P (Lisbon Performance Selection)
                  </p>
                </div>
                
                <div className="border border-white/5 p-6 bg-[#0E0E12] rounded">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-2">May 2026 // CLOUD SERVICES EXPERT</span>
                  <h4 className="font-display text-lg font-bold uppercase text-white mb-2 leading-tight">
                    Azure AI Fundamentals (AI-900)
                  </h4>
                  <p className="font-mono text-[10px] text-accent uppercase font-bold text-[#00FF41]">
                    Microsoft Certified Enterprise Frameworks
                  </p>
                </div>
              </div>
            </motion.section>

            {/* HIGH CONTRACT CONTACT FOOTER */}
            <footer className="pt-16 border-t border-white/10 text-center">
              <h4 className="font-display text-[8vw] font-black uppercase text-white/5 mb-[-0.25em] select-none pointer-events-none tracking-tighter leading-none">
                NEXT STEPS
              </h4>
              <p className="font-mono text-[10px] uppercase font-bold tracking-[0.3em] text-[#9CA3AF] mb-8">
                LOOKING FOR AI/ML RESEARCH & DEVELOPMENT OPPORTUNITIES IN 2026
              </p>
              
              <a 
                href={`mailto:${profile.email}`} 
                className="inline-block bg-[#00FF41] text-black font-mono text-[11px] uppercase font-black tracking-widest px-12 py-5 hover:bg-white hover:text-black transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] rounded"
              >
                Inquire Dossier // Connect
              </a>
            </footer>

          </div>

        </div>

      </div>

      {/* Fullscreen Certificate/Asset Viewer Modal */}
      <AnimatePresence>
        {modalAsset && (
          <motion.div
            ref={modalRef}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 outline-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setModalAsset(null);
              }
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto border-b border-white/10 pb-4 shrink-0">
              <div className="flex flex-col pr-4">
                <span className="font-mono text-[9px] uppercase text-[#00FF41] tracking-[0.3em] font-black">
                  // DIGITAL_CREDENTIAL_VIEWER
                </span>
                <h4 id="modal-title" className="font-display text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight mt-1 leading-tight">
                  {modalAsset.title}
                </h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">
                  ISSUED BY: <span className="text-white">{modalAsset.org}</span> • {modalAsset.year}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setModalAsset(null)}
                className="px-4 py-2 border border-white/10 text-white/70 hover:text-[#00FF41] hover:border-[#00FF41] rounded bg-white/5 hover:bg-[#00FF41]/5 transition-all active:scale-95 flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase font-bold min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Modal Body / Viewer Area */}
            <div 
              className="flex-1 flex items-center justify-center relative w-full max-w-6xl mx-auto my-4 overflow-hidden min-h-0"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setModalAsset(null);
                }
              }}
            >
              {/* Certificate Media Display */}
              <div 
                className={`w-full h-full max-w-4xl max-h-[65vh] flex items-center justify-center rounded bg-zinc-950 border border-white/5 relative p-2 touch-auto ${
                  modalAsset.type === "pdf" ? "overflow-hidden" : "overflow-auto"
                }`}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setModalAsset(null);
                  }
                }}
              >
                {hasLoadError ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/60 border border-white/10 rounded-lg max-w-sm text-center">
                    <div className="p-3 bg-red-500/10 rounded-full border border-red-500/30 mb-4 text-red-500">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <h5 className="font-display text-base font-black uppercase text-white">Document unavailable</h5>
                    <p className="font-mono text-[10px] text-zinc-500 mt-2">The requested asset could not be loaded at this path.</p>
                  </div>
                ) : modalAsset.type === "pdf" ? (
                  <PDFViewer
                    file={modalAsset.file}
                    title={modalAsset.title}
                  />
                ) : (
                  <img
                    src={modalAsset.file}
                    alt={modalAsset.title}
                    className="max-w-full max-h-full object-contain rounded"
                    referrerPolicy="no-referrer"
                    onError={() => setHasLoadError(true)}
                  />
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto border-t border-white/10 pt-4 shrink-0">
              {/* Category indicator */}
              <div className="font-mono text-[9px] sm:text-xs text-zinc-400">
                <span>INSTITUTIONALLY SIGNED VERIFICATION RECORD</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={modalAsset.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-white/10 font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-1.5 rounded transition-all active:scale-95 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Open document in a new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> New Tab
                </a>
                <a
                  href={modalAsset.file}
                  download
                  className="flex-1 sm:flex-none px-5 py-3 bg-[#00FF41] text-black font-mono text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-1.5 rounded transition-all hover:bg-white active:scale-95 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#00FF41] outline-none"
                  aria-label="Download document file"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
